import axios from "axios";
import { rNotificationUrl, wNotificationUrl } from "@/app/lib/endpoints";

export async function getNotifications(userId: any) {
  const res = await axios.get(
    `${rNotificationUrl}/api/v1/UserNotifications/GetUserNotifications/${userId}`,
    {
      headers: {
        'Client-Key': 'ec51852d24b1450faff0a868e84d05e5',
      },
    }
  );
  return res;
}


export async function markNotificationRead(notificationId: any) {
  const res = axios.put(
    `${wNotificationUrl}/api/UserNotifications/MarkNotificationAsRead/${notificationId}`
  );
  return res;
}
