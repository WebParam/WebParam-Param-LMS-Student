'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dummyImg from '@/public/svg/dyummyImg.svg';
import Img from '@/public/images/message/Img.png';
import { getNotifications } from '@/app/api/notifications/notification';
import DropdownItems from '@/ui/student/messages/DropdownItems';
import SearchInput from '@/ui/student/messages/SearchInput';
import styles from './Messages.module.scss'
import { MessageData } from '@/interfaces/messages/messages-interface';
import loaderStyles from "@/ui/loader-ui/loader.module.css";

export default function Message() {
  const [imageError, setImageError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [showMessage, setShowMessage] = useState<MessageData | null>(null);

  async function fetchNotifications(userId: string) {
    setLoading(true);
    try {
      const res = await getNotifications(userId);
      setLoading(false);
      console.log(res.data.data, "resres");
      setMessages(res.data.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching notifications:", error);
    }
  }

  useEffect(() => {
    fetchNotifications('66851cd94b5009327c77bbe4');
  }, [])

  return (
    <div className={styles.messageContainer}>
      <div className={styles.listMessagesContainer}>
        <div className={styles.newMessages}>
          <h2 className={styles.msgHeading}>Messages</h2>
          <div className={styles.messageCount}>2</div>
        </div>
        <div className={styles.messagesSearchFilter}>
          <DropdownItems />
        </div>

        {loading ? (
          <div className='d-flex justify-content-center align-content-center'>
            <span className={loaderStyles.loaderButton}></span>
          </div>
        ) : (
          messages.map((message, index) => (
            <button
              key={message.id}
              className={styles.listMessages}
              style={message.isRead ? { backgroundColor: 'rgba(254, 69, 122, 0.05)' } : {}}
              onClick={() => setShowMessage(message)} // Corrected function name here
            >
              <div className={styles.innerContent}>
                {message.isRead ? <div className={styles.isRead}></div> : <div className={styles.notRead}></div>}
                <div className={styles.messageDetails}>
                  <div className={styles.messageHeading}>{message.title ?? 'No Title'}</div>
                  <div className={styles.messagePeraSection}>
                    <p className={styles.messagePera}>{message.message}</p>
                    <div className={styles.messageIno}>
                      <div className={styles.senderName}>{message.senderName ?? 'Unknown Sender'}</div>
                      <div className={styles.messageTime}>2:32pm</div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      <div className={styles.showMessage}>
        <SearchInput />
        {showMessage && (
          <>
            <div className={styles.profileInfoSection}>
              <div className={styles.profileInfo}>
                <div className={styles.profileAvatar}>
                  {imageError ? (
                    <Image
                      src={dummyImg}
                      alt="Profile Avatar"
                      width={40}
                      height={40}
                      className={styles.profileImage}
                    />
                  ) : (
                    <Image
                      src={Img}
                      alt="Profile Avatar"
                      width={40}
                      height={40}
                      className={styles.profileImage}
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>
                <div className={styles.profileName}>{showMessage.senderName ?? 'Unknown Sender'}</div>
              </div>
              <div className={styles.msgTime}>2:32pm</div>
            </div>
            <div className={styles.line} />
            <div className={styles.viewMsgHeading}>{showMessage.title ?? 'No Title'}</div>
            <div dangerouslySetInnerHTML={{ __html: showMessage.message }} />
          </>
        )}
      </div>
    </div>
  );
} 