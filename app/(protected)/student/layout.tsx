"use client";

import StudentDashboardSidebar from "@/ui/student/student-enrolled-courses/student-sidebar";
import styles from "@/styles/side-bar/side-bar-hide.module.css";
import InstructorDashboardHeader from "@/ui/dashboard/dashboard-wrapper";
import MaintenanceModal from '@/ui/banner/MaintanceModal';
import { useState, useEffect } from 'react';
import { useCourseId } from "@/context/courseId-context/courseId-context";
import { TrackTimeSpent } from "@/app/api/trackTimeSpent/timeSpent";
import Cookies from "universal-cookie";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const { courseId } = useCourseId();
  const _courseId = courseId || process.env.NEXT_PUBLIC_COURSE_ID;
  const cookie = new Cookies();
  const userId = cookie.get('userID')??"";
  const loggedInUser = cookie.get('loggedInUser');

  async function funcTrackTimeSpent() {
    try {
      if (_courseId) {
        const payload = {
          courseId: _courseId,
          userId: userId ?? loggedInUser?.data?.id,
        };
        const res = await TrackTimeSpent(payload);
        debugger;
        if (res?.data?.data?.id) {
          localStorage.setItem('trackTimeSpentId',res.data.data.id);
          localStorage.setItem('startTimeTrack', res.data.data.startTime);
        }
      }
    } catch (error) {
      console.error("Error tracking time spent:", error);
    }
  }
  
    useEffect(()=>{
     funcTrackTimeSpent()
    },[_courseId])

  return (
    <>
      <div className="rbt-page-banner-wrapper">
        {/* <div className="rbt-banner-image custom-banner" /> */}
      </div>

      <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <InstructorDashboardHeader />
              <div className="row g-5">
                <div className={`col-lg-3 ${styles.sidebarHiddenOnMobile}`}>
                  <StudentDashboardSidebar />
                </div>
                <div className="col-lg-9">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MaintenanceModal 
        show={showMaintenanceModal} 
        onHide={() => setShowMaintenanceModal(false)} 
      />
    </>
  );
}
