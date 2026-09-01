import React, { useState, useEffect } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { ChatProvider, useChat } from './context/ChatContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { UserEntryModal } from './components/UserEntryModal';

// Pages
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { ChatRoomPage } from './pages/ChatRoomPage';
import { LiveMembersPage } from './pages/LiveMembersPage';
import { CommunityPage } from './pages/CommunityPage';
import { NewsPage } from './pages/NewsPage';
import { GamesPage } from './pages/GamesPage';
import { ReadersPage } from './pages/ReadersPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';

function AppContent() {
  const { user } = useUser();
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [pendingRoomId, setPendingRoomId] = useState<string | null>(null);

  // Parse hash/path on initial load
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentPath(hash);
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRoom = (roomId: string) => {
    if (!user) {
      setPendingRoomId(roomId);
      setIsEntryModalOpen(true);
    } else {
      navigate(`/chat/${roomId}`);
    }
  };

  const handleModalSuccess = (roomId?: string | null) => {
    setIsEntryModalOpen(false);
    if (roomId) {
      navigate(`/chat/${roomId}`);
      setPendingRoomId(null);
    } else if (pendingRoomId) {
      navigate(`/chat/${pendingRoomId}`);
      setPendingRoomId(null);
    }
  };

  // Determine current active view
  const renderCurrentView = () => {
    if (currentPath.startsWith('/chat/')) {
      const roomId = currentPath.replace('/chat/', '').toLowerCase();
      return (
        <ChatRoomPage
          roomId={roomId}
          onBack={() => navigate('/chat')}
          onSwitchRoom={(newId) => navigate(`/chat/${newId}`)}
          onOpenProfileModal={() => setIsEntryModalOpen(true)}
        />
      );
    }

    switch (currentPath) {
      case '/chat':
        return (
          <RoomsPage
            onSelectRoom={handleSelectRoom}
            onBackHome={() => navigate('/')}
          />
        );
      case '/members':
        return (
          <LiveMembersPage
            onBack={() => navigate('/')}
            onSelectRoom={handleSelectRoom}
          />
        );
      case '/community':
        return (
          <CommunityPage
            onNavigate={navigate}
            onSelectRoom={handleSelectRoom}
          />
        );
      case '/news':
        return (
          <NewsPage
            onNavigate={navigate}
            onSelectRoom={handleSelectRoom}
          />
        );
      case '/games':
        return (
          <GamesPage
            onSelectRoom={handleSelectRoom}
          />
        );
      case '/readers':
        return (
          <ReadersPage
            onSelectRoom={handleSelectRoom}
          />
        );
      case '/about':
        return (
          <AboutPage
            onNavigate={navigate}
          />
        );
      case '/admin':
        return (
          <AdminPage
            onBack={() => navigate('/')}
          />
        );
      case '/':
      default:
        return (
          <HomePage
            onNavigate={navigate}
            onSelectRoom={handleSelectRoom}
          />
        );
    }
  };

  const isChatRoomActive = currentPath.startsWith('/chat/');

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#3E2723] selection:bg-orange-100 selection:text-[#EA580C]">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenProfileModal={() => setIsEntryModalOpen(true)}
      />

      {/* 2. Main Content Canvas */}
      <main className="flex-1 flex flex-col">
        {renderCurrentView()}
      </main>

      {/* 3. Global Footer (Only show when not in an active chat room to maintain clean mobile chat layout) */}
      {!isChatRoomActive && (
        <Footer currentPath={currentPath} onNavigate={navigate} />
      )}

      {/* 4. Global User Entry / Profile Setup Modal */}
      <UserEntryModal
        isOpen={isEntryModalOpen}
        onClose={() => {
          setIsEntryModalOpen(false);
          setPendingRoomId(null);
        }}
        targetRoomId={pendingRoomId}
        onSuccess={handleModalSuccess}
      />

    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </UserProvider>
  );
}
