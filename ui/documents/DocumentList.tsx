'use client';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faFolderOpen, faEye } from '@fortawesome/free-solid-svg-icons';
import styles from './DocumentList.module.scss';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import FileUpload from '@/app/components/FileUpload';
import Cookies from 'universal-cookie';
import { getStudentDocuments } from '@/app/api/studentProfile/studentprofile';


const documents = [
  { name: 'Identification Document', num:0 },
  { name: 'Highest Qualification', num:14 },
  { name: 'CV / Resume', num:2 },
  { name: 'Unemployment Affidavit', num:3 },
  { name: 'EEA Form', num:10 },
  { name: 'Driver Documents', num:5 },
  { name: 'Lease Contract', num:6 },
  { name: 'Bank Confirmation Letter', num:11 },
  { name: 'Proof of Address', num:8 },
  { name: 'Drivers License', num:9 },
  { name: 'Police Clearance', num:10 },
  { name: 'Employment Contract', num:11 },
  { name: 'Insurance Document', num:12 },
];

const DocumentList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const document = searchParams.get('document');

  const cookies = new Cookies();
  const loggedInUser = cookies.get('loggedInUser');
  const userId = cookies.get('userID');

  useEffect(() => {
    getDocuments();
  }, []);

  async function getDocuments() {
    
    try {
      if (loggedInUser?.data) {
        const docs = await getStudentDocuments(userId || loggedInUser?.data?.id);

        if (docs) {
          
          const doc = docs?.data?.data;
          console.log('doc in this pages:',doc);
        }
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      // setLoader(false); // Ensure loader is hidden once the fetch is complete
    }
  }

 

  if (document) {
    return (
      <FileUpload acceptedFileTypes='.pdf,.doc,.docx' maxFileSize={10} />
    )
  }


  return (
    <div className={styles.documentList}>
      {documents.map((doc, index) => (
        <div key={index} className={styles.documentItem} onClick={() => (router.push(`/student/documents?document=${doc.name}&type=${doc.num}`))}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faFolderOpen} />
          </div>
          <span>{doc.name}</span>
          <Link href={`/student/documents/${doc.name}`} className={styles.uploadButton}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Link> 
           
        </div>
      ))}
    </div>
  );
};

export default DocumentList;