import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { icon: 'User', label: 'Профиль', badge: null },
    { icon: 'Users', label: 'Контакты', badge: null },
    { icon: 'Bell', label: 'Уведомления', badge: 3 },
    { icon: 'Settings', label: 'Настройки', badge: null },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`
          fixed md:relative z-50 md:z-0
          w-72 h-full bg-card border-r border-border
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">БОБОКС</h2>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={onClose}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">АП</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">Александр Петров</p>
                <p className="text-sm text-muted-foreground">@alex_petrov</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-left group"
              >
                <Icon name={item.icon} size={20} className="text-muted-foreground group-hover:text-foreground" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
