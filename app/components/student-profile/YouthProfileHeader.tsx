import Image from 'next/image';
import styles from './component-styling/YouthProfileHeader.module.css';

const YouthProfileHeader: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.profileInfo}>
        <Image
          src="/images/banner/Ellipse 10.png"
          alt="Youth Name"
          width={100}
          height={100}
          className={styles.profileImage}
        />
        <div className={styles.textInfo}>
          <h2>Youth Name</h2>
          <p>Youth Role | Host Placement Partner</p>
          <p>Cape Town, Western Cape</p>
          <p>Date Started: July 2022</p>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.editButton}>Edit Profile</button>
        <button className={styles.messageButton}>Send Message</button>
      </div>
    </div>
  );
};

export default YouthProfileHeader;