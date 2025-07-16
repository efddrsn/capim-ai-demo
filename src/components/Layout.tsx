import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutList, MessageSquare } from 'lucide-react';
import Sidebar from './Sidebar';
import ChatOverlay from './ChatOverlay';
import AIChatPanel from './AIChatPanel';

const Layout: React.FC = () => {
  const [chatMode, setChatMode] = useState<'overlay' | 'panel'>('overlay');

  const toggleChatMode = () => {
    setChatMode(prev => prev === 'overlay' ? 'panel' : 'overlay');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
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
    </div>
  );
};

export default Layout;