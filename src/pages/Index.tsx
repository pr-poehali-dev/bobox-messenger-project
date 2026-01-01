import { useState } from 'react';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import Sidebar from '@/components/Sidebar';
import AuthScreen from '@/components/AuthScreen';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <AuthScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex flex-1 overflow-hidden">
        <ChatList 
          selectedChat={selectedChat} 
          onSelectChat={setSelectedChat}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
        
        <ChatWindow chatId={selectedChat} />
      </div>
    </div>
  );
}