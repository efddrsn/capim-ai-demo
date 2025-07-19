import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutList, MessageSquare } from 'lucide-react';
import Sidebar from './Sidebar';
import ChatOverlay from './ChatOverlay';
import AIChatPanel from './AIChatPanel';
import CommandBar from './CommandBar';

const Layout: React.FC = () => {
  const [chatMode, setChatMode] = useState<'overlay' | 'panel'>('overlay');
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);

  const toggleChatMode = () => {
    setChatMode(prev => prev === 'overlay' ? 'panel' : 'overlay');
  };

  // Keyboard shortcut para command bar
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandBarOpen(prev => !prev);
      }
    };

        document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onOpenCommandBar={() => setIsCommandBarOpen(true)} />
      
      {/* Toggle Button */}
      <button
        onClick={toggleChatMode}
        className="fixed top-4 right-4 z-50 bg-white border border-gray-300 rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow"
        title={`Alternar para ${chatMode === 'overlay' ? 'side panel' : 'overlay'}`}
      >
        {chatMode === 'overlay' ? (
          <LayoutList className="w-5 h-5 text-gray-600" />
        ) : (
          <MessageSquare className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Main content area */}
      <div className="flex-1 flex">
        <main className={`${chatMode === 'panel' ? 'flex-1' : 'flex-1'} p-8 overflow-y-auto`}>
          {chatMode === 'overlay' && <ChatOverlay />}
          <Outlet />
        </main>
        
        {/* AI Chat Panel - só aparece no modo panel */}
        {chatMode === 'panel' && <AIChatPanel />}
      </div>

      {/* Command Bar */}
      <CommandBar isOpen={isCommandBarOpen} onOpenChange={setIsCommandBarOpen} />
    </div>
  );
};

export default Layout; 