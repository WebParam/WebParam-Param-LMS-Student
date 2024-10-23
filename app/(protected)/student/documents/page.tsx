'use client';

import React, { useEffect, useState } from 'react';
import styles from './documents.module.scss';
import DocumentList from '@/ui/documents/DocumentList';
import DownloadSection from '@/ui/documents/DocumentSection';
import AlertInfo from '@/ui/documents/AlertInfo';
import FileUpload from '@/app/components/FileUpload';

const ManageDocuments = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={styles['documents-container']}>
      <div className={styles['content-wrapper']}>
        <h1 className={styles['page-title']}>Manage Documents</h1>
        <p>
          Manage your programme onboarding documents here. Please ensure that all documentation are kept up to date
          should anything change throughout the lifecycle of your programme.
        </p>
        <p>
          Should you experience any difficulties with uploading your documents please email{' '}
          <a href="mailto:support@romolo.com">programmes@ramalo.co.za</a>
        </p>
        <DownloadSection />
        <AlertInfo />
        <h2>Profile Documents</h2>
        <DocumentList />
      </div>
    </div>
  );
};

export default ManageDocuments;
