export interface MessageData {
    createdAt: string;
    id: string;
    isRead: boolean;
    message: string;
    notificationId: string;
    reminder: boolean;
    reminderTime: string;
    senderName: string | null;
    title: string | null;
    userId: string;
  }