"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import notesData from "@/data/sample/sample.json";
import styles from "@/styles/notes/notes.module.css";
import { format } from "date-fns";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Note {
  id: number;
  title: string;
  content: string;
  studentName: string;
  timestamp: string;
}

const Notes = () => {
  const [body, setBody] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  useEffect(() => {
    setNotes(notesData);
  }, []);

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

  const handlePostNote = () => {
    const newNote: Note = {
      id: notes.length + 1,
      title: "New Note",
      content: body,
      studentName: "Anonymous",
      timestamp: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
    setBody("");
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
          {/* <button
            className="bi bi-plus-lg btn btn-success custom-button-4"
            onClick={() => {
              const editor = document.querySelector(
                ".ql-editor"
              ) as HTMLElement;
              editor?.focus();
            }}
          >
            Add Note
          </button> */}
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
              {/* <div className="note-title fw-bold">{note.title}</div> */}
              <div className="mt-2">
                <p  className="videoPar" dangerouslySetInnerHTML={{ __html: displayContent }} />
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
                <p  className="videoPar">  <strong>By:</strong> {note.studentName}</p>
                </div>
                <div>
                <p  className="videoPar">     <strong>Posted on:</strong>{" "}
                  {format(new Date(note.timestamp), "PPpp")}</p>
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
