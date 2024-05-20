"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const StudentDiscussions = () => {
  const [body, setBody] = useState("");

  const handleChange = (value: any) => {
    console.log("handle change: ", value);
    setBody(value);
  };

  return (
    <div className="container mt-5 pb-5">
      <h4 className="form-label fw-bold underline-2">
        <i className="bi bi-chat-right custom-icon-1 chat-icon-1"></i>
        <i className="bi bi-people custom-icon-1 people-icon-1"></i>
        Q&A
      </h4>
      <hr className="custom-line-break-1" />

      <div className="mb-4">
        <p>
          How does the use of hooks improve the development process in React?
        </p>
        <p style={{ marginLeft: "20px" }}>
          <i className="bi bi-reply-fill"></i>
          Hooks allow for state and lifecycle management in functional
          components.
        </p>
        <div className="small">
          <span>John Smith</span> - <span>2024-05-18</span>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <div>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-hand-thumbs-up"></i> Like
            </a>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-chat-dots"></i> Reply
            </a>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-plus"></i> Follow this post
            </a>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-flag"></i> Report
            </a>
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
            <button className="btn btn-secondary me-2">Cancel</button>
            <button className="btn btn-success">Reply</button>
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

        <div className="small">
          <span>Sam Clock</span> - <span>2024-05-17</span>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-hand-thumbs-up"></i> Like
            </a>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-chat-dots"></i> Reply
            </a>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-plus"></i> Follow this post
            </a>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-flag"></i> Report
            </a>
          </div>
        </div>
      </div>

      <hr className="custom-line-break-1" />

      <div className="mb-4">
        <p>
          How does the use of hooks improve the development process in React?
        </p>
        <p style={{ marginLeft: "20px" }}>
          {" "}
          <i className="bi bi-reply-fill"></i>
          Hooks allow for state and lifecycle management in functional
          components.
        </p>
        <div className="small">
          <span>John Smith</span> - <span>2024-05-18</span>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <div>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-hand-thumbs-up"></i> Like
            </a>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-chat-dots"></i> Reply
            </a>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-plus"></i> Follow this post
            </a>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-flag"></i> Report
            </a>
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

        <div className="small">
          <span>Sam Clock</span> - <span>2024-05-17</span>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-hand-thumbs-up"></i> Like
            </a>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-chat-dots"></i> Reply
            </a>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-plus"></i> Follow this post
            </a>
            <a
              href="#"
              className="ms-3"
              style={{ textDecoration: "underline" }}
            >
              <i className="bi bi-flag"></i> Report
            </a>
          </div>
        </div>
        <hr className="mt-4" />
      </div>
      <div className="pagination-container-1">
        <div className="rbt-card-bottom">
          <button className="rbt-btn btn-sm w-100 text-center bn-success">
            <span className="feather-arrow-left"></span>
            <span>Previous</span>
          </button>
        </div>

        <div className="rbt-card-bottom">
          <button className="rbt-btn btn-sm w-100 text-center">
            <span>Next</span>
            <span className="feather-arrow-right"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDiscussions;
