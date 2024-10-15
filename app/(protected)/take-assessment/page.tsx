"use client";

import React from 'react';

const TakeAssessmentPage = () => {
  return (
    <div>
      {
        // import { useState, useEffect } from "react";
// import styles from "@/styles/assessment/assessment.module.css";
// import loaderStyles from "@/ui/loader-ui/loader.module.css";
// import assessmentData from "@/data/assessment/assessment.json";
// import { useRouter } from "next/navigation";
// import { submitAssessment } from "@/actions/assessments/assessments-action";
// //import MultipleChoice from "./multipleChoise";

// type AssessmentQuestion = {
//   question: string;
// };

// type AssessmentData = {
//   quizData: AssessmentQuestion[];
// };

// // Cast the imported data to the correct type
// const assessment: AssessmentData = assessmentData as AssessmentData;

// const AssessmentComponent = () => {
//   const [answers, setAnswers] = useState<string[]>(
//     Array(assessment.quizData.length).fill("")
//   );
//   const [isInteracted, setIsInteracted] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const savedState = JSON.parse(
//       localStorage.getItem("assessmentState") || "{}"
//     );
//     if (savedState) {
//       setAnswers(
//         savedState.answers || Array(assessment.quizData.length).fill("")
//       );
//     }
//   }, []);

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (isInteracted && timeRemaining !== null) {
//       timer = setInterval(() => {
//         setTimeRemaining((prevTime) =>
//           prevTime !== null ? prevTime - 1 : null
//         );
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [isInteracted, timeRemaining]);

//   const handleAnswerChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement>,
//     index: number
//   ) => {
//     const newAnswers = [...answers];
//     newAnswers[index] = event.target.value;
//     setAnswers(newAnswers);
//     if (!isInteracted) {
//       setIsInteracted(true);
//       setTimeRemaining(3600);
//     }
//   };

//   const handleSubmitAssessment = async () => {
//     saveStateToLocalStorage();
//     setIsInteracted(false);
//     setLoading(true);
//     const courseId = "65eebefa793e4ee1a7223a63";

//     try {
//       const responses = await Promise.all(
//         answers.map((answer) => submitAssessment(answer, courseId))
//       );
//       console.log("Assessment Submitted:", responses);

//       // Handle assessment completion
//       console.log("All questions answered. Assessment completed.");
//       // Clear local storage and reset answers
//       localStorage.removeItem("assessmentState");
//       setAnswers(Array(assessment.quizData.length).fill(""));
//       setTimeRemaining(null); // Reset the timer

//       setTimeout(() => {
        
//         router.push("/student/assessments?tab=completed");
//       }, 2000)

//       // Redirect to /lesson
//     } catch (error) {
//       console.error("Error submitting assessment:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveStateToLocalStorage = () => {
//     localStorage.setItem(
//       "assessmentState",
//       JSON.stringify({
//         answers,
//       })
//     );
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   return (
//     <div className="rbt-lesson-rightsidebar overflow-hidden lesson-video">
//       <div className="inner" style={{margin:'0 auto'}}>
//         <div className="content">
//           <div className="quiz-form-wrapper">
//              <div className="quize-top-meta">
                
//                     <>
//                       <div className="quize-top-left">
//                         <span>
//                           Total Marks: <strong>50</strong>
//                         </span>
//                       </div>
//                       <div className="quize-top-right">
//                         <span>
//                           Time remaining:{" "}
//                           <strong>
//                             {timeRemaining !== null
//                               ? formatTime(timeRemaining)
//                               : "No Limit"}
//                           </strong>
//                         </span>
//                       </div>
//                     </>
//                     </div>
//             <MultipleChoice setIsInteracted={setIsInteracted} />
//             {assessment.quizData.slice(4,9).map((item, index) => (
//               <div
//                 key={index}
//                 id={`question-${index + 1}`}
//                 className="question"
//               >
//                 <div className="quize-top-meta">
//                   {index === 0 ? (
//                     <>
                     
//                     </>
//                   ) : (
//                     <>
//                       <div className="quize-top-left">
//                         <span>
//                           Marks: <strong>5</strong>
//                         </span>
//                       </div>
//                       <div className="quize-top-right">
                       
//                       </div>
//                     </>
//                   )}
//                 </div>
//                 <hr />
//                 <div className="rbt-single-quiz">
//                   <h4 style={{ margin:'0 auto', fontSize:'21px'}}>
//                     {index + 6}. {item.question}
//                   </h4>
//                   <div className="row g-3 mt--10">
//                     <textarea
//                       className={styles.textArea}
//                       value={answers[index]}
//                       onChange={(e) => handleAnswerChange(e, index)}
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div className={styles.buttonWrapper}>
//               <button
//                 className="rbt-btn btn-sm"
//                 style={{backgroundColor:'rgb(36, 52, 92) !important'}}
//                 type="button"
//                 onClick={handleSubmitAssessment}
//                 // disabled={
//                 //   !isInteracted ||
//                 //   loading ||
//                 //   answers.some((answer) => answer === "")
//                 // }
//               >
//                 {loading ? (
//                   <>
//                     <span className={loaderStyles.loaderButton}></span>
//                     Submit Assessment
//                   </>
//                 ) : (
//                   "Submit Assessment"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssessmentComponent;
      }
    </div>
  );
};

export default TakeAssessmentPage;