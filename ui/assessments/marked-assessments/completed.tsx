'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useAssessmentContext } from '../(context)/AssessmentContext';
import { Modal } from 'react-bootstrap';
import Link from 'next/link';
import styles from '../../../styles/assessment/assessment.module.css'
import { GET } from '@/app/lib/api-client';
import Cookies from 'universal-cookie';
import { useSearchParams } from 'next/navigation';
import { rAssessmentUrl } from '@/app/lib/endpoints';

type Assessment = {
    mark: number;
    assessment: {
      title: string;
      courseId: string;
      type: number;
      totalMarks: number;
      dueDate: string;
      id: string;
      state: number;
    }
  }

function CompletedAssessment() {
  const [showDownload, setShowDownload] = useState(false);
  const [filteredAssessments, setFilteredAssessments] = useState<Assessment[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
 
  const cookies = new Cookies();
  const loggedInUser = cookies.get('loggedInUser');
  const userID = cookies.get('userID');

  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  useEffect(() => {
    fetchAssessments();
  }, []);

  async function fetchAssessments() {
    try {
      const response = await GET(`${rAssessmentUrl}/api/v1/StudentAnswers/GetStudentAssessments/${userID || loggedInUser?.userId}`);
      setAssessments(response.data);
    } catch (error) {
      console.error("Error fetching assessments:", error);
    }
  }
  
  function handleDownload() {
    setShowDownload(true);
    setTimeout(() => {
      setShowDownload(false);
    }, 700);
  }

  debugger;
  useEffect(() => {
    if(assessments.length > 0){    
      debugger;
    const filteredAssessments = assessments?.filter((assessment: Assessment) => assessment.assessment.type === (type === 'summative' ? 0:1));
    setFilteredAssessments(filteredAssessments);
    }
  }, [assessments]);


  return (
    <>
      <Modal
        show={showDownload}
        onHide={() => setShowDownload(false)}
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        centered
        backdrop="static"
      >
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
          <div className="spinner-border" role="status" />
        </div>
      </Modal>

      <table className="rbt-table table table-borderless" style={{minWidth:'10px'}}>
        <thead>
          <tr>
            <th colSpan={2} className="fontSize12">Assessment</th>
            <th className="fontSize12">Marks</th>
            <th className="fontSize12" style={{ textAlign: 'right', paddingRight: '60px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssessments.length > 0 ? filteredAssessments.map((assessment:any) => (
            <tr key={assessment.id}>
              <th colSpan={2}>
                {/* <span className="h6 mb--5">{assessment.title}</span> */}
                <p className="b3">
                  <span>{assessment?.assessment?.title}</span>
                </p>
              </th>
              <td>
                <p className="b3 text-align-center" style={{ textAlign: 'left' }}>{assessment?.mark}</p>
              </td>
              <td>
                <div className={`rbt-button-group justify-content-end ${styles.container}`}>
                  <Link
                    className={`rbt-btn btn-xs bg-primary-opacity radius-round ${styles.ViewLink}`}
                    title="View"
                    href={`/student/assessments/marked-assessment?id=${assessment?.assessment?.id}`}
                  >
                    <i className="float-left bi bi-eye pl--0" />
                    <span className="viewButtonText">View</span>
                  </Link>
                  <Link
                    className="rbt-btn btn-xs bg-dark-opacity radius-round"
                    title="Download assessment"
                    href={`https://khumla-dev-assessment-read.azurewebsites.net/api/v1/StudentAnswers/DownloadStudentAssignment/${assessment?.assessment?.id}`}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={handleDownload}
                  >
                    <i className="bi bi-box-arrow-down" style={{ paddingLeft: '0' }}></i>
                  </Link>
                </div>
              </td>
            </tr>
          )) : <tr><td colSpan={4} className="text-center">No assessments found</td></tr>}
        </tbody>
      </table>
    </>
  );
}

export default function CompletedAssessmentPage() {
  return <Suspense fallback={<div>Loading...</div>}>
    <CompletedAssessment />
  </Suspense>
}
