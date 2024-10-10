"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  downloadStudentAssignment,
  getStudentMarkedAssignments,
} from "@/app/api/assignments/assignments";
import { IMarkedAssignment } from "@/interfaces/assignments/assignments";
import Cookies from "universal-cookie";
import NoAssignmentsCard from "./NoAssignmentsCard";

export default function ActiveAssignment() {
  const [assignments, setAssignments] = useState<IMarkedAssignment[]>([]);
  const searchParams = useSearchParams();

  const cookies = new Cookies();
  const user = cookies.get("loggedInUser");

  const fetchAssignments = async () => {
    try {
      const assignmentsData = await getStudentMarkedAssignments(user.data.id!);
      setAssignments(assignmentsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div>
      {assignments.length > 0 ? (
        assignments.map((assignment: IMarkedAssignment, index) => (
          <AssignmentCard key={index} assignment={assignment} />
        ))
      ) : (
        <NoAssignmentsCard />
      )}
    </div>
  );
}

type assignment = {
  assignment: IMarkedAssignment;
};

function AssignmentCard({ assignment }: assignment) {
  const cookies = new Cookies();
  const user = cookies.get("loggedInUser");
  const [loading, setLoading] = useState(false);
  const [isAssignmentDownloadedError, setIsAssignmentDownloadedError] = useState(false);

  const handleDownloadAssignment = async () => {
    setIsAssignmentDownloadedError(false);
    setLoading(true);
    try {
      const response = await downloadStudentAssignment(
        user.data.id,
        assignment.studentAssignment.id
      );
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${assignment.studentAssignment.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
          link.parentNode.removeChild(link);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setIsAssignmentDownloadedError(true);
      setLoading(false);
    }
  };

  return (
    <>

      {isAssignmentDownloadedError && (
        <div className="alert alert-danger text-center">
          Failed to download asssignment
        </div>
      )}
    
      <table
        className="rbt-table table table-borderless"
        style={{ minWidth: "10px" }}
      >
        <thead>
          <tr>
            <th>Assignment Name</th>
            <th>Due Date</th>
            <th>Submission Date</th>
            <th>Mark</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <span className="h6 mb--5">
                {assignment.studentAssignment.title}
              </span>
            </th>
            <td>
              <p className="b3">
                {new Date(
                  assignment.studentAssignment.dueDate
                ).toLocaleDateString()}
              </p>
            </td>
            <td>
              <p className="b3">
                {new Date(
                  assignment.studentAssignment.submissionDate
                ).toLocaleDateString()}
              </p>
            </td>
            <td>
              <p className="b3">{assignment.mark}</p>
            </td>
            <td>
              <div className="rbt-button-group justify-content-end">
                <a
                    style={{
                      cursor : "pointer"
                    }}
                                        onClick={handleDownloadAssignment}

                  className="rbt-btn btn-xs bg-primary-opacity radius-round"
                  title="Download"
                >
                  {loading ? (
                    <span
                      style={{
                        marginTop: "5px",
                      }}
                      className="text-primary spinner-border"
                      role="status"
                    />
                  ) : (
                    <>
                      <i
                        className="bi bi-download pl--0"
                      />{" "}
                      download
                    </>
                  )}
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
