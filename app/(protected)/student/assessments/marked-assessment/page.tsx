'use client'

import "./marked.scss";
import { useSearchParams } from "next/navigation";
import { assessmentsData } from "../data";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GET } from "@/app/lib/api-client";
import { rAssessmentUrl } from "@/app/lib/endpoints";
import Cookies from "universal-cookie";

type Assessment = {
    assessmentId: string;
    assessmentName: string;
    userId: string;
    answers: [
        {
            questionId: string;
            description: string;
            questionType: string;
            options: [
                {
                    label: string;
                    questionId: string;
                    isCorrect: boolean;
                    description: string;
                    id: string;
                }
            ],
            studentMultipleChoiceAnswer: [
                {
                    label: string;
                    questionId: string;
                    isCorrect: boolean;
                    description: string;
                    id: string;
                }
            ],
            studentLongTextAnswer: string;
            rubrics: [
                {
                    label: string;
                    description: string;
                    questionId: string;
                    id: string;
                    facilitatorScore: number;
                    moderatorScore: number;
                }
    ],
    moderatorFeedBack: string;
    score: number;
  }],
    fileUrl: string,
    id: string,
    submittedAt: string
}

function MarkedAssessmentPage() {
    const searchParams = useSearchParams();
    const [assessment, setAssessment] = useState<Assessment | any>();
    const id = searchParams.get("id");
    const router = useRouter();

    const cookies = new Cookies();
    const loggedInUser = cookies.get('loggedInUser');
    const userID = cookies.get('userID');

    async function getAssessment() {
        try {
            const response = await GET(`${rAssessmentUrl}/api/v1/StudentAnswers/GetStudentAssessmentAnswer/${userID || loggedInUser?.userId}/${id}`);
        
            setAssessment(response?.data?.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAssessment();
    }, []);
    
    if (!assessment) {
        return <div>Assessment not found</div>;
    }
    
    console.log('assessment', assessment);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 marked-header">
                <h4 className="m-0">{assessment.assessmentName}</h4>
                <button
                    type="button"
                    className="rbt-btn btn-xs bg-primary-opacity radius-round"
                    style={{ width: '100px', height: '40px', fontSize: '14px' }}
                    onClick={() => router.back()}
                >
                    <i className="bi bi-arrow-left-short"></i> Back
                </button>
            </div>

            {assessment.answers.map((answer: any) => {
                if (answer.questionType === 'Long Text') return <EssayAnswer key={answer.id} answer={answer} />
                if (answer.questionType === 'Quiz') return <MultipleChoiceAnswer key={answer.id} answer={answer} />
            })}
            <div className="rbt-card m-0 p-2">
                <h5 className="rbt-card m-0 p-2" style={{ color: 'tomato' }}>Marks: {assessment.answers.reduce((total: any, answer: any) => total + answer.score, 0)}</h5>
            </div>
        </div>
    );
}

const EssayAnswer = (answer: any) => {
    return (
        <>
        <div className="mb-4 p-4 card">
            <div className="table-responsive o-hidden" >
                <h5>{answer?.answer?.description}</h5>
                    <div className="rbt-card height-330 o-hidden" style={{paddingLeft:'0 !important'}}>
                    <span style={{ color: 'green' }}>Answer</span>: <br />
                    {answer?.answer?.studentLongTextAnswer}
                </div>
            </div>
     

            <div className="rbt-card m-0 p-2">    
                <table className="table p-3">
                <thead className="thead-light">
                    <tr>    
                    <th scope="col">Label</th>
                    <th scope="col">Description</th>
                    <th scope="col">Facilitator Score</th>
                    <th scope="col">Moderator Score</th>
                    </tr>
                </thead>
                <tbody>
                    {answer?.answer?.rubrics?.map((rubric: any) => (
                    <tr key={rubric?.id}>
                    <td>{rubric?.label}</td>
                    <td>{rubric?.description}</td>
                    <td>{rubric?.facilitatorScore}</td>
                    <td>{rubric?.moderatorScore}</td>
                    </tr>))}
                   
                </tbody>
                </table>
            </div>
         </div>
        </>
    );
}

const MultipleChoiceAnswer = (answer: any) => {
    console.log('quizanswer', answer.answer);
    return (
        <>
           { <div className="table-responsive o-hidden card mb-4 p-3">
                {/* <h5>Question 2:</h5> */}
                <div className="rbt-card height-330 o-hidden">
                    <p><u>{answer?.answer?.description}</u></p>
                    <ul className="plan-offer-list">
                        {answer.answer.options.map((option: any) => (
                            <li className="p-2" style={{ border: `1px solid ${option.id === answer.answer.studentMultipleChoiceAnswer[0].id || option.isCorrect ? 'green' : 'tomato'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} key={option.id}>
                                <span style={{ color: option.isCorrect ? 'green' : 'tomato' }}>{option.description}</span>
                                {option.id === answer.answer.studentMultipleChoiceAnswer[0].id || option.isCorrect ? <i className="feather-check" /> : <i className="feather-x" style={{ backgroundColor: 'tomato' }} />}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>}

            
        </>
    );
}

export default function MarkedAssessment() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MarkedAssessmentPage />
        </Suspense>
    );
}