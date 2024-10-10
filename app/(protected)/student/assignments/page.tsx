"use client";
import CompletedAssignment from "@/ui/assignments/completed";
import "./assignments.scss";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ActiveAssignment from "@/ui/assignments/active";
import UpcomingAssignment from "@/ui/assignments/upcoming";
import { useEffect } from "react";
import { Suspense } from "react";
import WorkBooks from "./(components)/WorkBooks";
import LogBooks from "./(components)/LogBook";
import ModuleAssignments from "./module-assignments/page";

function Assignments() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const router = useRouter();
  const moduleId = searchParams.get("moduleId")

  useEffect(() => {
    if (!tab) {
      router.push("/student/assignments?tab=all");
    }
  }, [tab, router]);

  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">
        <div className="section-title">
          <h4
                 style={{ cursor: "pointer" }}
                  onClick={() =>
                    router.replace("/student/assignments?tab=all")
                  }
          className="rbt-title-style-3">Assignments</h4>
        </div>
        {tab !== "all" && (
          <div className="rbt-dashboard-filter-wrapper">
            <div className="col-lg-10 offset-lg-1">
              <ul
                className="nav nav-tabs tab-button-style-2 justify-content-start nav-assignments"
                id="myTab-4"
                role="tablist"
              >
                <li
                  role="presentation"
                  onClick={() =>
                    router.replace(`/student/assignments?tab=upcoming&moduleId=${moduleId}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <a
                    className={`tab-button ${
                      tab === "upcoming" ? "active" : ""
                    }`}
                    id="home-tab-4"
                    role="tab"
                    aria-selected={tab === "upcoming"}
                  >
                    <span className="title">Upcoming</span>
                  </a>
                </li>
                <li
                  role="presentation"
                  onClick={() => router.replace(`/student/assignments?tab=active&moduleId=${moduleId}`)}
                  style={{ cursor: "pointer" }}
                >
                  <a
                    className={`tab-button ${tab === "active" ? "active" : ""}`}
                    id="profile-tab-4"
                    role="tab"
                    aria-selected={tab === "active"}
                  >
                    <span className="title">Active</span>
                  </a>
                </li>
                <li
                  role="presentation"
                  onClick={() =>
                    router.replace(`/student/assignments?tab=completed&moduleId=${moduleId}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <a
                    className={`tab-button ${
                      tab === "completed" ? "active" : ""
                    }`}
                    id="contact-tab-4"
                    role="tab"
                    aria-selected={tab === "completed"}
                  >
                    <span className="title">Completed</span>
                  </a>
                </li>
                <li
                  role="presentation"
             
                  style={{ cursor: "not-allowed" }}
                >
                  <a
                    className={`tab-button ${
                      tab === "workbooks" ? "active" : ""
                    }`}
                    id="workbooks-tab-4"
                    role="tab"
                    aria-selected={tab === "workbooks"}
                  >
                    <span className="title">Workbooks</span>
                  </a>
                </li>
                <li
                  role="presentation"
             
                  style={{ cursor: "not-allowed" }}
                >
                  <a
                    className={`tab-button ${
                      tab === "logbooks" ? "active" : ""
                    }`}
                    id="logbooks-tab-4"
                    role="tab"
                    aria-selected={tab === "logbooks"}
                  >
                    <span className="title">Logbooks</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
        <hr className="mt--30" />
        <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--30">
          {tab === "completed" && <CompletedAssignment />}
          {tab === "active" && <ActiveAssignment />}
          {tab === "upcoming" && <UpcomingAssignment />}
          {tab === "workbooks" && <WorkBooks />}
          {tab === "logbooks" && <LogBooks />}
          {tab === "all" && <ModuleAssignments />}
        </div>
      </div>
    </div>
  );
}

export default function AssignmentsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Assignments />
    </Suspense>
  );
}
