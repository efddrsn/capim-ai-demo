import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutList, MessageSquare, Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import ChatOverlay from './ChatOverlay';
import AIChatPanel from './AIChatPanel';
import CommandBar from './CommandBar';

const Layout: React.FC = () => {
  const [chatMode, setChatMode] = useState<'overlay' | 'panel'>('overlay');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);

  const toggleChatMode = () => {
    setChatMode(prev => prev === 'overlay' ? 'panel' : 'overlay');
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

  // Keyboard shortcut para abrir command bar
  useEffect(() => {
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
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - Desktop always visible, Mobile overlay */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        transform ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}>
        <Sidebar onMobileClose={() => setIsMobileSidebarOpen(false)} />
      </div>
      
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={toggleMobileSidebar}
          className="p-2 -ml-2 text-gray-600 hover:text-gray-900"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-indigo-600">CAPIM</h1>
        <button
          onClick={toggleChatMode}
          className="p-2 -mr-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          {chatMode === 'overlay' ? (
            <LayoutList className="w-5 h-5 text-gray-600" />
          ) : (
            <MessageSquare className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Desktop Toggle Button */}
      <button
        onClick={toggleChatMode}
        className="hidden lg:block fixed top-4 right-4 z-50 bg-white border border-gray-300 rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow"
        title={`Alternar para ${chatMode === 'overlay' ? 'side panel' : 'overlay'}`}
      >
        {chatMode === 'overlay' ? (
          <LayoutList className="w-5 h-5 text-gray-600" />
        ) : (
          <MessageSquare className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Main content area */}
      <div className="flex-1 flex min-w-0">
        <main className={`
          flex-1 overflow-y-auto
          pt-16 lg:pt-0 px-4 lg:px-8 py-4 lg:py-8
          ${chatMode === 'panel' ? 'lg:mr-0' : 'lg:mr-0'}
        `}>
          {chatMode === 'overlay' && <ChatOverlay />}
          <Outlet />
        </main>
        
        {/* AI Chat Panel - Desktop only or full-screen mobile */}
        {chatMode === 'panel' && (
          <div className="hidden lg:block">
            <AIChatPanel />
          </div>
        )}
        
        {/* Mobile Chat Panel - Full screen overlay */}
        {chatMode === 'panel' && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Chat IA</h2>
              <button
                onClick={toggleChatMode}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="h-full">
              <AIChatPanel />
            </div>
          </div>
        )}
      </div>

      {/* Command Bar */}
      <CommandBar isOpen={isCommandBarOpen} onOpenChange={setIsCommandBarOpen} />
    </div>
  );
};

export default Layout; 