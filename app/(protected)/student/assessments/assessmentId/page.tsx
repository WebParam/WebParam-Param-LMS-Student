"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { submitAssessmentAnswers } from "@/actions/assessments/assessments-action";
import MultipleChoiceQuestions from "../../../take-assessment/multipleChoise";
import WarningModal from "../(components)/WarningModal"; 
import styles from "@/styles/assessment/assessment.module.css";
import loaderStyles from "@/ui/loader-ui/loader.module.css";
import { rAssessmentThootoUrl, rQuestionsThootoUrl, rOptionsThootoUrl } from '../../../../../app/lib/endpoints';
import Cookies from "universal-cookie";

type LongAnswerQuestion = {
  id: string;
  title: string;
  description: string;
  questionType: string;
  score: string;
  rubrics: any[];
};

type Option = {
  id: string;
  label: string;
  questionId: string;
  isCorrect: boolean;
  description: string;
};

type Question = {
  id: string;
  title: string;
  description: string;
  questionType: string;
  options: Option[];
  score: string;
};

const AssessmentComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [longQuestions, setLongQuestions] = useState<LongAnswerQuestion[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isInteracted, setIsInteracted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(3600);
  const [quizCount, setQuizCount] = useState<number>(0);
  const [submitMultipleChoice, setSubmitMultipleChoice] = useState<boolean>(false);
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState<any[]>([]);
  const [showWarning, setShowWarning] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Option[]>([]);

  const cookies = new Cookies();
  const userId = cookies.get('userID');

  const assessmentId = searchParams.get('id');
  const assessmentName = searchParams.get('title') ?? "Default Assessment Name";
  const totalMarks = searchParams.get('totalMarks') 
  
  const clientKey = process.env.NEXT_PUBLIC_CLIENTKEY;
  
  useEffect(() => {
    if (assessmentId && clientKey) {
      fetch(`${rAssessmentThootoUrl}/api/v1/Questions/GetQuestions/${assessmentId}`, {
        headers: {
          'Client-Key': clientKey,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (Array.isArray(data.data)) {
            const longTextQuestions = data.data.filter((question: any) => question.questionType === "Long Text");
            const quizQuestions = data.data.filter((question: any) => question.questionType === "Quiz");

            // Fetch rubrics for long text questions
            const longTextQuestionsWithRubrics = await Promise.all(
              longTextQuestions.map(async (question: any) => {
                const rubricsResponse = await fetch(`${rAssessmentThootoUrl}/api/v1/Rubrics/GetRubrics/${question.id}`, {
                  headers: {
                    'Client-Key': clientKey,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                });
                const rubricsData = await rubricsResponse.json();
                return {
                  ...question,
                  rubrics: Array.isArray(rubricsData.data) ? rubricsData.data : [],
                };
              })
            );

            // Fetch options for quiz questions
            const quizQuestionsWithOptions = await Promise.all(
              quizQuestions.map(async (question: any) => {
                const optionsResponse = await fetch(`${rOptionsThootoUrl}/GetOptions/${question.id}`, {
                  headers: {
                    'Client-Key': clientKey,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                });
                const optionsData = await optionsResponse.json();
                return {
                  ...question,
                  options: Array.isArray(optionsData.data) ? optionsData.data : [],
                };
              })
            );

            setLongQuestions(longTextQuestionsWithRubrics);
            setQuestions(quizQuestionsWithOptions);
            setQuizCount(quizQuestionsWithOptions.length);
            setAnswers(Array(longTextQuestionsWithRubrics.length).fill(""));
            setSelectedAnswers(Array(quizQuestionsWithOptions.length).fill(null));
          } else {
            console.error("Unexpected data format:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
  }, [assessmentId, clientKey]);

  useEffect(() => {
    const savedState = JSON.parse(
      localStorage.getItem("assessmentState") || "{}"
    );
    if (savedState) {
      setAnswers(savedState.answers || Array(longQuestions.length).fill(""));
    }
  }, [longQuestions]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isInteracted && timeRemaining !== null) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime !== null && prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timer);
            handleSubmitAssessment();
            return null;
          }
        });
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
      setTimeRemaining(3600);
    }
  };

  const handleOptionChange = (questionIndex: number, option: Option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = option;
    setSelectedAnswers(updatedAnswers);
    setIsInteracted(true);
  };

  const handleSubmitAssessment = async () => {
    saveStateToLocalStorage();
    setIsInteracted(false);
    setLoading(true);

    const submission = {
      assessmentId: assessmentId as string,
      assessmentName,
      userId,
      answers: [
        ...questions.map((question, index) => ({
          questionId: question.id,
          description: question.description,
          questionType: question.questionType,
          options: question.options,
          studentMultipleChoiceAnswer: selectedAnswers[index] ? [selectedAnswers[index]] : [],
          studentLongTextAnswer: "",
          rubrics: [],
          moderatorFeedBack: "",
          score: question.score,
        })),
        ...longQuestions.map((question, index) => ({
          questionId: question.id,
          description: question.description,
          questionType: question.questionType,
          options: [],
          studentMultipleChoiceAnswer: [],
          studentLongTextAnswer: answers[index],
          rubrics: question.rubrics,
          moderatorFeedBack: "",
          score: question.score,
        })),
      ],
      fileUrl: "",
    };

    try {
      const response = await submitAssessmentAnswers(submission);
      console.log("Assessment Submitted:", response);

      console.log("All questions answered. Assessment completed.");

      localStorage.removeItem("assessmentState");
      setAnswers(Array(longQuestions.length).fill(""));
      setTimeRemaining(null);

      router.back();
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

  const handleWarningConfirm = () => {
    setShowWarning(false);
  };

  return (
    <div className="rbt-lesson-rightsidebar overflow-hidden lesson-video">
      {showWarning && <WarningModal show={showWarning} onHide={() => setShowWarning(false)} onConfirm={handleWarningConfirm} />}
      {!showWarning && (
        <div className="inner" style={{ margin: "0 auto" }}>
          <div className="content">
            <div className="quiz-form-wrapper">
                <div>
                  <span>
                    <strong>{assessmentName}</strong>
                  </span>
                </div>
              <div className="quize-top-meta">
                <>
                  <div className="quize-top-left">
                    <span>
                      Total Marks: <strong>{totalMarks}</strong>
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
              </div>
              {assessmentId && (
                <MultipleChoiceQuestions
                  questions={questions}
                  selectedAnswers={selectedAnswers}
                  handleOptionChange={handleOptionChange}
                />
              )}
              {longQuestions.map((item, index) => (
                <div key={item.id} id={`question-${index + 1}`} className="question">
                  <div className="rbt-single-quiz">
                    <h4 style={{ margin: "0 auto", fontSize: "21px" }}>
                      {quizCount + index + 1}. {item.description}
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
                  <hr />
                  <div className="quize-top-meta">
                    <div className="quize-top-left">
                      <span>
                        Marks: <strong>{item.score}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className={styles.buttonWrapper}>
                <button
                  className="rbt-btn btn-sm"
                  style={{height:'40px', border:'none', backgroundColor:`${process.env.NEXT_PUBLIC_PRIMARY_COLOR??'rgb(36, 52, 92)'}`, borderRadius:'8px  '}}
                  type="button"
                  onClick={handleSubmitAssessment}
                  disabled={loading}
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
      )}
    </div>
  );
};

export default function TakeAssessmentComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AssessmentComponent />
    </Suspense>
  );
}