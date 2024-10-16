"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/notes/notes.module.css";
import { format } from "date-fns";
import { rCommentUrl,wCommentUrl } from "@/app/lib/endpoints";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Note {///whats this for
  id: number;
  title: string;
  content: string;
  studentName: string;
  timestamp: string;
}

interface NotesProps {
  topicId: string;
  elementId: string;
}

const Notes = ({ topicId, elementId }: NotesProps) => {
  const [body, setBody] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${rCommentUrl}/api/Notes/GetNotesBySudentAndElement/${topicId}/${elementId}`, {
          headers: {
            "Client-Key": process.env.NEXT_PUBLIC_CLIENT_KEY || "",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        } else {
          console.error("Failed to fetch notes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [topicId, elementId]);

  const handleChange = (value: string) => {
    setBody(value);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getDisplayContent = (
    text: string,
    isCollapsed: boolean,
    wordLimit = 100
  ) => {
    const words = text.split(" ");
    const isLong = words.length > wordLimit;
    const displayContent =
      isCollapsed && isLong
        ? words.slice(0, wordLimit).join(" ") + "..."
        : text;
    return { displayContent, isLong };
  };

  const handlePostNote = async () => {
    const newNote = {
      topicId,
      text: body,
      studentId: "yourStudentId", // Replace with actual student ID
      elementId,
      fullName: "Your Full Name", // Replace with actual full name
    };

    try {
      const response = await fetch(`${wCommentUrl}/api/v1/Notes/AddNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Client-Key": process.env.NEXT_PUBLIC_CLIENT_KEY || "",
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        const postedNote = await response.json();
        setNotes([...notes, postedNote]);
        setBody("");
      } else {
        console.error("Failed to post note:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting note:", error);
    }
  };

  return (
    <div className="container pb-5">
      <div className="row">
        <div className="col-md-5 mb-3">
          <h6 className="form-label fw-bold">Post a note</h6>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-5 mb-3">
          {/* Add Note button can be re-enabled if needed */}
        </div>
      </div>

      <div className="row">
        <div className="col-md-10 mt-4 mb-2">
          <ReactQuill
            theme="snow"
            value={body}
            onChange={handleChange}
            className="custom-quill-1"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-10 d-flex justify-content-end">
          <button
            className="btn btn-secondary me-2 custom-button-4"
            onClick={() => setBody("")}
          >
            Cancel
          </button>
          <button
            className="btn btn-success custom-button-4"
            onClick={handlePostNote}
          >
            Post Note
          </button>
        </div>
      </div>

      <hr className="custom-line-break-1" />

      <div className="row mt-3">
        {notes.map((note) => {
          const { displayContent, isLong } = getDisplayContent(
            note.content,
            isCollapsed
          );
          return (
            <div className={styles.mb3Custom} key={note.id}>
              <div className="mt-2">
                <p className="videoPar" dangerouslySetInnerHTML={{ __html: displayContent }} />
                {isLong && (
                  <a
                    onClick={toggleCollapse}
                    className="ms-2"
                    style={{ cursor: "pointer" }}
                  >
                    {isCollapsed ? "Read more" : "Show less"}
                  </a>
                )}
              </div>
              <div className="d-flex justify-content-between mt-2">
                <div>
                  <p className="videoPar"><strong>By:</strong> {note.studentName}</p>
                </div>
                <div>
                  <p className="videoPar"><strong>Posted on:</strong> {format(new Date(note.timestamp), "PPpp")}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;