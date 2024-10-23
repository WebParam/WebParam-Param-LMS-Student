"use client";

import { useEffect, useState } from "react";
import { getCourseLogbooksByCourse } from "@/actions/logbook-actions/logbook-action";
import { useCourseId } from "@/context/courseId-context/courseId-context";
import { ICourseLogbook } from "@/interfaces/logbook-interface/logbook-interface";
import { FaEye } from "react-icons/fa";

export default function CourseLogbook() {
  const [logbooks, setLogbooks] = useState<ICourseLogbook[]>([]);
  const { courseId } = useCourseId();

  useEffect(() => {
    const fetchLogbooks = async () => {
      if (courseId) {
        const response = await getCourseLogbooksByCourse(courseId);
        if (response.data) {
          setLogbooks(
            Array.isArray(response.data) ? response.data : [response.data]
          );
        }
      }
    };
    fetchLogbooks();
  }, [courseId]);

  const openBlobPreview = (url: string) => {
    window.open(url, "_blank");
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div>
      {logbooks.length === 0 ? (
        <div className="no-logbooks-message" style={{ textAlign: 'center', marginTop: '50px' }}>
          <h3>No logbooks available</h3>
          <p>There are currently no logbooks for this course.</p>
        </div>
      ) : (
        <div
          className="logbook-entries"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {logbooks.map((logbook, index) => (
            <div
              key={index}
              className="card"
              style={{
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div className="card-body" style={{ padding: "20px" }}>
                <h5
                  className="card-title"
                  style={{ marginBottom: "15px", color: "#25355c" }}
                >
                  Course Logbook Entry
                </h5>
                <p className="card-text" style={{ marginBottom: "15px" }}>
                  <strong>Date Updated:</strong>{" "}
                  {logbook.dateUpdated
                    ? formatDate(logbook.dateUpdated)
                    : "N/A"}
                </p>
                <button
                  onClick={() => openBlobPreview(logbook.logBookFileUrl)}
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#25355c",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  <FaEye /> View File
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
