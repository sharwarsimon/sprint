import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';

interface ClientSession {
  ws: WebSocket;
  userId: string;
  name: string;
  age: number;
  gender: string;
  roomId: string | null;
  lastPing: number;
  messageTimestamps: number[];
  avatarColor: string;
}

interface StoredMessage {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  userGender?: string;
  userColor?: string;
  message: string;
  createdAt: string;
  isSystem?: boolean;
}

interface StoredReport {
  id: string;
  messageId: string;
  messageText: string;
  messageAuthorId: string;
  messageAuthorName: string;
  reporterId: string;
  reporterName: string;
  roomId: string;
  reason: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'dismissed' | 'actioned';
}

const PORT = 3000;
const ADMIN_PASSWORD = process.env.ADMIN_SECRET_KEY || 'admin123';

// Storage paths
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const REPORTS_FILE = path.join(DATA_DIR, 'reports.json');
const BANS_FILE = path.join(DATA_DIR, 'bans.json');

// Memory state
const roomsList = ['fun', 'game', 'loves', 'friends', 'readers'];
const disabledRooms = new Set<string>();
const bannedUsers = new Map<string, { name: string; reason: string; bannedAt: string; bannedBy: string }>();
const messagesByRoom = new Map<string, StoredMessage[]>();
let reportsList: StoredReport[] = [];

// Initialize room message arrays
roomsList.forEach(r => messagesByRoom.set(r, []));

// Load persisted state safely
try {
  if (fs.existsSync(MESSAGES_FILE)) {
    const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    Object.keys(parsed).forEach(r => {
      if (messagesByRoom.has(r)) {
        messagesByRoom.set(r, parsed[r] || []);
      }
    });
  }
  if (fs.existsSync(REPORTS_FILE)) {
    reportsList = JSON.parse(fs.readFileSync(REPORTS_FILE, 'utf-8'));
  }
  if (fs.existsSync(BANS_FILE)) {
    const parsed = JSON.parse(fs.readFileSync(BANS_FILE, 'utf-8'));
    Object.entries(parsed).forEach(([uid, data]: [string, any]) => bannedUsers.set(uid, data));
  }
} catch (err) {
  console.warn('Initial storage load fallback to memory:', err);
}

// Persist helper with debounce
let saveTimeout: NodeJS.Timeout | null = null;
function persistData() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      const msgsObj: Record<string, StoredMessage[]> = {};
      messagesByRoom.forEach((list, r) => {
        msgsObj[r] = list.slice(-200); // keep last 200 per room
      });
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(msgsObj, null, 2));
      fs.writeFileSync(REPORTS_FILE, JSON.stringify(reportsList, null, 2));
      const bansObj: Record<string, any> = {};
      bannedUsers.forEach((data, uid) => (bansObj[uid] = data));
      fs.writeFileSync(BANS_FILE, JSON.stringify(bansObj, null, 2));
    } catch (e) {
      console.error('Failed to write data stores:', e);
    }
  }, 1000);
}

// Active clients map
const clients = new Map<WebSocket, ClientSession>();

function getRoomCounts(): Record<string, number> {
  const counts: Record<string, number> = {
    fun: 0,
    game: 0,
    loves: 0,
    friends: 0,
    readers: 0
  };
  // Count unique users active in each room
  const uniqueUsersInRoom = new Map<string, Set<string>>();
  roomsList.forEach(r => uniqueUsersInRoom.set(r, new Set<string>()));

  clients.forEach(client => {
    if (client.roomId && uniqueUsersInRoom.has(client.roomId)) {
      uniqueUsersInRoom.get(client.roomId)!.add(client.userId);
    }
  });

  uniqueUsersInRoom.forEach((users, r) => {
    counts[r] = users.size;
  });

  return counts;
}

function broadcastToAll(data: any) {
  const payload = JSON.stringify(data);
  clients.forEach(client => {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(payload);
    }
  });
}

function broadcastToRoom(roomId: string, data: any, excludeWs?: WebSocket) {
  const payload = JSON.stringify(data);
  clients.forEach(client => {
    if (client.roomId === roomId && client.ws.readyState === WebSocket.OPEN) {
      if (excludeWs && client.ws === excludeWs) return;
      client.ws.send(payload);
    }
  });
}

function getActiveUsersInRoom(roomId: string) {
  const userMap = new Map<string, { userId: string; name: string; age: number; gender: string; avatarColor: string }>();
  clients.forEach(client => {
    if (client.roomId === roomId && !bannedUsers.has(client.userId)) {
      userMap.set(client.userId, {
        userId: client.userId,
        name: client.name,
        age: client.age,
        gender: client.gender,
        avatarColor: client.avatarColor
      });
    }
  });
  return Array.from(userMap.values());
}

async function startServer() {
  const app = express();
  app.use(express.json());

  const server = http.createServer(app);
  const wss = new WebSocketServer({ server, path: '/api/ws' });

  // REST API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  app.get('/api/rooms', (req, res) => {
    res.json({
      counts: getRoomCounts(),
      disabledRooms: Array.from(disabledRooms)
    });
  });

  app.get('/api/rooms/:roomId/messages', (req, res) => {
    const { roomId } = req.params;
    const list = messagesByRoom.get(roomId) || [];
    res.json({ messages: list.slice(-50) });
  });

  app.get('/api/rooms/:roomId/users', (req, res) => {
    const { roomId } = req.params;
    res.json({ users: getActiveUsersInRoom(roomId) });
  });

  // Moderation Reports endpoint
  app.post('/api/reports', (req, res) => {
    const { messageId, messageText, messageAuthorId, messageAuthorName, reporterId, reporterName, roomId, reason } = req.body;
    if (!messageId || !reason) {
      return res.status(400).json({ error: 'Missing required report fields' });
    }
    const report: StoredReport = {
      id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      messageId,
      messageText: messageText || '',
      messageAuthorId: messageAuthorId || 'unknown',
      messageAuthorName: messageAuthorName || 'Unknown User',
      reporterId: reporterId || 'anon',
      reporterName: reporterName || 'Anonymous',
      roomId: roomId || 'general',
      reason: String(reason).slice(0, 300),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    reportsList.unshift(report);
    persistData();
    res.json({ success: true, reportId: report.id });
  });

  // Admin Auth & endpoints
  app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ success: true, token: 'admin_session_token_' + Buffer.from(ADMIN_PASSWORD).toString('base64') });
    } else {
      res.status(401).json({ success: false, error: 'Invalid admin credentials' });
    }
  });

  // Admin Middleware
  const checkAdminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader === `Bearer admin_session_token_${Buffer.from(ADMIN_PASSWORD).toString('base64')}`) {
      return next();
    }
    return res.status(403).json({ error: 'Unauthorized admin access' });
  };

  app.get('/api/admin/stats', checkAdminAuth, (req, res) => {
    const roomCounts = getRoomCounts();
    let totalMessages = 0;
    messagesByRoom.forEach(list => (totalMessages += list.length));

    res.json({
      totalOnline: Object.values(roomCounts).reduce((a, b) => a + b, 0),
      roomCounts,
      disabledRooms: Array.from(disabledRooms),
      totalMessages,
      pendingReportsCount: reportsList.filter(r => r.status === 'pending').length,
      bannedUsersCount: bannedUsers.size
    });
  });

  app.get('/api/admin/reports', checkAdminAuth, (req, res) => {
    res.json({ reports: reportsList });
  });

  app.post('/api/admin/reports/:id/resolve', checkAdminAuth, (req, res) => {
    const { id } = req.params;
    const { action } = req.body; // 'actioned' or 'dismissed'
    const report = reportsList.find(r => r.id === id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    report.status = action === 'dismissed' ? 'dismissed' : 'actioned';
    persistData();
    res.json({ success: true, report });
  });

  app.post('/api/admin/messages/:id/delete', checkAdminAuth, (req, res) => {
    const { id } = req.params;
    let foundRoom: string | null = null;
    messagesByRoom.forEach((list, r) => {
      const idx = list.findIndex(m => m.id === id);
      if (idx !== -1) {
        list.splice(idx, 1);
        foundRoom = r;
      }
    });

    if (foundRoom) {
      broadcastToRoom(foundRoom, {
        type: 'MESSAGE_DELETED',
        messageId: id,
        roomId: foundRoom
      });
      persistData();
      return res.json({ success: true });
    }
    res.status(404).json({ error: 'Message not found' });
  });

  app.post('/api/admin/users/:userId/ban', checkAdminAuth, (req, res) => {
    const { userId } = req.params;
    const { name, reason } = req.body;
    bannedUsers.set(userId, {
      name: name || 'User',
      reason: reason || 'Violation of community rules',
      bannedAt: new Date().toISOString(),
      bannedBy: 'Admin'
    });

    // Disconnect any active sockets for this user
    clients.forEach(client => {
      if (client.userId === userId) {
        client.ws.send(JSON.stringify({
          type: 'BANNED',
          reason: reason || 'You have been banned from the chat community.'
        }));
        if (client.roomId) {
          broadcastToRoom(client.roomId, {
            type: 'USER_LEFT',
            userId: client.userId,
            name: client.name,
            roomId: client.roomId
          });
        }
        client.roomId = null;
        client.ws.close();
      }
    });

    broadcastToAll({ type: 'PRESENCE_UPDATE', counts: getRoomCounts() });
    persistData();
    res.json({ success: true });
  });

  app.get('/api/admin/bans', checkAdminAuth, (req, res) => {
    const bans: any[] = [];
    bannedUsers.forEach((data, userId) => bans.push({ userId, ...data }));
    res.json({ bans });
  });

  app.post('/api/admin/users/:userId/unban', checkAdminAuth, (req, res) => {
    const { userId } = req.params;
    bannedUsers.delete(userId);
    persistData();
    res.json({ success: true });
  });

  app.post('/api/admin/rooms/:roomId/toggle', checkAdminAuth, (req, res) => {
    const { roomId } = req.params;
    if (disabledRooms.has(roomId)) {
      disabledRooms.delete(roomId);
    } else {
      disabledRooms.add(roomId);
      // Evict users in disabled room
      clients.forEach(client => {
        if (client.roomId === roomId) {
          client.ws.send(JSON.stringify({
            type: 'ROOM_DISABLED',
            roomId,
            message: `Room ${roomId.toUpperCase()} has been temporarily closed by moderator.`
          }));
          client.roomId = null;
        }
      });
    }

    broadcastToAll({
      type: 'ROOM_STATUS_CHANGED',
      roomId,
      isDisabled: disabledRooms.has(roomId),
      counts: getRoomCounts()
    });

    res.json({ success: true, isDisabled: disabledRooms.has(roomId) });
  });

  // WebSocket Connection Handling
  wss.on('connection', (ws) => {
    const session: ClientSession = {
      ws,
      userId: '',
      name: '',
      age: 0,
      gender: '',
      roomId: null,
      lastPing: Date.now(),
      messageTimestamps: [],
      avatarColor: '#3b82f6'
    };
    clients.set(ws, session);

    // Send initial active room counts immediately upon connection
    ws.send(JSON.stringify({
      type: 'PRESENCE_UPDATE',
      counts: getRoomCounts(),
      disabledRooms: Array.from(disabledRooms)
    }));

    ws.on('message', (raw) => {
      try {
        const msg = JSON.parse(raw.toString());
        session.lastPing = Date.now();

        switch (msg.type) {
          case 'PING': {
            ws.send(JSON.stringify({ type: 'PONG' }));
            break;
          }

          case 'JOIN_ROOM': {
            const { userId, name, age, gender, roomId, avatarColor } = msg;
            if (!userId || !name || !roomId) {
              return ws.send(JSON.stringify({ type: 'ERROR', message: 'Missing user credentials or room' }));
            }

            if (bannedUsers.has(userId)) {
              return ws.send(JSON.stringify({
                type: 'BANNED',
                reason: bannedUsers.get(userId)?.reason || 'You are banned from the platform.'
              }));
            }

            if (disabledRooms.has(roomId)) {
              return ws.send(JSON.stringify({
                type: 'ERROR',
                message: `Room ${roomId.toUpperCase()} is currently disabled by administrator.`
              }));
            }

            // If switching rooms, leave previous room cleanly
            const previousRoom = session.roomId;
            if (previousRoom && previousRoom !== roomId) {
              session.roomId = null;
              broadcastToRoom(previousRoom, {
                type: 'USER_LEFT',
                userId: session.userId,
                name: session.name,
                roomId: previousRoom
              }, ws);
            }

            session.userId = userId;
            session.name = String(name).slice(0, 30);
            session.age = Number(age) || 18;
            session.gender = gender || 'Other';
            session.roomId = roomId;
            session.avatarColor = avatarColor || '#3b82f6';

            // Send room history
            const history = messagesByRoom.get(roomId) || [];
            ws.send(JSON.stringify({
              type: 'ROOM_JOINED',
              roomId,
              messages: history.slice(-50),
              activeUsers: getActiveUsersInRoom(roomId)
            }));

            // Notify users in new room
            broadcastToRoom(roomId, {
              type: 'USER_JOINED',
              userId: session.userId,
              name: session.name,
              gender: session.gender,
              avatarColor: session.avatarColor,
              roomId
            }, ws);

            // Broadcast real-time presence numbers to all connected visitors on homepage & room lists!
            broadcastToAll({
              type: 'PRESENCE_UPDATE',
              counts: getRoomCounts()
            });
            break;
          }

          case 'LEAVE_ROOM': {
            const currentRoom = session.roomId;
            if (currentRoom) {
              session.roomId = null;
              broadcastToRoom(currentRoom, {
                type: 'USER_LEFT',
                userId: session.userId,
                name: session.name,
                roomId: currentRoom
              }, ws);

              broadcastToAll({
                type: 'PRESENCE_UPDATE',
                counts: getRoomCounts()
              });
            }
            break;
          }

          case 'SEND_MESSAGE': {
            const { roomId, message } = msg;
            if (!session.roomId || session.roomId !== roomId) {
              return ws.send(JSON.stringify({ type: 'ERROR', message: 'You must join the room before sending messages' }));
            }

            if (bannedUsers.has(session.userId)) {
              return ws.send(JSON.stringify({ type: 'BANNED', reason: 'You have been banned.' }));
            }

            if (disabledRooms.has(roomId)) {
              return ws.send(JSON.stringify({ type: 'ERROR', message: 'This room is closed.' }));
            }

            const cleanText = String(message || '').trim().slice(0, 500);
            if (!cleanText) {
              return ws.send(JSON.stringify({ type: 'ERROR', message: 'Empty message not allowed.' }));
            }

            // Rate limit check: max 5 messages in 4 seconds
            const now = Date.now();
            session.messageTimestamps = session.messageTimestamps.filter(t => now - t < 4000);
            if (session.messageTimestamps.length >= 5) {
              return ws.send(JSON.stringify({
                type: 'ERROR',
                message: 'You are sending messages too fast. Please slow down.'
              }));
            }
            session.messageTimestamps.push(now);

            const newMsg: StoredMessage = {
              id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
              roomId,
              userId: session.userId,
              userName: session.name,
              userGender: session.gender,
              userColor: session.avatarColor,
              message: cleanText,
              createdAt: new Date().toISOString()
            };

            const roomList = messagesByRoom.get(roomId) || [];
            roomList.push(newMsg);
            if (roomList.length > 200) roomList.shift();
            messagesByRoom.set(roomId, roomList);

            persistData();

            // Broadcast message immediately to everyone in this room
            broadcastToRoom(roomId, {
              type: 'NEW_MESSAGE',
              message: newMsg
            });
            break;
          }

          case 'TYPING': {
            const { roomId, isTyping } = msg;
            if (session.roomId === roomId) {
              broadcastToRoom(roomId, {
                type: 'USER_TYPING',
                userId: session.userId,
                name: session.name,
                isTyping: !!isTyping,
                roomId
              }, ws);
            }
            break;
          }
        }
      } catch (err) {
        console.error('Socket message parse error:', err);
      }
    });

    ws.on('close', () => {
      const currentRoom = session.roomId;
      const uid = session.userId;
      const name = session.name;
      clients.delete(ws);

      if (currentRoom) {
        broadcastToRoom(currentRoom, {
          type: 'USER_LEFT',
          userId: uid,
          name,
          roomId: currentRoom
        });
      }

      // Update room counts in real time whenever user disconnects or closes tab
      broadcastToAll({
        type: 'PRESENCE_UPDATE',
        counts: getRoomCounts()
      });
    });
  });

  // Periodic heartbeat cleanup for disconnected / stalled connections
  setInterval(() => {
    const now = Date.now();
    let presenceChanged = false;

    clients.forEach((session, ws) => {
      // If inactive for > 35s or socket terminated
      if (now - session.lastPing > 35000 || ws.readyState === WebSocket.CLOSED) {
        try {
          ws.terminate();
        } catch (_) {}
        if (session.roomId) {
          presenceChanged = true;
          broadcastToRoom(session.roomId, {
            type: 'USER_LEFT',
            userId: session.userId,
            name: session.name,
            roomId: session.roomId
          });
        }
        clients.delete(ws);
      }
    });

    if (presenceChanged) {
      broadcastToAll({
        type: 'PRESENCE_UPDATE',
        counts: getRoomCounts()
      });
    }
  }, 10000);

  // Mount Vite middleware in dev or static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Realtime Chat server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Server failed to start:', err);
});
