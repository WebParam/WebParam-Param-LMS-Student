"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { submitAssessmentAnswers } from "@/actions/assessments/assessments-action";
import MultipleChoiceQuestions from "../../../take-assessment/multipleChoise";
import styles from "@/styles/assessment/assessment.module.css";
import loaderStyles from "@/ui/loader-ui/loader.module.css";
import { rAssessmentThootoUrl } from '../../../../../app/lib/endpoints';

type LongAnswerQuestion = {
  id: string;
  title: string;
  type: string;
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

  const assessmentId = searchParams.get('id');
  const userId = "userId"; 
  const assessmentName = "assessmentName"; 
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
        .then((data) => {
          if (Array.isArray(data.data)) {
            const longTextQuestions = data.data.filter((question: any) => question.questionType === "Long Text");
            const quizQuestions = data.data.filter((question: any) => question.questionType === "Quiz");
            setLongQuestions(longTextQuestions);
            setQuizCount(quizQuestions.length);
            setAnswers(Array(longTextQuestions.length).fill(""));
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

  const handleSubmitAssessment = async () => {
    saveStateToLocalStorage();
    setIsInteracted(false);
    setLoading(true);

    setSubmitMultipleChoice(true);

    const submission = {
      assessmentId: assessmentId as string,
      assessmentName,
      userId,
      answers: [
        ...multipleChoiceAnswers,
        ...longQuestions.map((question, index) => ({
          questionId: question.id,
          description: question.title,
          questionType: question.type,
          options: [],
          studentMultipleChoiceAnswer: [],
          studentLongTextAnswer: answers[index],
          rubrics: [],
          moderatorFeedBack: "",
          score: 0,
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

  return (
    <div className="rbt-lesson-rightsidebar overflow-hidden lesson-video">
      <div className="inner" style={{ margin: "0 auto" }}>
        <div className="content">
          <div className="quiz-form-wrapper">
            <div className="quize-top-meta">
              <>
                <div className="quize-top-left">
                  <span>
                    Total Marks: <strong>50</strong>
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
                assessmentId={assessmentId}
                setIsInteracted={setIsInteracted}
                submitMultipleChoice={submitMultipleChoice}
                setSubmitMultipleChoice={setSubmitMultipleChoice}
                setMultipleChoiceAnswers={setMultipleChoiceAnswers}
              />
            )}
            {longQuestions.map((item, index) => (
              <div key={item.id} id={`question-${index + 1}`} className="question">
                <div className="rbt-single-quiz">
                  <h4 style={{ margin: "0 auto", fontSize: "21px" }}>
                    {quizCount + index + 1}. {item.title}
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