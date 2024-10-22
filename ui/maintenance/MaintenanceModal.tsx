// components/MaintenanceModal.tsx
import React from 'react';
import Image from 'next/image';
import { Modal } from 'react-bootstrap';
import styles from './modal.module.css';

interface MaintenanceModalProps {
  show: boolean;
  onHide: () => void;
  endTime?: string;
}

const MaintenanceModal: React.FC<MaintenanceModalProps> = ({ show, onHide, endTime }) => {
  // Get today's date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal show={show} onHide={onHide} centered className={styles.mainModal}>
      <Modal.Body className={`${styles.modalContent} d-flex flex-column align-items-center`}>
        <div className={`${styles.imageWrapper} mb-3`}>
          <Image
            src="/images/banner/image.png"
            alt="Maintenance"
            width={150}
            height={150}
            className={styles.maintenanceImage}
          />
        </div>
       
        <h5 className={`${styles.modalTitle} text-center mb-3`}>It's a rainy day for our servers</h5>
        <p className="text-center small mb-3">
          Our system is down for a bit. We're working hard behind the scenes to clear the clouds and get things sunny again.
        </p>
        <div className={`${styles.curvedBox} mb-4`} style={{border: '2px solid  rgb(36, 52, 92)', padding: '15px'}}>
          <p className="small mb-1">Date: {getCurrentDate()}</p>
          <p className="small mb-1">Time of completion: {endTime ? endTime : 'N/A'}</p>
          <p className="small mb-0">Status: Under Maintenance</p>
        </div>
        <p className="text-center small mb-4">
          We apologize for the inconvenience. We'll keep you updated on the progress.
        </p>
        <button
          onClick={onHide}
          className="rbt-btn btn-md"
          style={{
            backgroundColor: 'rgb(36, 52, 92)',
            color: 'white',
            borderRadius: '6px',
            border: 'none',
            padding: '0 26px',
            height: '60px',
            lineHeight: '60px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default MaintenanceModal;
