import axios from "axios";
import { rNotificationUrl, wNotificationUrl } from "@/app/lib/endpoints";

export async function getNotifications(userId: any) {
  const res = axios.get(
    `${rNotificationUrl}/api/v1/UserNotifications/GetUserNotifications/${userId}`
  );
  return res;
}

export async function markNotificationRead(notificationId: any) {
  const res = axios.put(
    `${wNotificationUrl}/api/UserNotifications/MarkNotificationAsRead/${notificationId}`
  );
  return res;
}
