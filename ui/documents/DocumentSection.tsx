import React from 'react';
import styles from './DownloadSection.module.scss';

const DownloadSection = () => {
  return (
    <div className={styles.downloadSection}>
      <p>Download, complete and upload the files below:</p>
      <div className={styles.downloadButtons}>
        <button className={styles.downloadButton}>
          EEA Form.pdf 3MB
          <i className="bi bi-download"></i>
        </button>
        <button className={styles.downloadButton}>
          Unemployment Form.pdf 5MB
          <i className="bi bi-download"></i>
        </button>
      </div>
    </div>
  );
};

export default DownloadSection;