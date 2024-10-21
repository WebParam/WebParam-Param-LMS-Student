'use client';

import React from 'react';
import styles from './documents.module.scss';
import DocumentList from '@/ui/documents/DocumentList';
import DownloadSection from '@/ui/documents/DocumentSection';
import AlertInfo from '@/ui/documents/AlertInfo';

export default function ManageDocuments() {
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
}