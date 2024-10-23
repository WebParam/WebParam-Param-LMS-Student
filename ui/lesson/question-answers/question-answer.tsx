"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { rCommentUrl, wCommentUrl, readUserData } from "@/app/lib/endpoints";
import Cookies from "universal-cookie";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface QnAProps {
  elementId?: string; // Make elementId optional
}

interface Comment {
  id: string;
  message: string;
  creatingUser: string;
  createdDate: string;
  title: string;
  creatingUserName: string;
}

interface UserInfo {
  firstName: string;
  surname: string;
}

const QuestionAndAnswers = ({ elementId = "defaultElementId" }: QnAProps) => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fullName, setFullName] = useState<string>("");

  const cookies = new Cookies();
  const userID = cookies.get('userID');

  const clientKey = process.env.NEXT_PUBLIC_CLIENTKEY;

  useEffect(() => {
    console.log("UseEffect Fired:");
    console.log("Fetching comments with userID:", userID, "and elementId:", elementId);
  
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
          const data: UserInfo = result.data;
          
          setFullName(`${data.firstName || ''} ${data.surname || ''}`.trim());
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

    const fetchComments = async () => {
      if (!clientKey) {
        console.error("Client-Key is not defined");
        return;
      }
    
      const url = `${rCommentUrl}/api/v1/Comments/GetCommentsByReference?referenceId=${elementId}`;
    
      try {
        const response = await fetch(url, {
          headers: {
            "Client-Key": clientKey,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
    
        if (response.ok) {
          const result = await response.json();
          console.log("Fetched comments:", result);
          const commentsData = result.map((item: any) => item.data);
          setComments(commentsData);
        } else {
          console.error("Failed to fetch comments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [elementId, userID]);

  const handleChange = (value: string) => {
    setBody(value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handlePostComment = async () => {
    if (!clientKey) {
      console.error("Client-Key is not defined");
      return;
    }
  
    const strippedBody = body.replace(/<\/?[^>]+(>|$)/g, "");
  
    const newComment = {
      message: strippedBody,
      creatingUser: userID,
      referenceId: elementId,
      commentType: 0,
      state: 0,
      title: title,
      creatingUserName: fullName
    };
  
    try {
      const response = await fetch(`${wCommentUrl}/api/v1/Comments/AddComment`, {
        method: "POST",
        headers: {
          "Client-Key": clientKey,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });
  
      if (response.ok) {
        const postedComment = await response.json();
        setComments([...comments, postedComment]);
        setBody("");
        setTitle("");
      } else {
        console.error("Failed to post comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="container pb-5">
      <div className="row">
        <div className="col-md-5 mb-3">
          <h6 className="form-label fw-bold">Ask a question</h6>
          <label className="b4 mt-3">
            <small>
              <h6>Title</h6>
            </small>
          </label>
          <input
            type="text"
            style={{ height: "40px" }}
            className="form-control"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
      </div>
      <div className="row">
        <label className="b4 mt-3">
          <small>
            <h6>Question</h6>
          </small>
        </label>
        <div className="col-md-10 mb-2">
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
            style={{ width: "40%" }}
            className="btn btn-success custom-button-4"
            onClick={handlePostComment}
          >
            Post
          </button>
        </div>
      </div>

      <hr className="custom-line-break-1" />
      <label className="form-label fw-bold">Q&A</label>

      {comments.map((comment) => (
        <div className="mb-4" key={comment.id}>
          <p className="b4">{comment.title}</p>
          <p className="b4" style={{ marginLeft: "20px" }}>
            <i className="bi bi-reply-fill"></i> {comment.message}
          </p>
          <div style={{ fontSize: "12px" }} className="d-flex justify-content-between">
            <div>
              <a href="#">
                <i className="bi bi-hand-thumbs-up"></i> Like
              </a>{" "}
              |{" "}
              <a href="#">
                <i className="bi bi-chat-dots"></i> Reply
              </a>{" "}
              <a href="/discussions" className="ms-3">
                <i className="bi bi-flag"></i> more
              </a>
            </div>
            <div className="small">
              <span>{comment.creatingUserName}</span> - <span>{comment.createdDate}</span>
            </div>
          </div>
          <hr className="mt-4" />
        </div>
      ))}
    </div>
  );
};

export default QuestionAndAnswers;