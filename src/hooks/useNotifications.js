import { useState } from "react";
import { SEED_NOTIFICATIONS, SEED_ACTIVITY } from "../data/notifications.js";

export function useNotifications() {
  const [notifs, setNotifs]     = useState(SEED_NOTIFICATIONS);
  const [activity, setActivity] = useState(SEED_ACTIVITY);

  const markAllRead = () => setNotifs((n) => n.map((x) => ({ ...x, read: true })));

  const unreadCount = notifs.filter((n) => !n.read).length;

  return { notifs, setNotifs, activity, setActivity, markAllRead, unreadCount };
}
