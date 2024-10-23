'use client'

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import styles from '@/app/components/student-profile/component-styling/fileupload.module.scss';
import ManageDocuments from '@/app/components/ManageDocuments';
import { useSearchParams } from 'next/navigation';
import Cookies from 'universal-cookie';
import { POST_MULTIPART } from '../lib/api-client';
import { writeUserData } from '../lib/endpoints';
import { getStudentDocuments } from '../api/studentProfile/studentprofile';

interface FileUploadProps {
  acceptedFileTypes: string;
  maxFileSize: number;
  visible?: boolean;
}

interface Document {
  name: string;
  progress: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ acceptedFileTypes='', maxFileSize=10, visible = true }) => {
  const [uploadedFile, setUploadedFile] = useState<File | any>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingLoader,setUpLoadingLoader] = useState(false);
  const [doc,setDoc] = useState<any>(null);
  const searchParams = useSearchParams();
  const document = searchParams.get('document')??"";
  const type = searchParams.get('type')??"";

  const cookies = new Cookies();
  const loggedInUser = cookies.get('loggedInUser');
  const userId = cookies.get('userID');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (!visible) return null;

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

  const handleUpload = async () => {
    debugger
    setUpLoadingLoader(true);

   
    
    if (uploadedFile) {
      simulateUpload(uploadedFile);
      const formData = new FormData();
      formData.append('UserId', loggedInUser.data.id);
      // formData.append('Name', type);

      formData.append('File', uploadedFile as Blob);

      try {
        const response = await POST_MULTIPART(`${writeUserData}/api/v1/Profile/SubmitDocument`, formData);
        
       console.log(response);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUpLoadingLoader(false);
        // setIsUploading(false);
        // setSelectedFile(null);
        // setIsUploaded(false);
        // router.push(`/student/student-profile?tab=documents`);
        // window.location.reload();
      }
    }
  };



  return (
    // This is the container for the file upload component, if want to have a clear direction of the file upload component, we can add a border to it
    <div className={styles.fileUploadContainer} >
      {/* This is the header of the file upload component */}
      <div className={`${styles.header} mt-5`} >
        <h5>{document}</h5>
        <button className={styles.closeButton}>×</button>
      </div>
      {/* This is the content of the file upload component, everything inside the content is the file upload component */}
      <div className={`${styles.content} mt-9`} >
        <div className={styles.uploadSection} >
          <p className={styles.fileTypes}>Accepted file types include: {acceptedFileTypes}</p>
          <div {...getRootProps()} className={styles.dropzone}>
            <input {...getInputProps()} accept='pdf' />
            <Image src="/svg/upload.svg" alt="Upload" width={70} height={70} />
            <p>Drop files to Upload<br />or <span className={styles.browse}>Browse</span></p>
            <div>
              <p>{uploadedFile && uploadedFile?.name.slice(0, 18) +'...'+ uploadedFile?.name?.slice(-4)}</p>
            </div>
          </div>
          <p className={styles.sizeLimit}>Files cannot exceed size {maxFileSize}MB</p>
        </div>
        <ManageDocuments  documents={documents} onClose={() => {
          console.log("close");
        }} />
      
      <div className={styles.footer} >
        <button className={styles.saveButton} onClick={handleUpload}>Upload</button>
      </div>
      </div>
    </div>
  );
};

export default FileUpload;
