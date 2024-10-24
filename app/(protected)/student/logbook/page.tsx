"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import CourseLogbook from "./course-logbook/page";
import StudentLogbook from "./student-logbook/page";

function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "course-logbook";

  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.replace("/student/logbook?tab=course-logbook");
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
              href="/student/dashboard?tab=analytics"
              onClick={(e) => {
                e.preventDefault();
                router.push("/student/logbook?tab=course-logbook");
              }}
              className={`tab-button ${tab === "course-logbook" ? "active" : ""}`}
              id="received-tab"
              data-bs-toggle="tab"
              data-bs-target="#received"
              role="tab"
              aria-controls="received"
              aria-selected={tab === "course-logbook"}
            >
              <span className="title">Course Logbook</span>
            </Link>
          </li>
            <li role="presentation">
              <Link
                href="/student/dashboard?tab=student-logbook"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/student/logbook?tab=student-logbook");
                }}
                className={`tab-button ${tab === "student-logbook" ? "active" : ""}`}
                id="given-tab"
                data-bs-toggle="tab"
                data-bs-target="#given"
                role="tab"
                aria-controls="given"
                aria-selected={tab === "student-logbook"}
              >
                <span className="title">Student Logbook</span>
              </Link>
            </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {tab === "course-logbook" && <CourseLogbook />}
        {tab === "student-logbook" && <StudentLogbook />}
      </Suspense>
    </div>
  );
}

export default function PageAnalytics() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
