"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import ActiveAssessment from "@/ui/assessments/marked-assessments/active";
import CompletedAssessment from "@/ui/assessments/marked-assessments/completed";
import styles from "@/app/(protected)/student/assessments/assessments.module.css";
import { isMobile } from "react-device-detect";
import Statistics from "./(components)/Statistics";
import { AssessmentProvider, useAssessmentContext } from "../../../../ui/assessments/(context)/AssessmentContext";

function Assessments() {
  const { assessmentType, activeTab, setAssessmentType, setActiveTab } = useAssessmentContext();
  const router = useRouter();

  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">
        <div className="section-title">
          <h4 className="rbt-title-style-3">Assessments</h4>
        </div>
        <div className={styles.navAssignmentsContainer}>
          <div className="col-lg-10 offset-lg-1">
            <ul className="nav nav-tabs tab-button-style-2 justify-content-center" id="assessmentTypeTab" role="tablist">
              <li role="presentation" onClick={() => router.push('/student/assessments?type=summative&tab=active')} style={{cursor:'pointer'}}>
                <a className={`tab-button ${assessmentType === 'summative' ? 'active' : ''}`} id="summative-tab" role="tab" aria-selected={assessmentType === 'summative'}>
                  <span className="title">Summative</span>
                </a>
              </li>
              <li role="presentation" onClick={() => router.push('/student/assessments?type=formative&tab=active')} style={{cursor:'pointer'}}>
                <a className={`tab-button ${assessmentType === 'formative' ? 'active' : ''}`} id="formative-tab" role="tab" aria-selected={assessmentType === 'formative'}>
                  <span className="title">Formative</span>
                </a>
              </li>
            </ul>
            <ul className="nav nav-tabs tab-button-style-2 justify-content-center" id="myTab-4" role="tablist">
              <li role="presentation" onClick={() => router.push(`/student/assessments?type=${assessmentType}&tab=active`)} style={{cursor:'pointer'}}>
                <a className={`tab-button ${activeTab === 'active' ? 'active' : ''}`} id="profile-tab-4" role="tab" aria-selected={activeTab === 'active'}>
                  <span className="title">Active</span>
                </a>
              </li>
              <li role="presentation" onClick={() => router.push(`/student/assessments?type=${assessmentType}&tab=completed`)} style={{cursor:'pointer'}}>
                <a className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`} id="contact-tab-4" role="tab" aria-selected={activeTab === 'completed'}>
                  <span className="title">Completed</span>
                </a>
              </li>
              <li role="presentation" onClick={() => router.push(`/student/assessments?type=${assessmentType}&tab=statistics`)} style={{cursor:'pointer'}}>
                <a className={`tab-button ${activeTab === 'statistics' ? 'active' : ''}`} id="statistics-tab-4" role="tab" aria-selected={activeTab === 'statistics'}>
                  <span className="title">Statistics</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={isMobile ? "rbt-dashboard-table table-responsive mobile-table-200 mt-3" : "rbt-dashboard-table table-responsive mobile-table-200 mt-3"}>
          {activeTab === "completed" && <CompletedAssessment />}
          {activeTab === "active" && <ActiveAssessment />}
          {activeTab === "statistics" && <Statistics/>}
        </div>
      </div>
    </div>
  );
}

export default function AssignmentsPage() {


  return (
      <Suspense fallback={<div>Loading...</div>}>
        <AssessmentProvider>
          <Assessments />
        </AssessmentProvider>
      </Suspense>
  );
}