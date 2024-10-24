"use client";

import StudentDashboardSidebar from "@/ui/student/student-enrolled-courses/student-sidebar";
import styles from "@/styles/side-bar/side-bar-hide.module.css";
import MaintenanceModal from "@/ui/banner/MaintanceModal";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="d-flex">
      <StudentDashboardSidebar />
      <div className="flex-grow-1" style={{ marginLeft: "25%" }}>
        {children}
      </div>
    </div>
  );
}
