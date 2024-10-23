import React from 'react';
import styles from '@/app/components/student-profile/component-styling/managedocuments.module.scss';

interface Document {
  name: string;
  progress: number;
}

interface ManageDocumentsProps {
  documents: Document[];
  onClose: () => void;
}

const ManageDocuments: React.FC<ManageDocumentsProps> = ({ documents, onClose }) => {
  return (
    <div className={styles.manageDocuments}>
      <h3 className={styles.title}>Manage Documents</h3>
      <span className={styles.textWarning}>Only one file allowed for upload</span>
      <button onClick={onClose} className={styles.closeButton}>×</button>
      {documents.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '0%' }}>hi</div>
          </div>
        </div>
      ) : (
        documents.map((doc, index) => (
          <div key={index} className={styles.documentItem}>
            <div className={styles.documentInfo}>
              <span>{doc?.name?.slice(0, 14) +'...'+ doc?.name?.slice(-4)}</span>
              <button className={styles.removeButton}>×</button>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${doc.progress}%` }}
              ></div>
            </div>
            <span className={styles.progressText}>{doc.progress}%</span>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageDocuments;
