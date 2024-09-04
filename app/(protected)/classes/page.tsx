"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "@/ui/classes/calendar";
import "./classes.scss"; 

export default function ClassesPage() {
  const router = useRouter();

  useEffect(() => {
    // Add any necessary side effects here
  }, []);

  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">
        <div className="section-title">
          <h4 className="rbt-title-style-3">Classes</h4>
        </div>
        <div className="rbt-dashboard-table table-responsive">
          <Calendar />
        </div>
      </div>
    </div>
  );
}