import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationsContext';

export function NotificationsBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-xs flex items-center justify-center px-1">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-[#141414] border-[#2A2A2A] text-white">
        <div className="px-3 py-2 border-b border-[#2A2A2A] flex items-center justify-between">
          <span className="font-medium text-sm">Notificaciones</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs text-[#D4AF37] h-auto py-1" onClick={() => markAllAsRead()}>
              Marcar todas leídas
            </Button>
          )}
        </div>
        <div className="max-h-72 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-3 py-6 text-center text-gray-500 text-sm font-light">No hay notificaciones</div>
          ) : (
            notifications.slice(0, 10).map((n) => (
              <DropdownMenuItem
                key={n.id}
                className="flex flex-col items-start gap-0.5 cursor-pointer text-left py-3 focus:bg-[#1E1E1E]"
                onClick={() => markAsRead(n.id)}
              >
                <span className={`text-sm ${n.read ? 'text-gray-400' : 'text-white'} font-medium`}>{n.title}</span>
                <span className="text-xs text-gray-500 font-light">{n.body}</span>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
