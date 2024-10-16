"use client";

import StudentDashboardSidebar from "@/ui/student/student-enrolled-courses/student-sidebar";
import Calendar from "@/ui/classes/calendar";
import styles from "@/styles/side-bar/side-bar-hide.module.css";
import MaintenanceModal from "@/ui/banner/MaintanceModal";
import { useState } from "react";

export default function StudentLayout() {
  return (
    <div className="calendar-fullscreen">
      <StudentDashboardSidebar />
      <div
        className="calendar-wrapper"
        style={{ marginLeft: "20%", marginTop: "2%", marginBottom: "2%" }}
      >
        <Calendar />
      </div>
    </div>
  );
}
