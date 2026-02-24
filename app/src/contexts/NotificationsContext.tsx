import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { AppNotification } from '@/types';
import * as notifLib from '@/lib/notifications';

type NotificationsContextType = {
  notifications: AppNotification[];
  unreadCount: number;
  refresh: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (n: Omit<AppNotification, 'id' | 'read' | 'createdAt'>) => void;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children, userId }: { children: React.ReactNode; userId: string | null }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refresh = useCallback(() => {
    if (!userId) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    const list = notifLib.getNotificationsForUser(userId);
    setNotifications(list);
    setUnreadCount(notifLib.getUnreadCount(userId));
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const markAsRead = useCallback((id: string) => {
    notifLib.markAsRead(id);
    refresh();
  }, [refresh]);

  const markAllAsRead = useCallback(() => {
    if (userId) {
      notifLib.markAllAsRead(userId);
      refresh();
    }
  }, [userId, refresh]);

  const addNotification = useCallback((n: Omit<AppNotification, 'id' | 'read' | 'createdAt'>) => {
    notifLib.addNotification(n);
    refresh();
  }, [refresh]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        refresh,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (ctx === undefined) throw new Error('useNotifications must be used within NotificationsProvider');
  return ctx;
}
