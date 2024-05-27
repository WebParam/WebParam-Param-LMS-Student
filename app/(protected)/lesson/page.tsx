"use client";
import "plyr/dist/plyr.css";
import Plyr from "plyr";
import { useEffect } from "react";
import Link from "next/link";
import QuestionAndAnswers from "@/ui/lesson/question-answers/question-answer";
import Notes from "@/ui/lesson/notes/notes";

const LessonHomepage = () => {
  useEffect(() => {
    new Plyr(".rbtplayer", {
      muted: false,
      volume: 1,
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "fullscreen",
      ],
    });
  }, []);
  return (
    <>
      <div className="inner">
        <div className="plyr__video-embed rbtplayer">
          <iframe
            src="https://www.youtube.com/embed/qKzhrXqT6oE"
            allowFullScreen
            allow="autoplay"
          ></iframe>
        </div>
        <div className="rbt-card-body-2">
          <h6 className="bi bi-easel video-title">Video Title Here</h6>
          <div className="rbt-card-top-2">
            <div className="rbt-review">
              <div className="rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <span className="rating-count">(5 Reviews)</span>
            </div>
          </div>
        </div>
        <h5 className="bi bi-play course-title-2">Welcome to the Course</h5>
        <div className="content-2">
          <div className="advance-tab-button mb--30">
            <ul
              className="nav nav-tabs tab-button-style-2 justify-content-start"
              id="myTab-4"
              role="tablist"
            >
              <li role="presentation">
                <Link
                  href="#"
                  className="tab-button active"
                  id="overview-tab-4"
                  data-bs-toggle="tab"
                  data-bs-target="#overview-4"
                  role="tab"
                  aria-controls="overview-4"
                  aria-selected="true"
                >
                  <span className="title">Overview</span>
                </Link>
              </li>
              <li role="presentation">
                <Link
                  href="#"
                  className="tab-button"
                  id="transcript-tab-4"
                  data-bs-toggle="tab"
                  data-bs-target="#transcript-4"
                  role="tab"
                  aria-controls="transcript-4"
                  aria-selected="false"
                >
                  <span className="title">Transcript</span>
                </Link>
              </li>
              <li role="presentation">
                <Link
                  href="#"
                  className="tab-button"
                  id="q&a-tab-4"
                  data-bs-toggle="tab"
                  data-bs-target="#q&a-4"
                  role="tab"
                  aria-controls="q&a-4"
                  aria-selected="false"
                >
                  <span className="title">Q&A</span>
                </Link>
              </li>
              <li role="presentation">
                <Link
                  href="#"
                  className="tab-button"
                  id="notes-tab-4"
                  data-bs-toggle="tab"
                  data-bs-target="#notes-4"
                  role="tab"
                  aria-controls="notes-4"
                  aria-selected="false"
                >
                  <span className="title">Notes</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="tab-content">
          <div
            className="tab-pane fade active show"
            id="overview-4"
            role="tabpanel"
            aria-labelledby="overview-tab-4"
          >
            Over view of the course.
          </div>

          <div
            className="tab-pane fade"
            id="transcript-4"
            role="tabpanel"
            aria-labelledby="transcript-tab-4"
          >
            The Transcript section
          </div>

          <div
            className="tab-pane fade"
            id="q&a-4"
            role="tabpanel"
            aria-labelledby="q&a-tab-4"
          >
            <QuestionAndAnswers />
          </div>

          <div
            className="tab-pane fade"
            id="notes-4"
            role="tabpanel"
            aria-labelledby="notes-tab-4"
          >
            <Notes />
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonHomepage;
