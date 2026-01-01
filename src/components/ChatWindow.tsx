import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface ChatWindowProps {
  chatId: number | null;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  image?: string;
}

const mockMessages: Message[] = [
  { id: 1, text: 'Привет! Как дела?', time: '14:30', isMine: false },
  { id: 2, text: 'Привет! Всё отлично, спасибо! А у тебя?', time: '14:31', isMine: true },
  { id: 3, text: 'Тоже хорошо! Хотела спросить про проект', time: '14:32', isMine: false },
  { id: 4, text: 'Конечно, спрашивай', time: '14:32', isMine: true },
];

export default function ChatWindow({ chatId }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [messages] = useState<Message[]>(mockMessages);

  const handleSend = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="MessageCircle" size={48} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">БОБОКС Мессенджер</h2>
            <p className="text-muted-foreground">Выберите чат, чтобы начать общение</p>
          </div>
        </div>
      </div>
    );
  }

  const currentChat = { name: 'Мария Смирнова', online: true };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/20 text-primary">МС</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="font-semibold">{currentChat.name}</h2>
            <p className="text-sm text-muted-foreground">
              {currentChat.online ? 'в сети' : 'был(а) недавно'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 animate-fade-in ${msg.isMine ? 'justify-end' : 'justify-start'}`}
          >
            {!msg.isMine && (
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary/20 text-primary text-xs">МС</AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-[70%] ${msg.isMine ? 'order-first' : ''}`}>
              <div
                className={`
                  px-4 py-2 rounded-2xl
                  ${msg.isMine 
                    ? 'bg-primary text-primary-foreground rounded-br-sm' 
                    : 'bg-card text-foreground rounded-bl-sm border border-border'
                  }
                `}
              >
                {msg.image && (
                  <img src={msg.image} alt="" className="rounded-lg mb-2 max-w-full" />
                )}
                <p className="break-words">{msg.text}</p>
              </div>
              <p className={`text-xs text-muted-foreground mt-1 ${msg.isMine ? 'text-right' : 'text-left'}`}>
                {msg.time}
              </p>
            </div>
            {msg.isMine && (
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">АП</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2 items-end">
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Icon name="Paperclip" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Icon name="Image" size={20} />
          </Button>
          <Input
            placeholder="Написать сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-input border-border"
          />
          <Button 
            onClick={handleSend}
            className="flex-shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
