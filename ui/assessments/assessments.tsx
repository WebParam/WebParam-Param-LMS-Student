"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/assessment/assessment.module.css";
import loaderStyles from "@/ui/loader-ui/loader.module.css";
import assessmentData from "@/data/assessment/assessment.json";
import { submitAssessment } from "@/actions/assessments/assessments-action";

type AssessmentQuestion = {
  question: string;
};

type AssessmentData = {
  quizData: AssessmentQuestion[];
};

// Cast the imported data to the correct type
const assessment: AssessmentData = assessmentData as AssessmentData;

const AssessmentComponent = () => {
  const [answers, setAnswers] = useState<string[]>(
    Array(assessment.quizData.length).fill("")
  );
  const [isInteracted, setIsInteracted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const savedState = JSON.parse(
      localStorage.getItem("assessmentState") || "{}"
    );
    if (savedState) {
      setAnswers(
        savedState.answers || Array(assessment.quizData.length).fill("")
      );
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isInteracted && timeRemaining !== null) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) =>
          prevTime !== null ? prevTime - 1 : null
        );
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isInteracted, timeRemaining]);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
    if (!isInteracted) {
      setIsInteracted(true);
      setTimeRemaining(3600); // Start the timer with 1 hour (3600 seconds)
    }
  };

  const handleSubmitAssessment = async () => {
    saveStateToLocalStorage();
    setIsInteracted(false);
    setLoading(true);
    const courseId = "65eebefa793e4ee1a7223a63";

    try {
      const responses = await Promise.all(
        answers.map((answer) => submitAssessment(answer, courseId))
      );
      console.log("Assessment Submitted:", responses);

      // Handle assessment completion
      console.log("All questions answered. Assessment completed.");
      // Clear local storage and reset answers
      localStorage.removeItem("assessmentState");
      setAnswers(Array(assessment.quizData.length).fill(""));
      setTimeRemaining(null); // Reset the timer

      // Redirect to /lesson
      window.location.href = "/lesson";
    } catch (error) {
      console.error("Error submitting assessment:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveStateToLocalStorage = () => {
    localStorage.setItem(
      "assessmentState",
      JSON.stringify({
        answers,
      })
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="rbt-lesson-rightsidebar overflow-hidden lesson-video">
      <div className="inner">
        <div className="content">
          <div className="quiz-form-wrapper">
            {assessment.quizData.map((item, index) => (
              <div
                key={index}
                id={`question-${index + 1}`}
                className="question"
              >
                <div className="quize-top-meta">
                  {index === 0 ? (
                    <>
                      <div className="quize-top-left">
                        <span>
                          Question No:{" "}
                          <strong>
                            {index + 1}/{assessment.quizData.length}
                          </strong>
                        </span>
                        <span>
                          Marks: <strong>5</strong>
                        </span>
                      </div>
                      <div className="quize-top-right">
                        <span>
                          Time remaining:{" "}
                          <strong>
                            {timeRemaining !== null
                              ? formatTime(timeRemaining)
                              : "No Limit"}
                          </strong>
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="quize-top-left">
                        <span>
                          Marks: <strong>5</strong>
                        </span>
                      </div>
                      <div className="quize-top-right">
                        <span>
                          Time remaining:{" "}
                          <strong>
                            {timeRemaining !== null
                              ? formatTime(timeRemaining)
                              : "No Limit"}
                          </strong>
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <hr />
                <div className="rbt-single-quiz">
                  <h4>
                    {index + 1}. {item.question}
                  </h4>
                  <div className="row g-3 mt--10">
                    <textarea
                      className={styles.textArea}
                      value={answers[index]}
                      onChange={(e) => handleAnswerChange(e, index)}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.buttonWrapper}>
              <button
                className="rbt-btn btn-gradient btn-sm"
                type="button"
                onClick={handleSubmitAssessment}
                disabled={
                  !isInteracted ||
                  loading ||
                  answers.some((answer) => answer === "")
                }
              >
                {loading ? (
                  <>
                    <span className={loaderStyles.loaderButton}></span>
                    Submit Assessment
                  </>
                ) : (
                  "Submit Assessment"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentComponent;
