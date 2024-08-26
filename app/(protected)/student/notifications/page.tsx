"use client";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { markNotificationRead } from "@/app/api/notifications/notification";
import { notificationType } from "@/app/Utils/notificationInterface";
import Cookies from "universal-cookie";
import NotificationsSkeleton from "./loading";

export default function Notifications() {
  const [showNotification, setShowNotification] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notifications, setNotifications] = useState<notificationType[]>([]);
  const [notification, setNotification] = useState<notificationType | null>(null);
  const [isReadLoader, setIsReadLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();

  const user = cookies.get("loggedInUser");

  async function fetchNotifications(userId: string) {
    try {
      const dummyNotifications: notificationType[] = [
        { id: '1', createdAt: '2024-08-01T09:00:00Z', message: 'New assignment: Project Charter due on 2024-08-15.', isRead: false, notificationId: '1', userId: 'user1', reminder: false, reminderTime: '2024-08-01T09:00:00Z' },
        { id: '2', createdAt: '2024-08-02T14:30:00Z', message: 'Reminder: Team meeting scheduled for 2024-08-05 at 10:00 AM.', isRead: true, notificationId: '2', userId: 'user2', reminder: true, reminderTime: '2024-08-02T14:30:00Z' },
        { id: '3', createdAt: '2024-08-03T08:45:00Z', message: 'Feedback received on your Project Scope Statement.', isRead: false, notificationId: '3', userId: 'user3', reminder: false, reminderTime: '2024-08-03T08:45:00Z' },
        { id: '4', createdAt: '2024-08-04T12:00:00Z', message: 'New resource added: Risk Management Plan template.', isRead: true, notificationId: '4', userId: 'user4', reminder: false, reminderTime: '2024-08-04T12:00:00Z' },
        { id: '5', createdAt: '2024-08-05T16:00:00Z', message: 'Your project proposal has been approved.', isRead: false, notificationId: '5', userId: 'user5', reminder: false, reminderTime: '2024-08-05T16:00:00Z' },
      ];
      setNotifications(dummyNotifications);
      setLoading(false);
      console.log("response: ", dummyNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      console.log("user", String(user.data.id));
      fetchNotifications(user.data.id || user.data.userId);
    }

    console.log("response: ", notifications);
  }, [isReadLoader]);

  async function handleShowNotification(notif: notificationType) {
    const index = notifications.findIndex((alert) => alert.id === notif.id);
    const noti = notifications.find((alert) => alert.id === notif.id);
    setCurrentIndex(index);
    setNotification(notif);
    setIsReadLoader(true);
    setShowNotification(true);

    if (noti?.isRead === false) {
      try {
        const markAsRead = await markNotificationRead(notif.id);
        if (markAsRead.status === 200) {
          const updatedNotifications = notifications.map((alert) =>
            alert.id === notif.id ? { ...alert, isRead: true } : alert
          );
          setNotifications(updatedNotifications);
          setIsReadLoader(false);
        }
      } catch (error) {
        console.error("Error marking notification as read:", error);
        setIsReadLoader(false);
      }
    }
  }

  function handleNotificationNext() {
    const nextIndex = (currentIndex + 1) % notifications.length;
    setCurrentIndex(nextIndex);
    setNotification(notifications[nextIndex]);
  }

  function handleNotificationPrev() {
    const prevIndex = (currentIndex - 1 + notifications.length) % notifications.length;
    setCurrentIndex(prevIndex);
    setNotification(notifications[prevIndex]);
  }

  if (loading) {
    return (
      <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
        <div className="content">
          <div className="section-title">
            <h4 className="rbt-title-style-3">Notifications</h4>
          </div>
          <div className="advance-tab-button mb--30"></div>
          <div className="tab-content">
            <NotificationsSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal
        className="modal fade"
        id="staticBackdrop"
        size="lg"
        show={showNotification}
        onHide={() => setShowNotification(false)}
        centered
      >
        <Modal.Header className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">
            Received: <span style={{ fontWeight: "400", fontSize: "15px" }}>{notification?.createdAt.split("T")[0]}</span>
          </h5>
          <button type="button" onClick={() => setShowNotification(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </Modal.Header>
        {isReadLoader && notification?.isRead === false ? (
          <div style={{ height: "70px", width: "100%" }} className="d-flex justify-content-center align-items-center flex-column gap-2">
            <div className="spinner-border text-dark" role="status" />
            <p>opening message...</p>
          </div>
        ) : (
          <>
            <Modal.Body className="modal-body">
              <p>{notification?.message}</p>
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex justify-content-between align-center w-100" style={{ width: "100%", alignItems: "center" }}>
                <p className="p-0 m-0">{currentIndex + 1}/{notifications?.length}</p>
                <div className="d-flex justify-content-between align-center gap-2">
                  <button type="button" onClick={handleNotificationPrev} className="btn btn-lg btn-dark text-light btn-outline-dark">
                    Prev
                  </button>
                  <button type="button" onClick={handleNotificationNext} className="btn btn-lg btn-dark text-light btn-outline-dark">
                    Next
                  </button>
                </div>
              </div>
            </Modal.Footer>
          </>
        )}
      </Modal>

      <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
        <div className="content">
          <div className="section-title">
            <h4 className="rbt-title-style-3">Notifications</h4>
          </div>
          <div className="advance-tab-button mb--30"></div>
          <div className="tab-content">
            <div className="tab-pane fade active show" id="received" role="tabpanel" aria-labelledby="received-tab">
              <div className="rbt-dashboard-table table-responsive mobile-table-750">
                <table className="rbt-table table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Message</th>
                      <th>
                        <button type="button" className="btn btn-dark">
                          Unread <span className="badge bg-light text-dark ms-1">{notifications.filter((item) => item.isRead === false).length}</span>
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.length > 0 ? (
                      notifications.map((alert) => (
                        <tr key={alert.id} onClick={() => handleShowNotification(alert)} style={{ cursor: "pointer" }}>
                          <td>{alert.createdAt.split("T")[0]}</td>
                          <td>
                            <p className="b2" style={{ fontWeight: `${alert.isRead ? "400" : "700"}` }}>{alert.message}</p>
                          </td>
                          <td className="d-flex justify-content-center">
                            {alert.isRead ? <i className="bi bi-envelope-open" style={{ fontSize: "1.2em" }}></i> : <i className="bi bi-envelope-fill" style={{ fontSize: "1.2em" }}></i>}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center">
                          <div className="m-4">Notifications will appear here</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}