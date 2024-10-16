'use client';

import React, { useState } from 'react';
import DropdownItems from './components/DropdownItems';
import SearchInput from './components/SearchInput';
import Image from 'next/image';
import Img from './svg/Img.png';
import dummyImg from './svg/dyummyImg.svg';
import styles from './Message.module.scss';

export default function Message() {
  const [imageError, setImageError] = useState(false);
  const data = `
    <div>
      <p>Subject: <strong>Reminder: Monthly Check-In Past Due</strong></p>
      <p>Hello Nicole,</p>
      <p>
        I noticed that your monthly check-in is past due. It's important that you complete it as soon as possible, as it is mandatory for all participants in the program. We value your comfort and experience during the program and encourage you to submit your check-in promptly.
      </p>
      <p>Kind regards,<br />Bongani Kufa</p>
    </div>
  `;

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

        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={styles.listMessages}
            style={index === 0 ? { backgroundColor: 'rgba(254, 69, 122, 0.05)' } : {}}
          >
            <div className={styles.innerContent}>
              <div className={styles.circle}></div>
              <div className={styles.messageDetails}>
                <div className={styles.messageHeading}>Monthly Check-In</div>
                <div className={styles.messagePera}>
                  Hey Nicole, we noticed that your Hey Nicole, we noticed that your Hey Nicole, Hey
                  Nicole, we noticed that your Hey Nicole, we noticed that your Hey Nicole, we noticed
                  Hey Nicole, we noticed that your Hey Nicole, we noticed that your Hey Nicole, we
                  noticed we noticed that your
                </div>
                <div className={styles.messageIno}>
                  <div className={styles.senderName}>Bongani Kufa</div>
                  <div className={styles.messageTime}>2:32pm</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.showMessage}>
        <SearchInput />
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
            <div className={styles.profileName}>Bongani Kufa</div>
          </div>
          <div className={styles.msgTime}>2:32pm</div>
        </div>
        <div className={styles.line}/>
        <div className={styles.viewMsgHeading}>Monthly Check-In</div>
        <div dangerouslySetInnerHTML={{ __html: data }} />
      </div>
    </div>
  );
} 