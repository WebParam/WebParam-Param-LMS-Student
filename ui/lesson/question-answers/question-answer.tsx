"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const QuestionAndAnswers = () => {
  const [body, setBody] = useState("");

  const handleChange = (value: any) => {
    console.log("handle change: ", value);
    setBody(value);
  };

  return (
    <div className="container pb-5">
      <div className="row">
        <div className="col-md-5 mb-3">
          <h6 className="form-label fw-bold ">
           Ask a question
          </h6>
          <label  className="b4  mt-3"><small><h6>Title</h6></small></label>
          <input type="text" style={{height: "40px"}} className="form-control" />
        </div>
      </div>
      <div className="row">
      <label  className="b4  mt-3"><small><h6>Question</h6></small></label>
        <div className="col-md-10  mb-2">
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
          {/* <button className="btn btn-secondary me-2 custom-button-4">
            Cancel
          </button> */}
          <button style={{width:"40%"}} className="btn btn-success custom-button-4">
            Post
          </button>
        </div>
      </div>

      <hr className="custom-line-break-1" />
      <label className="form-label fw-bold">Q&A</label>

      <div className="mb-4">
      <p className="b4">
          How does the use of hooks improve the development process in React?
        </p>
        <p className="b4" style={{ marginLeft: "20px" }}>
          <i className="bi bi-reply-fill"></i>
          Hooks allow for state and lifecycle management in functional
          components, making code easier to understand and maintain.
        </p>
        <div style={{ fontSize:"12px" }} className="d-flex justify-content-between">
          <div>
            <a href="#" >
              <i className="bi bi-hand-thumbs-up"></i> Like
            </a>{" "}
            |{" "}
            <a href="#" style={{ }}>
              <i className="bi bi-chat-dots"></i> Reply
            </a>{" "}
            <a
              href="/discussions"
              className="ms-3"
              style={{  }}
            >
              <i className="bi bi-flag"></i> more
            </a>
          </div>
          <div className="small">
            <span>John Smith</span> - <span>2024-05-18</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
      <p className="b4">What are the benefits of using TypeScript with React?</p>
      <p className="b4" style={{ marginLeft: "20px" }}>
          <i className="bi bi-reply-fill"></i>
          TypeScript provides type safety, making it easier to catch errors
          early and improving overall code quality.
        </p>
        <div  style={{ fontSize:"12px" }} className="d-flex justify-content-between">
          <div>
            <a href="#" style={{ textDecoration: "underline" }}>
              <i className="bi bi-hand-thumbs-up"></i> Like
            </a>{" "}
            |{" "}
            <a href="#" style={{ textDecoration: "underline" }}>
              <i className="bi bi-chat-dots"></i> Reply
            </a>{" "}
            <a
              href="/discussions"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-flag"></i> more
            </a>
          </div>
          <div className="small">
            <span>Sam Clock</span> - <span>2024-05-17</span>
          </div>
        </div>
        <hr className="mt-4" />
      </div>
    </div>
  );
};

export default QuestionAndAnswers;
