import { useEffect, useState } from "react";
import {
  getStudentLogbooksByCourse,
  addStudentLogbook,
} from "@/actions/logbook-actions/logbook-action";
import { useCourseId } from "@/context/courseId-context/courseId-context";
import { IStudentLogbook } from "@/interfaces/logbook-interface/logbook-interface";
import Cookies from "universal-cookie";
import styles from "@/styles/logbook/logbook-login.module.css";
import { FaEye, FaPlus } from "react-icons/fa";

export default function StudentLogbook() {
  const [logbooks, setLogbooks] = useState<IStudentLogbook[]>([]);
  const { courseId } = useCourseId();
  const [file, setFile] = useState<File | null>(null);
  const cookies = new Cookies();
  const studentId = cookies.get("userID");
  const [isMobile, setIsMobile] = useState(false);

  const fetchLogbooks = async () => {
    if (courseId) {
      const response = await getStudentLogbooksByCourse(studentId, courseId);
      if (response.data) {
        setLogbooks(response.data);
      }
    }
  };

  useEffect(() => {
    fetchLogbooks();
  }, [courseId, studentId]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      await handleSubmit(selectedFile);
    }
  };

  const handleSubmit = async (selectedFile: File) => {
    if (selectedFile && courseId) {
      const formData = new FormData();
      formData.append("FormFile", selectedFile);
      formData.append("CourseId", courseId);
      formData.append("CourseLogbookId", courseId);
      formData.append("StudentId", studentId);

      const response = await addStudentLogbook(formData);
      if (response.data) {
        fetchLogbooks();
      }
    }
  };

  const openBlobPreview = (url: string) => {
    window.open(url, "_blank");
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="student-logbook">
      <div className={styles.buttonContainer}>
        <input
          type="file"
          className="form-control"
          id="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          required
        />
        <label htmlFor="file" className="rbt-btn btn-gradient btn-md" style={{
          backgroundColor: `#25355c`,
          backgroundImage: "none",
          color: `white`,
          border: `1px solid #25355c`,
          cursor: "pointer",
          display: "inline-block",
          padding: "10px 20px",
          textAlign: "center",
          lineHeight: "1.5",
        }}>
          {isMobile ? (
            <>
              <FaPlus /> Add
            </>
          ) : (
            <>
              <FaPlus /> Add Entry
            </>
          )}
        </label>
      </div>

      <div className="logbook-entries" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {logbooks.length > 0 ? (
          logbooks.map((logbook, index) => (
            <div key={index} className="card" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
              <div className="card-body" style={{ padding: '20px' }}>
                <h5 className="card-title" style={{ marginBottom: '15px', color: '#25355c' }}>Student Logbook Entry</h5>
                <p className="card-text" style={{ marginBottom: '15px' }}>
                  <strong>Date Updated:</strong> {logbook.dateUpdated
                    ? formatDate(logbook.dateUpdated)
                    : "N/A"}
                </p>
                <button
                  onClick={() => openBlobPreview(logbook.logBookFileUrl)}
                  className="btn btn-primary"
                  style={{ 
                    backgroundColor: '#25355c',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <FaEye /> View File
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <p style={{ fontSize: '18px', color: '#6c757d' }}>No logbook entries found. Add your first entry using the button above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
