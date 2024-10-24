import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/banner/modal.module.css';


interface MaintenanceModalProps {
  show: boolean;
  onHide: () => void;
}

const MaintenanceModal: React.FC<MaintenanceModalProps> = ({ show, onHide }) => {
  const [timeRemaining, setTimeRemaining] = useState('24:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const [hours, minutes, seconds] = timeRemaining.split(':').map(Number);
      let totalSeconds = hours * 3600 + minutes * 60 + seconds;
      
      if (totalSeconds > 0) {
        totalSeconds--;
        const newHours = Math.floor(totalSeconds / 3600);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;
        setTimeRemaining(`${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  return (
    <Modal show={show} onHide={onHide} centered className={styles.mainModal}>
      <Modal.Body className={`${styles.modalContent} d-flex flex-column align-items-center`}>
        <div className={`${styles.iconWrapper} mb-3`}>
          <FontAwesomeIcon
            icon={faClock}
            className={styles.clockIcon}
            size="4x"
          />
        </div>
        
        <h5 className={`${styles.modalTitle} text-center mb-3`}>Notice: Scheduled Maintenance</h5>
        <p className="text-center small mb-3">
        Our Thooto site will be undergoing maintenance on 2024-05-01 from 09:00AM to 12:00PM. 
        </p>
        <h6 className={`${styles.countdownTitle} text-center mb-2 fs-5`}>Time Remaining</h6>
        <div className={`${styles.countdownWrapper} mb-4`}>
          <p className={`${styles.countdownTimer} mb-0`}>{timeRemaining}</p>
        </div>
        <p className="text-center small mb-4">
        Thank you for your understanding again.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button 
            className={`${styles.button} ${styles.secondaryButton} rbt-btn btn-sm`}
          >
            Read More
          </button>
          <button 
            onClick={onHide}
            className={`${styles.button} ${styles.primaryButton} rbt-btn btn-sm`}
          >
            Close
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MaintenanceModal;