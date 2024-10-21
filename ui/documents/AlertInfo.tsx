import React from 'react';
import styles from './AlertInfo.module.scss';

const AlertInfo = () => {
  return (
    <div className={styles.alertInfo}>
      <p>
        <span className={styles.noteText}>Please Note:</span> The following documents need to be <span className={styles.boldText}>certified and be valid for at least 3 months</span> for uploads:
       <span className={styles.boldText}> Identification Document, Highest Qualification and Unemployment Affidavit.</span>
      </p>
    </div>
  );
};

export default AlertInfo;