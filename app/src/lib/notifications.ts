import type { AppNotification } from '@/types';
import { IS_DEMO } from '@/lib/config';

const STORAGE_KEY = 'influconnect_notifications';

export function getNotifications(): AppNotification[] {
  if (!IS_DEMO) {
    // En producción real, las notificaciones deberían venir de la API
    return [];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveNotifications(notifications: AppNotification[]): void {
  if (!IS_DEMO) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
}

export function getNotificationsForUser(userId: string): AppNotification[] {
  return getNotifications()
    .filter((n) => n.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function getUnreadCount(userId: string): number {
  return getNotificationsForUser(userId).filter((n) => !n.read).length;
}

export function markAsRead(notificationId: string): void {
  const list = getNotifications();
  const idx = list.findIndex((n) => n.id === notificationId);
  if (idx !== -1) {
    list[idx] = { ...list[idx], read: true };
    saveNotifications(list);
  }
}

export function markAllAsRead(userId: string): void {
  const list = getNotifications().map((n) =>
    n.userId === userId ? { ...n, read: true } : n,
  );
  saveNotifications(list);
}

export function addNotification(
  notification: Omit<AppNotification, 'id' | 'read' | 'createdAt'>,
): void {
  const list = getNotifications();
  const newOne: AppNotification = {
    ...notification,
    id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    read: false,
    createdAt: new Date().toISOString(),
  };
  list.unshift(newOne);
  saveNotifications(list);
}
