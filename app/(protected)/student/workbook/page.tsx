"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import CourseWorkbook from "./active-workbook/page";
import StudentWorkbook from "./completed-workbook/page";
import ActiveAssessment from "@/ui/assessments/marked-assessments/active";
import CompletedAssessment from "@/ui/assessments/marked-assessments/completed";
import { AssessmentProvider } from "@/ui/assessments/(context)/AssessmentContext";
import ActiveWorkbook from "./active-workbook/page";
import CompletedWorkbookPage from "./completed-workbook/page";

function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "active-workbook";

  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.replace("/student/workbook?tab=active-workbook");
    }
  }, [searchParams, router]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="content" data-aos="fade-down">
      <div className="section-title">
        <ul
          className="nav nav-tabs tab-button-style-2 justify-content-start"
          id="reviewTab-4"
          role="tablist"
        >
          <li role="presentation">
            <Link
              href="/student/workbook?tab=course-workbook"
              onClick={(e) => {
                e.preventDefault();
                router.push("/student/workbook?tab=active-workbook");
              }}
              className={`tab-button ${tab === "active-workbook" ? "active" : ""}`}
              id="received-tab"
              data-bs-toggle="tab"
              data-bs-target="#received"
              role="tab"
              aria-controls="received"
              aria-selected={tab === "active-workbook"}
            >
              <span className="title">Active Workbook</span>
            </Link>
          </li>
            <li role="presentation">
              <Link
                href="/student/workbook?tab=completed-workbook"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/student/workbook?tab=completed-workbook");
                }}
                className={`tab-button ${tab === "completed-workbook" ? "active" : ""}`}
                id="given-tab"
                data-bs-toggle="tab"
                data-bs-target="#given"
                role="tab"
                aria-controls="given"
                aria-selected={tab === "completed-workbook"}
              >
                <span className="title">Completed Workbook</span>
              </Link>
            </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {tab === "active-workbook" && <ActiveWorkbook />}
        {tab === "completed-workbook" && <CompletedWorkbookPage />}
      </Suspense>
    </div>
  );
}

export default function Workbook() {
  return (

    <Suspense fallback={<div>Loading...</div>}>
        <AssessmentProvider>
          <PageContent />
        </AssessmentProvider>
    </Suspense>
  );
}
