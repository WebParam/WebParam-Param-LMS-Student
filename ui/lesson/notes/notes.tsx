"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/notes/notes.module.css";
import { rCommentUrl, wCommentUrl, readUserData } from "@/app/lib/endpoints";
import Image from "next/image";
import Cookies from "universal-cookie";
import moment from "moment";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface NoteData {
  id: string;
  topicId: string;
  text: string;
  studentId: string;
  elementId: string;
  dateCreated: string;
  dateUpdated: string | null;
  fullName: string;
}

interface NoteResponse {
  data: NoteData;
  error: boolean;
  message: string | null;
}

interface UserInfo {
  firstName: string;
  surname: string;
}

interface NotesProps {
  topicId?: string;
  elementId?: string;
}

const Notes = ({ topicId = "defaultTopicId", elementId = "defaultElementId" }: NotesProps) => {
  const [body, setBody] = useState<string>("");
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const cookies = new Cookies();
  const userID = cookies.get('userID');
  const clientKey = process.env.NEXT_PUBLIC_CLIENTKEY;

  useEffect(() => {
    const fetchStudentInfo = async (userId: string) => {
      if (!clientKey) {
        console.error("Client-Key is not defined");
        return;
      }
  
      try {
        const response = await fetch(`${readUserData}/api/v1/Student/GetStudentInformation/${userId}`, {
          headers: new Headers({
            "Client-Key": clientKey,
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
  
        if (response.ok) {
          const result = await response.json();
          const data = result.data;
          
          setFullName(`${data.firstName || ''} ${data.surname || ''}`.trim());
          console.log("data:", data)
          setProfileImage(data?.profilePicture);
          setUserEmail(data?.email);
        } else {
          console.error("Failed to fetch student information:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching student information:", error);
      }
    };
  
    if (userID) {
      fetchStudentInfo(userID);
    }
  
    const fetchNotes = async () => {
      if (!clientKey) {
        console.error("Client-Key is not defined");
        return;
      }
  
      try {
        const response = await fetch(`${rCommentUrl}/api/Notes/GetNotesByElement/${elementId}`, {
          headers: new Headers({
            "Client-Key": clientKey,
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
  
        if (response.ok) {
          const result = await response.json();
          const notesData: NoteData[] = result.data;
          setNotes(notesData);
          console.log("Notes Data Thats fetched :", notesData)
        } else {
          console.error("Failed to fetch notes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
  
    fetchNotes();
  }, [topicId, elementId, userID]);


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getDisplayContent = (
    text: string = "",
    isCollapsed: boolean,
    wordLimit = 100
  ) => {
    const plainText = text.replace(/<[^>]+>/g, '');
    const words = plainText.split(" ");
    const isLong = words.length > wordLimit;
    const displayContent =
      isCollapsed && isLong
        ? words.slice(0, wordLimit).join(" ") + "..."
        : plainText;
    console.log("Display content:", displayContent);
    return { displayContent, isLong };
  };

  const handlePostNote = async () => {
    if (!clientKey) {
      console.error("Client-Key is not defined");
      return;
    }

    setLoading(true);

    const plainText = body.replace(/<[^>]+>/g, '');

    const newNote = {
      topicId,
      text: plainText,
      studentId: userID,
      elementId,
      fullName
    };

    try {
      const response = await fetch(`${wCommentUrl}/api/v1/Notes/AddNote`, {
        method: "POST",
        headers: new Headers({
          "Client-Key": clientKey,
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        setLoading(false);
        const postedNote = await response.json();
        setNotes([...notes, postedNote.data]);
        setBody("");
      } else {
        setLoading(false);
        console.error("Failed to post note:", response.statusText);
      }
    } catch (error) {
      setLoading(false);
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
      </div>

      <div className="row">
        <div className="col-md-10 mt-4 mb-2 w-100">
          {/* <ReactQuill
            theme="snow"
            value={body}
            onChange={handleChange}
            className="custom-quill-1"
          /> */}
          <textarea 
          placeholder="Write your note here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{width:'100%', height:'50px', fontSize:'14px', border:'none', borderBottom:'2px solid #000', boxShadow:'none', borderRadius:'0'}}></textarea>
        </div>
      </div>

      <div className="row mt-3 d-flex justify-content-end w-100">
        <div className="col-md-10 d-flex justify-content-end">
          {body && (
          <button
            className="btn btn-secondary me-2 custom-button-4"
            style={{height:'40px', fontSize:'14px'}}
            onClick={() => setBody("")}
          >
              Clear
            </button>
          )}
          <button
            className="btn btn-success custom-button-4"
            style={{height:'40px', fontSize:'14px'}}
            onClick={handlePostNote}
          >
            {loading ? <div className="spinner-grow" role="status"/> : "Post Note"}
          </button>
        </div>
      </div>

      <hr className="custom-line-break-1" />

      <div className="row mt-3">
        {notes.sort((a, b) => moment(b.dateCreated).diff(moment(a.dateCreated))).map((note) => {
          const { displayContent, isLong } = getDisplayContent(
            note.text,
            isCollapsed
          );

          return (
            <div className={styles.mb3Custom} key={note.id}>
              <div className="mt-2">
                <p className="videoPar">{displayContent}</p>
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
              <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    {profileImage ? <Image
                      className="avatar avatar-sm avatar-circle"
                      src={profileImage}
                      alt="Image Description"
                      width={45}
                      height={45}
                    />:<span className="avatar avatar-sm avatar-danger avatar-circle" style={{backgroundColor:'rgb(36, 52, 92)',padding:'10px',borderRadius:'50%', color:'#fff', height:'45px', width:'45px', fontSize:'12px'}}>
                    <span className="avatar-initials">{note?.fullName?.split(" ").map(name => name[0]).join("")||userEmail.slice(0,2).toUpperCase()}</span>
                  </span>}
                  
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <a className="d-inline-block link-dark" href="#">
                      <h6 className="text-hover-primary mb-0">
                        {note.fullName||userEmail}
                      </h6>
                    </a>
                   
                  </div>
                </div>

                <div>
                  <p className="videoPar">
                    {moment(note.dateCreated).fromNow()}
                  </p>
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