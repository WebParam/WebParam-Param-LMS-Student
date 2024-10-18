"use client";

import { useState, useEffect, useCallback } from "react";
import quizData from "@/data/quiz/quiz-callcenter.json";
import { accountingQuiz } from "@/data/quiz/accounting";
import styles from "@/styles/quiz/quiz.module.css";
import { useRouter } from "next/navigation";
import "./quiz.scss";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

const LessonQuiz = ({ setVideoEnded, handleNext }: any) => {
  const [next, setNext] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(600 / 60);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    Array(quizData.length).fill(false)
  );
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(quizData.length).fill(null)
  );
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion[]>([]);
  const router = useRouter();

  useEffect(() => {
    initializeQuiz();
  }, []);

  useEffect(() => {
    setSelectedAnswer(selectedAnswers[next]);
  }, [next, selectedAnswers]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (
      timeRemaining > 0 &&
      selectedAnswers.some((answer) => answer !== null)
    ) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 60000); // Count down by one minute
    } else if (timeRemaining === 0) {
      handleNext(); // Handle end of quiz
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeRemaining, selectedAnswers]);

  const initializeQuiz = () => {
    const shuffledQuestions = accountingQuiz.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, 10);
    setCurrentQuiz(selectedQuestions);

    setNext(0);
    setScore(0);
    setAnsweredQuestions(Array(selectedQuestions.length).fill(false));
    setSelectedAnswers(Array(selectedQuestions.length).fill(null));
    setSelectedAnswer(null);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!answeredQuestions[next]) {
      const selected = event.target.value;
      setSelectedAnswer(selected);
      setSelectedAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[next] = selected;
        return newAnswers;
      });

      const correctAnswer = currentQuiz[next].answer;
      if (selected === correctAnswer) {
        setScore(score + 1);
      }

      setAnsweredQuestions((prev) => {
        const newAnswered = [...prev];
        newAnswered[next] = true;
        return newAnswered;
      });

      setTimeout(() => {
        if (next + 1 < currentQuiz.length) {
          setNext(next + 1);
        } else {
          handleNext();
        }
      }, 3000);
    }
  };

  const handleRetake = () => {
    initializeQuiz();
  };

  // console.log("accountingData", accountingData)

  return (
    <div className="rbt-lesson-rightsidebar overflow-hidden lesson-video">
      <div className="inner">
        <div className="content">
          <div className="quiz-form-wrapper">
            {currentQuiz.map((item, index) => (
              <div
                key={index}
                id={`question-${index + 1}`}
                className={`question ${index === next ? "" : "d-none"}`}
              >
                <div className="quize-top-meta">
                  <div className="quize-top-left">
                    <span>
                      <i
                        style={{ color: "skyblue" }}
                        className="feather-help-circle"
                      />
                      <small>
                        {" "}
                        <b> Question: </b>
                        {index + 1}/{currentQuiz.length}
                      </small>
                    </span>
                  </div>
                  <div className="quize-top-left">
                    <span>
                      <i
                        style={{ color: "limegreen" }}
                        className="feather-award"
                      />
                      <small>
                        <b> Points: </b>
                        {score}{" "}
                      </small>
                    </span>
                  </div>
                  <div className="quize-top-right">
                    <span>
                      <i
                        style={{ color: "orange" }}
                        className="feather-clock"
                      />
                      <small>
                        <b>Time remaining: </b>
                        {timeRemaining.toFixed(2)} minutes
                      </small>
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
                            type="radio"
                            value={option}
                            checked={selectedAnswer === option}
                            onChange={handleOptionChange}
                            disabled={answeredQuestions[index]}
                          />
                          <label
                            htmlFor={`rbt-checkbox-${index + 1}-${optIndex}`}
                            style={{
                              border: "none",
                              boxShadow:
                                "0px 6px 34px rgba(215, 216, 222, 0.41)",
                              padding: "30px",
                            }}
                            className={
                              answeredQuestions[index]
                                ? option === item.answer
                                  ? styles.correct
                                  : selectedAnswers[index] === option
                                  ? styles.wrong
                                  : styles.wrong
                                : ""
                            }
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
                className="rbt-btn icon-hover icon-hover-left btn-md bg-primary-opacity"
                id="retake-btn"
                type="button"
                onClick={handleRetake}
                disabled={!answeredQuestions.some((answered) => answered)}
              >
                New
              </button>

              <button
                className="rbt-btn icon-hover btn-sm"
                style={{ width: "150px" }}
                id="next-btn"
                type="button"
                onClick={() => {
                  setVideoEnded(false), handleNext();
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonQuiz;
