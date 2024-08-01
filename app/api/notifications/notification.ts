import axios from "axios";
import { getnotificationUrl } from "../endpoints";
import { notificationWriteUrl } from "../endpoints";

export async function getNotifications(userId:any) {
    const res = axios.get(`${getnotificationUrl}/api/v1/UserNotifications/GetUserNotifications/${userId}`)
    return res;
}

export async function markNotificationRead(notificationId:any) {
    const res = axios.put(`${notificationWriteUrl}/api/UserNotifications/MarkNotificationAsRead/${notificationId}`)
    return res;
}