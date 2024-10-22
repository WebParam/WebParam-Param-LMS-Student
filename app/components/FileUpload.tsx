'use client'

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import styles from '@/app/components/student-profile/component-styling/fileupload.module.scss';
import ManageDocuments from '@/app/components/ManageDocuments';

interface FileUploadProps {
  acceptedFileTypes: string;
  maxFileSize: number;
  visible?: boolean;
}

interface Document {
  name: string;
  progress: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ acceptedFileTypes, maxFileSize, visible = true }) => {
  if (!visible) return null;

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      simulateUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const simulateUpload = (file: File) => {
    const newDocument = { name: file.name, progress: 0 };
    setDocuments(prev => [...prev, newDocument]);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDocuments(prev => 
        prev.map(doc => 
          doc.name === file.name ? { ...doc, progress } : doc
        )
      );
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    // This is the container for the file upload component, if want to have a clear direction of the file upload component, we can add a border to it
    <div className={styles.fileUploadContainer} >
      {/* This is the header of the file upload component */}
      <div className={`${styles.header} mt-5`} >
        <h5>Upload Files</h5>
        <button className={styles.closeButton}>×</button>
      </div>
      {/* This is the content of the file upload component, everything inside the content is the file upload component */}
      <div className={`${styles.content} mt-9`} >
        <div className={styles.uploadSection} >
          <p className={styles.fileTypes}>Accepted file types include: {acceptedFileTypes}</p>
          <div {...getRootProps()} className={styles.dropzone}>
            <input {...getInputProps()} />
            <Image src="/svg/upload.svg" alt="Upload" width={70} height={70} />
            <p>Drop files to Upload<br />or <span className={styles.browse}>Browse</span></p>
          </div>
          <p className={styles.sizeLimit}>Files cannot exceed size {maxFileSize}MB</p>
        </div>
        <ManageDocuments documents={documents} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />
      
      <div className={styles.footer} >
        <button className={styles.saveButton}>Save</button>
      </div>
      </div>
    </div>
  );
};

export default FileUpload;