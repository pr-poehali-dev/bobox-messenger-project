import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ChatListProps {
  selectedChat: number | null;
  onSelectChat: (id: number) => void;
  onOpenSidebar: () => void;
}

interface Chat {
  id: number;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
}

const mockChats: Chat[] = [
  { id: 1, name: 'Мария Смирнова', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 2, online: true },
  { id: 2, name: 'Рабочая группа', lastMessage: 'Иван: Отправил файлы', time: '13:15', unread: 5, online: false, isGroup: true },
  { id: 3, name: 'Дмитрий Козлов', lastMessage: 'Созвонимся завтра?', time: '12:48', unread: 0, online: false },
  { id: 4, name: 'Анна Петрова', lastMessage: 'Спасибо за помощь!', time: '11:20', unread: 0, online: true },
  { id: 5, name: 'Друзья 🎉', lastMessage: 'Алексей: Встречаемся в 19:00', time: 'Вчера', unread: 12, online: false, isGroup: true },
  { id: 6, name: 'Максим Иванов', lastMessage: 'Посмотри эту статью', time: 'Вчера', unread: 0, online: false },
];

export default function ChatList({ selectedChat, onSelectChat, onOpenSidebar }: ChatListProps) {
  return (
    <div className="w-full md:w-96 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSidebar}
            className="md:hidden"
          >
            <Icon name="Menu" size={24} />
          </Button>
          <h1 className="text-2xl font-bold">Чаты</h1>
          <Button variant="ghost" size="icon">
            <Icon name="Plus" size={24} />
          </Button>
        </div>
        
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск..."
            className="pl-10 bg-input border-border"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {mockChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`
              w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors
              ${selectedChat === chat.id ? 'bg-muted' : ''}
              border-b border-border/50
            `}
          >
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={chat.avatar} />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {chat.isGroup ? '👥' : chat.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
              )}
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold truncate">{chat.name}</p>
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>

            {chat.unread > 0 && (
              <Badge className="bg-primary text-primary-foreground rounded-full px-2 min-w-[24px] justify-center">
                {chat.unread}
              </Badge>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
