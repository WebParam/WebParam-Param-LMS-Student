'use client';
import React, { useState } from 'react';
import { useAssessmentContext } from '../(context)/AssessmentContext';
import { Modal } from 'react-bootstrap';
import Link from 'next/link';
import styles from '../../../styles/assessment/assessment.module.css'

const summativeData = [
  {
    id: 1,
    title: "Write a short essay on yourself",
    course: "Fundamentals 101",
    submissions: 2,
    link: "#",
  },
  {
    id: 2,
    title: "Speaking Korean for Beginners",
    course: "Speaking 101",
    submissions: 3,
    link: "#",
  },
];

const formativeData = [
  {
    id: 3,
    title: "Conflict Resolution Strategies",
    course: "Communication 103",
    submissions: 6,
    link: "#",
  },
  {
    id: 4,
    title: "Active Listening Skills",
    course: "Communication 104",
    submissions: 9,
    link: "#",
  },
];

export default function CompletedAssessment() {
  const [showDownload, setShowDownload] = useState(false);

  function handleDownload() {
    setShowDownload(true);
    setTimeout(() => {
      setShowDownload(false);
    }, 700);
  }

  const { assessmentType } = useAssessmentContext();
  const data = assessmentType === "summative" ? summativeData : formativeData;

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
            <th colSpan={2} className="fontSize12">Assessment (marks)</th>
            <th className="fontSize12">Submissions</th>
            <th className="fontSize12" style={{ textAlign: 'right', paddingRight: '60px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((assessment) => (
            <tr key={assessment.id}>
              <th colSpan={2}>
                <span className="h6 mb--5">{assessment.title}</span>
                <p className="b3">
                  Course: <a href={assessment.link}>{assessment.course}</a>
                </p>
              </th>
              <td>
                <p className="b3 text-align-center" style={{ textAlign: 'center' }}>{assessment.submissions}</p>
              </td>
              <td>
                <div className={`rbt-button-group justify-content-end ${styles.container}`}>
                  <Link
                    className={`rbt-btn btn-xs bg-primary-opacity radius-round ${styles.ViewLink}`}
                    title="View"
                    href={`/student/assessments/marked-assessment?id=${assessment.id}`}
                  >
                    <i className="float-left bi bi-eye pl--0" />
                    <span className="viewButtonText">View</span>
                  </Link>
                  <Link
                    className="rbt-btn btn-xs bg-dark-opacity radius-round"
                    title="Download assessment"
                    href={`https://khumla-dev-assessment-read.azurewebsites.net/api/v1/StudentAnswers/DownloadStudentAssignment/${assessment.id}`}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={handleDownload}
                  >
                    <i className="bi bi-box-arrow-down" style={{ paddingLeft: '0' }}></i>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
