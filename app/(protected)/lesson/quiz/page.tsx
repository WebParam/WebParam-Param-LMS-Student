"use client";

import { useState, useEffect } from "react";
import quizData from "@/data/quiz/quiz-callcenter.json";
import { accountingQuiz } from "@/data/quiz/accounting";
import styles from "@/styles/quiz/quiz.module.css";
import { useRouter } from "next/navigation";
import './quiz.scss'
import { POST } from "@/app/lib/api-client";
import { rDocumentParaphraseUrl } from "@/app/lib/endpoints";
import QuizLoading from "./loading";

interface IQuizQuestion  {
  question: string;
  options: string[];
  answer: string;
};

const LessonQuiz = ({firstQuiz, setVideoEnded, handleNext, currentVideo}:any) => {
  const [next, setNext] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoader] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(600/60); 
  const [loadingMessage, setLoadingMessage] = useState<string>("Generating quiz. Please do not leave this page...");
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    Array(quizData.length).fill(false)
  );
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(quizData.length).fill(null)
  );
  const [currentQuiz, setCurrentQuiz] = useState<IQuizQuestion[]>([]);
  const router = useRouter(); 

  useEffect(() => {
    if(!firstQuiz?.data){
      debugger;
      initializeQuiz();
    }else{
      debugger;
      setCurrentQuiz(firstQuiz.data)
    }
  }, []);

  useEffect(() => {
    setSelectedAnswer(selectedAnswers[next]);
  }, [next, selectedAnswers]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timeRemaining > 0 && selectedAnswers.some(answer => answer !== null)) {
      interval = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 60000); // Count down by one minute
    } else if (timeRemaining === 0) {
      handleNext(); // Handle end of quiz
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeRemaining, selectedAnswers]);

  // Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }:any) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};

const initializeQuiz = async () => {
  setLoader(true); // Start loading

  // Set timeouts to update loading messages
  const timeout1 = setTimeout(() => {
      setLoadingMessage("Still generating. Please hang tight...");
  }, 15000); // Message after 15 seconds

  const timeout2 = setTimeout(() => {
      setLoadingMessage("Taking longer than expected...make sure your network is stable");
  }, 30000); // Message after 30 seconds

  const timeout3 = setTimeout(() => {
    setLoadingMessage("Almost done. Wrapping up...");
}, 45000); // Message after 30 seconds

  try {
      const questions = await getQuizQuestions(currentVideo.id);

      // Assuming questions.data is the expected format
      const shuffledQuestions = questions.data?.sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffledQuestions?.slice(0, 10);
      
      setCurrentQuiz(selectedQuestions); // Update the current quiz with selected questions
      setNext(0); // Reset question index
      setScore(0); // Reset score
      setAnsweredQuestions(Array(selectedQuestions.length).fill(false)); // Reset answered state
      setSelectedAnswers(Array(selectedQuestions.length).fill(null)); // Reset selected answers
      setSelectedAnswer(null); // Reset currently selected answer
  } catch (error) {
      console.error("Error fetching quiz questions:", error);
      setLoadingMessage("Error loading quiz. Please try again."); // Set error message if fetching fails
  } finally {
      // Clear timeouts when loading is complete
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      setLoader(false); // Stop loading
      setLoadingMessage(""); // Reset loading message
  }
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
          handleNext()
        }
      }, 3000);
    }
  };

  const getQuizQuestions = async (videoId: string) => {
    try {
      const payload = { videoId };
      const res = await POST(payload, `${rDocumentParaphraseUrl}/api/v1/topicQuiz/generate`);
      if (!res?.data) throw new Error("Error generating quiz, please try again.");
      setLoader(false);
      return res.data;
    } catch (error: any) {
      setError(error?.message);
      setLoader(false);
      return null;
    }
  };

  const handleRetake = () => {
    initializeQuiz();
  };


  if (error) return (<div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#ffffff",
    }}
  >
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "400px" }}>
      <h1>Oops! {error}.</h1>
      <p>Please try again.</p>
      <button
      onClick={()=>{initializeQuiz()}}
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #333",
          color: "#333",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s, color 0.3s",
        }}
        disabled={loading}
      >
        Retry
      </button>
    </div>
  </div>)


  return (
    <div className="rbt-lesson-rightsidebar overflow-hidden lesson-video">
      <div className="inner">
        <div className="content">
            <div className="quiz-form-wrapper">
                {currentQuiz.length > 0 ? currentQuiz.map((item, index) => (
                    <div
                        key={index}
                        id={`question-${index + 1}`}
                        className={`question ${index === next ? "" : "d-none"}`}
                    >
                        <div className="quize-top-meta">
                            <div className="quize-top-left">
                                <span>
                                <i style={{color:"skyblue"}} className="feather-help-circle" />
                                <small> <b>  Question: </b>{index + 1}/{currentQuiz.length}</small> 
                                </span>
                            </div>
                            <div className="quize-top-left">
                                <span>
                                <i style={{color:"limegreen"}} className="feather-award" />
                                <small><b>   Points: </b>{score} </small>
                                </span>
                            </div>
                            <div className="quize-top-right">
                                <span>
                                <i style={{color:"orange"}} className="feather-clock" />
                                <small><b>Time remaining: </b>{timeRemaining.toFixed(2)} minutes</small>
                               
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
                                    style={{border:"none",boxShadow:"0px 6px 34px rgba(215, 216, 222, 0.41)", padding:"30px" }}
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
                    )):<QuizLoading loadingMessage={loadingMessage}/>}
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
                    style={{ width: '150px' }}
                    id="next-btn"
                    type="button"
                    onClick={() => {setVideoEnded(false), handleNext()}}
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