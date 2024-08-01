'use client'
import React, { useEffect, useState } from 'react';
import './uploadDocs.scss';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { deployedUrl } from '@/app/api/endpoints';
import { getStudentDocuments } from '@/app/api/studentProfile/studentprofile';
import { documentsRequired } from './data';
import Loading from './loading';

const pdfVersion = "2.16.105";
const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.js`;

// Update DocumentType to use the keys from documentsRequired
type DocumentType = typeof documentsRequired[number]['documentName'];

const FileUpload: React.FC = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [isUploading, setIsUploading] = useState(false);
  const [upLoadingLoader, setUpLoadingLoader] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ type: DocumentType; file: File | null } | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [documentToView, setDocumentToView] = useState('');
  const [isChangingDoc, setIsChangingDoc] = useState(false);
  const [loaded, setLoader] = useState(true);
  const [docToChange, setDocToChange] = useState<any>()

  const [files, setFiles] = useState<Record<DocumentType, File | null>>(
    documentsRequired.reduce((acc, doc) => {
      acc[doc.documentName] = null;
      return acc;
    }, {} as Record<DocumentType, File | null>)
  );

  const cookies = new Cookies();
  const user = cookies.get('loggedInUser');

  async function getDocuments() {
    setLoader(true);
    try {
      if (user?.data) {
        const docs = await getStudentDocuments(user?.data.id || user?.data?.userId);

        if (docs) {
          setDocuments(docs?.data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoader(false); // Ensure loader is hidden once the fetch is complete
    }
  }

  function viewDocument(docId: string) {
    console.log(docId);
    setDocumentToView(docId);
    setShowDocumentModal(true);
  }

  const [dragging, setDragging] = useState<Record<DocumentType, boolean>>(
    documentsRequired.reduce((acc, doc) => {
      acc[doc.documentName] = false;
      return acc;
    }, {} as Record<DocumentType, boolean>)
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: DocumentType) => {
    if (event.target.files) {
      setFiles({ ...files, [type]: event.target.files[0] });
      setSelectedFile({ type, file: event.target.files[0] });
      setIsUploading(true);
      setDragging({ ...dragging, [type]: false });
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, type: DocumentType) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setFiles({ ...files, [type]: event.dataTransfer.files[0] });
      setSelectedFile({ type, file: event.dataTransfer.files[0] });
      setIsUploading(true);
      setDragging({ ...dragging, [type]: false });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, type: DocumentType) => {
    event.preventDefault();
    setDragging({ ...dragging, [type]: true });
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>, type: DocumentType) => {
    event.preventDefault();
    setDragging({ ...dragging, [type]: false });
  };

  const handleUpload = async () => {
    setUpLoadingLoader(true);
    debugger;
    if (selectedFile && selectedFile.file) {
      const formData = new FormData();
      formData.append('UserId', user.data.id);
      formData.append('Name', selectedFile.type);
      const type = documentsRequired.findIndex(doc => doc.documentName === selectedFile.type);

      console.log('type: ', type, documentsRequired);

      if (type !== undefined) {
        formData.append('Type', type.toString());
      }
      formData.append('File', selectedFile.file);

      try {
        const response = await axios.post(`${deployedUrl}/api/v1/Profile/SubmitDocument`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          setIsUploaded(true);
          window.location.reload();
        } else {
          alert('File upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('File upload failed');
      } finally {
        setUpLoadingLoader(false);
        setIsUploading(false);
        setSelectedFile(null);
        setIsUploaded(false);
      }
    }
  };

  const handleChangeDocument = async (document: any) => {
    if (selectedFile && selectedFile.file) {
      const formData = new FormData();
      formData.append('File', selectedFile.file);
      formData.append('DocumentId', document?.id);

      try {
        const response = await axios.put(`https://khumla-dev-user-write.azurewebsites.net/api/Documents/UpdateStudentDocument`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          setIsUploaded(true);
          window.location.reload();
        } else {
          alert('File upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('File upload failed');
      } finally {
        setUpLoadingLoader(false);
        setIsChangingDoc(false);
        setSelectedFile(null);
        setIsUploaded(false);
      }
    }
  };

  const customModalStyles = {
    modal: {
      maxWidth: '50%',
      width: '50%',
      borderRadius: '10px',
      backgroundColor: 'white',
    },
  };

  useEffect(() => {
    getDocuments();
    console.log('documents:', documents);
  }, []);

  useEffect(() => {
    console.log('documents:', documents);
  }, [documents]);

  if (loaded) {
    debugger;
    return <Loading />; // Show loading while documents are being fetched
  }

  
  // if (!loaded) {
  //   debugger;
  //   return <Loading />; // Show loading while documents are being fetched
  // }

  return (
    <>
      {/* Modal for uploading new documents */}
      <Modal show={isUploading} styles={customModalStyles} onHide={() => setIsUploading(false)} centered>
        {isUploaded ? (
          <div className='successUpload'>
            <i className="bi bi-check-circle-fill" />
            <button onClick={() => setIsUploading(false)}>Close</button>
          </div>
        ) : (
          <div className='modalContainer'>
            {upLoadingLoader ? (
              <>
                <div className="spinner-border text-success" role="status" />
                <p>Uploading...</p>
              </>
            ) : (
              <>
                <h4>Confirm upload of the following file:</h4>
                <p>{selectedFile?.file?.name}</p>
                <button onClick={handleUpload}>Upload</button>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Modal for changing existing documents */}
      <Modal show={isChangingDoc} styles={customModalStyles} onHide={() => setIsChangingDoc(false)} centered>
        {isUploaded ? (
          <div className='successUpload'>
            <i className="bi bi-check-circle-fill" />
            <button onClick={() => setIsChangingDoc(false)}>Close</button>
          </div>
        ) : (
          <div className='modalContainer'>
            {upLoadingLoader ? (
              <>
                <div className="spinner-border text-success" role="status" />
                <p>Uploading...</p>
              </>
            ) : (
              <>
                <h4>Confirm change of the following file:</h4>
                <p>{selectedFile?.file?.name}</p>
                <button onClick={() => handleChangeDocument(docToChange)}>Upload</button>
              </>
            )}
          </div>
        )}
      </Modal>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showDocumentModal}
        onHide={() => setShowDocumentModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Document Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Worker workerUrl={pdfWorkerUrl}>
            <Viewer
              fileUrl={`https://khumla-dev-user-read.azurewebsites.net/api/v1/Documents/PreviewDocument/${documentToView}`}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </Modal.Body>
      </Modal>
      <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{width:'80%', margin:'0 auto'}}>
        <span className="fw-semibold">Attention!</span> Please upload all your documents to proceed.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div className="requiredDocs">
        {documentsRequired.map((doc, index) => {
          const docType = doc.documentName as DocumentType;
          const matchingDoc = documents.find((doc) => doc.type === index);

          return (
            <div
              className={`docContainer ${matchingDoc && 'uploaded'} ${dragging[docType] ? 'dragover' : ''}`}
              key={index}
              onDrop={(event) => handleDrop(event, docType)}
              onDragOver={(event) => handleDragOver(event, docType)}
              onDragLeave={(event) => handleDragLeave(event, docType)}
            >
              <h6>{docType.charAt(0).toUpperCase() + docType.slice(1)}</h6>
              <h3>Drag and drop your file here</h3>
              <div>
                {matchingDoc ? (
                  <i className="bi bi-file-check-fill" style={{ cursor: 'pointer', color:'#dfedfa' }} onClick={() => viewDocument(matchingDoc.id)}></i>
                ) : (
                  <i className="bi bi-cloud-arrow-up"></i>
                )}

                {matchingDoc && (
                  <span
                    onClick={() => viewDocument(matchingDoc.id)}
                    style={{ display: 'block', cursor: 'pointer', fontSize: '12px', marginTop: '10px', textDecoration: 'underline', color: 'green' }}
                  >
                    View doc
                  </span>
                )}
              </div>
              <h5>OR</h5>
              {files[docType] && <p className="fileName">{files[docType]?.name}</p>}
              <input
                type="file"
                name={docType}
                id={docType}
                accept="application/pdf"
                onChange={(event) => {
                  setSelectedFile({ type: docType, file: event.target.files ? event.target.files[0] : null });
                  if (matchingDoc) {
                    setIsChangingDoc(true);
                    setDocToChange(matchingDoc);
                  } else {
                    setIsUploading(true);
                  }
                  handleFileChange(event, docType);
                }}
              />

              {matchingDoc ? (
                <label htmlFor={docType} style={{background:'2F4F9E'}}>Change</label>
              ) : (
                <label htmlFor={docType}>Browse Files</label>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FileUpload;
