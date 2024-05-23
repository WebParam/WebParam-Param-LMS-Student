"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import quizData from "@/data/quiz/quiz.json";
import styles from "@/styles/quiz/quiz.module.css";
import modelStyles from "@/styles/modal/modal.module.css";

const LessonQuiz = () => {
  const [next, setNext] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleNext = () => {
    if (next < quizData.length - 1) {
      setNext(next + 1);
    }
  };

  const handlePrevious = () => {
    if (next > 0) {
      setNext(next - 1);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <div className="inner">
        <div className="content">
          <form id="quiz-form" className="quiz-form-wrapper">
            {quizData.map((item, index) => (
              <div
                key={index}
                id={`question-${index + 1}`}
                className={`question ${index === next ? "" : "d-none"}`}
              >
                <div className="quize-top-meta">
                  <div className="quize-top-left">
                    <span>
                      Questions No:{" "}
                      <strong>
                        {index + 1}/{quizData.length}
                      </strong>
                    </span>
                    <span>
                      Attempts Allowed: <strong>1</strong>
                    </span>
                  </div>
                  <div className="quize-top-right">
                    <span>
                      Time remaining: <strong>No Limit</strong>
                    </span>
                  </div>
                </div>
                <hr />
                <div className="rbt-single-quiz">
                  <h4>
                    {index + 1}. {item.question}
                  </h4>
                  <div className="row g-3 mt--10">
                    {item.options.map((option, optIndex) => (
                      <div className="col-lg-6" key={optIndex}>
                        <p className="rbt-checkbox-wrapper mb--5">
                          <input
                            id={`rbt-checkbox-${index + 1}-${optIndex}`}
                            name={`rbt-checkbox-${index + 1}`}
                            type="checkbox"
                            value={option}
                          />
                          <label
                            htmlFor={`rbt-checkbox-${index + 1}-${optIndex}`}
                          >
                            {option}
                          </label>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.buttonWrapper}>
              <button
                className="rbt-btn bg-primary-opacity btn-sm"
                id="prev-btn"
                type="button"
                disabled={next === 0}
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                className={`rbt-btn bg-primary-opacity btn-sm ms-2 ${
                  next === quizData.length - 1 ? "d-none" : ""
                }`}
                id="next-btn"
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
              <Link
                className={`rbt-btn btn-gradient btn-sm ms-2 ${
                  next !== quizData.length - 1 ? "d-none" : ""
                }`}
                href="#"
                id="submit-btn"
                onClick={handleSubmit}
              >
                Submit
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Modal
        classNames={{ modalContainer: modelStyles.mainModalclassNames }}
        open={showModal}
        onClose={() => setShowModal(false)}
        center
      >
        <div className={modelStyles.modalContent}>
          <i
            className={`bi bi-arrow-down-circle ${modelStyles.customIcon}`}
          ></i>
          <h3 className={modelStyles.modalTitle}>Confirm Submission</h3>

          <div className={styles.buttonWrapper}>
            <button className="rbt-btn bg-primary-opacity btn-sm ms-2">
              Cancel
            </button>
            <button className="rbt-btn bg-sucess-opacity btn-sm ms-2">
              Yes, I'm sure
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LessonQuiz;
