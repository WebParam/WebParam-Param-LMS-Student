// "use client";

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
    <div className="container mt-5 pb-5">
      <div className="row">
        <div className="col-md-5 mb-3">
          <label className="form-label fw-bold underline-2">
            Question Title
          </label>
          <input type="text" className="form-control mt-3" />
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
          <button className="btn btn-secondary me-2 custom-button-4">
            Cancel
          </button>
          <button className="btn btn-success custom-button-4">
            Post Question
          </button>
        </div>
      </div>

      <hr className="custom-line-break-1" />
      <label className="form-label fw-bold underline-2">Q&A</label>

      <div className="mb-4">
        <p>
          How does the use of hooks improve the development process in React?
        </p>
        <p style={{ marginLeft: "20px" }}>
          <i className="bi bi-reply-fill"></i>
          Hooks allow for state and lifecycle management in functional
          components, making code easier to understand and maintain.
        </p>
        <div className="d-flex justify-content-between">
          <div>
            <a href="#" style={{ textDecoration: "underline" }}>
              <i className="bi bi-hand-thumbs-up"></i> Like
            </a>{" "}
            |{" "}
            <a href="/discussions" style={{ textDecoration: "underline" }}>
              <i className="bi bi-chat-dots"></i> Reply
            </a>
          </div>
          <div className="small">
            <span>John Smith</span> - <span>2024-05-18</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p>What are the benefits of using TypeScript with React?</p>
        <p style={{ marginLeft: "20px" }}>
          <i className="bi bi-reply-fill"></i>
          TypeScript provides type safety, making it easier to catch errors
          early and improving overall code quality.
        </p>
        <div className="d-flex justify-content-between">
          <div>
            <a href="#" style={{ textDecoration: "underline" }}>
              <i className="bi bi-hand-thumbs-up"></i> Like
            </a>{" "}
            |{" "}
            <a href="/discussions" style={{ textDecoration: "underline" }}>
              <i className="bi bi-chat-dots"></i> Reply
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
