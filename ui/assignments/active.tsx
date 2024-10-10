"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getAssignments,
  getStudentUnmarkedAssignments,
  uploadAssignment,
} from "@/app/api/assignments/assignments";
import {
  IAssignment,
  ISubmittedAssignment,
} from "@/interfaces/assignments/assignments";
import Cookies from "universal-cookie";
import NoAssignmentsCard from "./NoAssignmentsCard";

export default function ActiveAssignment() {
  const [assignments, setAssignments] = useState<IAssignment[]>([]);
  const searchParams = useSearchParams();
  const moduleId = searchParams.get("moduleId");

  const fetchAssignments = async () => {
    try {
      const assignmentsData = await getAssignments(moduleId!);
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
        assignments.map((assignment: IAssignment, index) => (
          <AssignmentCard key={index} assignment={assignment} />
        ))
      ) : (
        <NoAssignmentsCard />
      )}
    </div>
  );
}

type assignment = {
  assignment: IAssignment;
};

function AssignmentCard({ assignment }: assignment) {
  const cookies = new Cookies();
  const user = cookies.get("loggedInUser");
  const userId = user.data.id;
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [assignmentSubmitError, setAssignmentSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const moduleId = searchParams.get("moduleId");
  const pathName = usePathname();
  const refreshId = searchParams.get("refreshId")!;
  const [studentSubmittedAssignments, setStudentSubmittedAssignments] =
    useState<ISubmittedAssignment[]>([]);

  const handleAddAssignment = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result;
          if (content) {
            const formData = new FormData();
            formData.append("AssignmentId", assignment.id);
            formData.append("Title", assignment.title);
            formData.append("Description", assignment.description);
            formData.append("DueDate", assignment.scheduledDate);
            formData.append("UserId", userId);
            formData.append("FacilitatorId", "");
            formData.append("file", file);
            saveAssignment(formData);
          }
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };

  const saveAssignment = async (formData: FormData) => {
    setAssignmentSubmitted(false);
    setAssignmentSubmitError(false);
    setLoading(false);
    try {
      setLoading(true);
      const submitAssignment = await uploadAssignment(formData);
      setAssignmentSubmitted(true);
      const date = new Date();
      router.replace(
        `${pathName}?tab=active&moduleId=${moduleId}&refreshId=${date}`
      );
      setLoading(false);
      setTimeout(() => {
        setAssignmentSubmitted(false);
      }, 5000);
    } catch (error) {
      setLoading(false);
      console.error(error);
      setAssignmentSubmitError(true);
      setTimeout(() => {
        setAssignmentSubmitError(false);
      }, 5000);
    }
  };

  const getSubmittedAssignments = async () => {
    try {
      const assignments = await getStudentUnmarkedAssignments(
        userId,
        moduleId!
      );
      setStudentSubmittedAssignments(assignments);
      console.log("Submitted Assignments", assignments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSubmittedAssignments();
  }, []);

  return (
    <>
      {assignmentSubmitted && (
        <div className="alert alert-success text-center">
          Assignment submitted successfully
        </div>
      )}
      {assignmentSubmitError && (
        <div className="alert alert-danger text-center">
          Failed to submit asssignment
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
            <th>Submission</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <span className="h6 mb--5">{assignment.title}</span>
            </th>
            <td>
              <p className="b3">
                {new Date(assignment.scheduledDate).toLocaleDateString()}
              </p>
            </td>
            <td>
              <p className="b3">{refreshId ? "Submitted" : "N/A"}</p>
            </td>
            <td>
              <div className="rbt-button-group justify-content-end">
                <a
                style={{
                  cursor : "pointer"
                }}
                  onClick={handleAddAssignment}
                  className="rbt-btn btn-xs bg-primary-opacity radius-round"
                  title="Upload"
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
                      <i className="bi bi-upload pl--0" /> Upload
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
