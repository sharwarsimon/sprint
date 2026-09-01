import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Flag, 
  Lock, 
  Unlock, 
  Trash2, 
  Ban, 
  CheckCircle, 
  RefreshCw, 
  AlertTriangle,
  Smile,
  Gamepad2,
  Heart,
  BookOpen,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { INITIAL_ROOMS } from '../data/rooms';
import { ChatReport } from '../types';

interface AdminPageProps {
  onBack: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBack }) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Admin state
  const [stats, setStats] = useState<{ totalOnline: number; roomCounts: Record<string, number> }>({
    totalOnline: 0,
    roomCounts: {}
  });
  const [reports, setReports] = useState<ChatReport[]>([]);
  const [bannedUsers, setBannedUsers] = useState<Array<{ id: string; reason: string; timestamp: string }>>([]);
  const [disabledRooms, setDisabledRooms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Check existing session
  useEffect(() => {
    const savedToken = localStorage.getItem('pulsechat_admin_token');
    if (savedToken) {
      verifyToken(savedToken);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: token })
      });
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        localStorage.setItem('pulsechat_admin_token', token);
        loadAdminData();
      } else {
        localStorage.removeItem('pulsechat_admin_token');
      }
    } catch {
      // Offline fallback
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() })
      });
      const data = await res.json();
      setLoading(false);

      if (data.authenticated) {
        setIsAuthenticated(true);
        localStorage.setItem('pulsechat_admin_token', passcode.trim());
        loadAdminData();
      } else {
        setError('Invalid admin passcode. (Default: admin123)');
      }
    } catch {
      setLoading(false);
      setError('Connection failed. Using admin session.');
      setIsAuthenticated(true);
    }
  };

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/data');
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats || { totalOnline: 0, roomCounts: {} });
        setReports(data.reports || []);
        setBannedUsers(data.bannedUsers || []);
        setDisabledRooms(data.disabledRooms || []);
      }
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRoom = async (roomId: string) => {
    try {
      const res = await fetch('/api/admin/toggle-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId })
      });
      if (res.ok) {
        const data = await res.json();
        setDisabledRooms(data.disabledRooms);
      }
    } catch (err) {
      console.error('Error toggling room', err);
    }
  };

  const handleDismissReport = async (reportId: string) => {
    try {
      const res = await fetch('/api/admin/dismiss-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId })
      });
      if (res.ok) {
        setReports(prev => prev.filter(r => r.id !== reportId));
      }
    } catch (err) {
      console.error('Error dismissing report', err);
    }
  };

  const handleDeleteMessage = async (messageId: string, reportId?: string) => {
    try {
      const res = await fetch('/api/admin/delete-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId })
      });
      if (res.ok) {
        if (reportId) {
          handleDismissReport(reportId);
        }
      }
    } catch (err) {
      console.error('Error deleting message', err);
    }
  };

  const handleBanUser = async (userId: string, reason: string, reportId?: string) => {
    if (!window.confirm(`Are you sure you want to ban user ${userId}?`)) return;
    try {
      const res = await fetch('/api/admin/ban-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, reason })
      });
      if (res.ok) {
        const data = await res.json();
        setBannedUsers(data.bannedUsers || []);
        if (reportId) {
          handleDismissReport(reportId);
        }
      }
    } catch (err) {
      console.error('Error banning user', err);
    }
  };

  const handleUnbanUser = async (userId: string) => {
    try {
      const res = await fetch('/api/admin/unban-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      if (res.ok) {
        setBannedUsers(prev => prev.filter(b => b.id !== userId));
      }
    } catch (err) {
      console.error('Error unbanning user', err);
    }
  };

  const getRoomIcon = (id: string) => {
    switch (id) {
      case 'fun': return Smile;
      case 'game': return Gamepad2;
      case 'loves': return Heart;
      case 'friends': return Users;
      case 'readers': return BookOpen;
      default: return Sparkles;
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 animate-in fade-in duration-200">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to App</span>
        </button>

        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto">
            <Shield className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Admin & Moderation</h2>
            <p className="text-xs text-slate-400 mt-1">Enter moderation credentials to access system controls.</p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/20 text-rose-300 text-xs border border-rose-500/30">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Default: admin123"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg transition"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Chat</span>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Platform Administration</h1>
              <p className="text-xs text-slate-400">Live presence monitor, user reports queue, and room controls</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={loadAdminData}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('pulsechat_admin_token');
              setIsAuthenticated(false);
            }}
            className="px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs font-semibold border border-rose-800/80 transition"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* 1. Live Presence Breakdown Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Live Presence Breakdown</span>
          </h2>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
            {stats.totalOnline} Active Across All Rooms
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {INITIAL_ROOMS.map(room => {
            const count = stats.roomCounts[room.id] || 0;
            const isDisabled = disabledRooms.includes(room.id);
            const Icon = getRoomIcon(room.id);

            return (
              <div
                key={room.id}
                className={`p-4 rounded-2xl bg-slate-900 border transition flex flex-col justify-between ${
                  isDisabled ? 'border-rose-900/60 opacity-60' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <button
                    onClick={() => handleToggleRoom(room.id)}
                    className={`p-1.5 rounded-lg text-xs transition ${
                      isDisabled 
                        ? 'bg-rose-950 text-rose-400 border border-rose-800' 
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title={isDisabled ? 'Enable room' : 'Disable room'}
                  >
                    {isDisabled ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-medium">#{room.name}</div>
                  <div className="text-xl font-bold text-white font-mono">{count} online</div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    {isDisabled ? '❌ Disabled' : '✅ Active'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Reported Messages Queue */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-bold text-white">Pending Moderation Reports ({reports.length})</h2>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            🎉 Clean queue! No active reports requiring moderator action.
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-rose-950 text-rose-300 font-semibold border border-rose-800">
                      Room: #{report.roomId}
                    </span>
                    <span className="text-slate-400">Reported User: <strong className="text-white">{report.reportedUserName}</strong></span>
                  </div>
                  <span className="text-slate-500 text-[11px]">{new Date(report.createdAt).toLocaleString()}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/60 text-xs text-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Flagged Message Content:</span>
                  <p className="font-mono text-rose-200">"{report.messageContent}"</p>
                </div>

                <div className="text-xs text-slate-400">
                  <strong>Reason:</strong> {report.reason}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-700/60">
                  <button
                    onClick={() => handleDismissReport(report.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold transition"
                  >
                    Dismiss Report
                  </button>
                  <button
                    onClick={() => handleDeleteMessage(report.messageId, report.id)}
                    className="px-3 py-1.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/40 text-xs font-semibold transition flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete Message</span>
                  </button>
                  <button
                    onClick={() => handleBanUser(report.reportedUserId, report.reason, report.id)}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-1"
                  >
                    <Ban className="w-3 h-3" />
                    <span>Ban User</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Banned Users Roster */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Ban className="w-5 h-5 text-rose-400" />
          <span>Active Restrictions ({bannedUsers.length})</span>
        </h2>

        {bannedUsers.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500">
            No banned user records.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {bannedUsers.map((b) => (
              <div
                key={b.id}
                className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-mono text-white font-bold truncate max-w-[140px]">{b.id}</div>
                  <div className="text-[10px] text-slate-400">{b.reason}</div>
                </div>
                <button
                  onClick={() => handleUnbanUser(b.id)}
                  className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] font-semibold transition"
                >
                  Unban
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
