import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import styles from './DocumentList.module.scss';

const documents = [
  { name: 'Identification Document' },
  { name: 'Highest Qualification' },
  { name: 'CV / Resume' },
  { name: 'Unemployment Affidavit' },
  { name: 'EEA Form' },
  { name: 'Driver Documents' },
  { name: 'Lease Contract' },
  { name: 'Bank Confirmation Letter' },
  { name: 'Proof of Address' },
  { name: 'Drivers License' },
  { name: 'Police Clearance' },
  { name: 'Employment Contract' },
  { name: 'Insurance Document' },
];

const DocumentList = () => {
  return (
    <div className={styles.documentList}>
      {documents.map((doc, index) => (
        <div key={index} className={styles.documentItem}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faFolderOpen} />
          </div>
          <span>{doc.name}</span>
          <button className={styles.uploadButton}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;