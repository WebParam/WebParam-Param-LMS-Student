'use client'

import "./marked.scss";
import { useSearchParams } from "next/navigation";
import { assessmentsData } from "../data";
import { Suspense } from "react";
import { useRouter } from "next/navigation";

function MarkedAssessmentPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();

    const assessment = assessmentsData.find((assessment: any) => Number(assessment.id) === Number(id));

    if (!assessment) {
        return <div>Assessment not found</div>;
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 marked-header">
                <h4 className="m-0">{assessment.title}</h4>
                <button
                    type="button"
                    className="rbt-btn btn-xs bg-primary-opacity radius-round"
                    style={{ width: '100px', height: '40px', fontSize: '14px' }}
                    onClick={() => router.back()}
                >
                    <i className="bi bi-arrow-left-short"></i> Back
                </button>
            </div>
            {assessment.id === 1 && <EssayAnswer />}
            {assessment.id === 2 && <IntroductionAnswer />}
            {assessment.id === 3 && <ConflictResolutionAnswer />}
            {assessment.id === 4 && <ActiveListeningAnswer />}
        </div>
    );
}

const EssayAnswer = () => {
    return (
        <>
            <div className="table-responsive o-hidden m-4">
                <h5>Question 1:</h5>
                <div className="rbt-card height-330 o-hidden">
                    <span style={{ color: 'green' }}>Answer</span>: <br />
                    Hi, I am Lucy! I am someone who is always been drawn
                    to technology and design. I love solving problems creatively and
                    figuring out how things work, which is what led me to pursue a career
                    in web development and user experience design.
                    I am passionate about making technology more accessible and enjoyable for people.
                    I believe that design is not just about how something looks but how it functions.
                    I am always trying to strike that perfect balance between aesthetics and usability,
                    ensuring that the products I work on are both beautiful and practical
                    <br />
                    <br />
                    Collaboration is something I thrive on. Whether I am working with developers, designers,
                    or clients, I enjoy being part of a team that brings ideas to life. For me, the best
                    projects come from a blend of different perspectives and skills.
                </div>
            </div>

            <div className="rbt-card m-0 p-2">
                <h5 className="rbt-card m-0 p-2" style={{ color: 'green' }}>Marks: 8/10</h5>
            </div>
        </>
    );
}

const IntroductionAnswer = () => {
    return (
        <>
            <div className="table-responsive o-hidden m-4">
                <h5>Question 1: </h5>
                <div className="rbt-card height-330 o-hidden">
                    <p><u>Which of the following is a key component of project management?</u></p>
                    <ul className="plan-offer-list">
                        <li className="p-2" style={{ border: '1px solid green', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ color: 'green' }}> Resource Allocation</span>
                            <i className="feather-check" />
                        </li>
                        <li>
                            Project Planning
                        </li>
                        <li>
                            Risk Management
                        </li>
                        <li>
                            App Development
                        </li>
                        <li>
                            Budgeting
                        </li>
                        <li>
                            Quality Assurance
                        </li>
                    </ul>
                </div>
            </div>

            <div className="table-responsive o-hidden">
                <h5>Question 2:</h5>
                <div className="rbt-card height-330 o-hidden">
                    <p><u>Which of the following is a key component of project management?</u></p>
                    <ul className="plan-offer-list">
                        <li className="p-2" style={{ border: '1px solid green', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ color: 'green' }}>Project Planning</span>
                            <i className="feather-check" />
                        </li>
                        <li>
                            Resource Allocation
                        </li>
                        <li>
                            Risk Management
                        </li>
                        <li className="p-2" style={{ border: '1px solid tomato', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ color: 'tomato' }}>Budgeting</span>
                            <i className="feather-x" style={{ backgroundColor: 'tomato' }} />
                        </li>
                        <li>
                            Quality Assurance
                        </li>
                    </ul>
                </div>
            </div>

            <div className="table-responsive o-hidden">
                <h5>Question 3:</h5>
                <div className="rbt-card height-330 o-hidden">
                    <p><u>Which of the following is a key component of project management?</u></p>
                    <ul className="plan-offer-list">
                        <li>
                            Project Planning
                        </li>
                        <li className="p-2" style={{ border: '1px solid tomato', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ color: 'tomato' }}>Resource Allocation</span>
                            <i className="feather-x" style={{ backgroundColor: 'tomato' }} />
                        </li>
                        <li>
                            Risk Management
                        </li>
                        <li className="p-2" style={{ border: '1px solid green', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ color: 'green' }}>Budgeting</span>
                            <i className="feather-check" />
                        </li>
                        <li>
                            Quality Assurance
                        </li>
                    </ul>
                </div>
            </div>

            <div className="rbt-card m-0 p-2">
                <h5 className="rbt-card m-0 p-2" style={{ color: 'tomato' }}>Marks: 5/15</h5>
            </div>
        </>
    );
}

const ConflictResolutionAnswer = () => {
    return (
        <>
            <div className="table-responsive o-hidden m-4">
                <h5>Question 1:</h5>
                <div className="rbt-card height-330 o-hidden">
                    <span style={{ color: 'green' }}>Answer</span>: <br />
                    Conflict resolution is a way for two or more parties to find a peaceful solution to a disagreement among them.
                    The disagreement may be personal, financial, political, or emotional. When a dispute arises, often the best course
                    of action is negotiation to resolve the disagreement.
                    <br />
                    <br />
                    There are several strategies for conflict resolution, including:
                    <ul>
                        <li>Accommodating</li>
                        <li>Avoiding</li>
                        <li>Collaborating</li>
                        <li>Competing</li>
                        <li>Compromising</li>
                    </ul>
                </div>
            </div>

            <div className="rbt-card m-0 p-2">
                <h5 className="rbt-card m-0 p-2" style={{ color: 'green' }}>Marks: 9/10</h5>
            </div>
        </>
    );
}

const ActiveListeningAnswer = () => {
    return (
        <>
            <div className="table-responsive o-hidden m-4">
                <h5>Question 1:</h5>
                <div className="rbt-card height-330 o-hidden">
                    <span style={{ color: 'green' }}>Answer</span>: <br />
                    Active listening is a technique that is used in counseling, training, and solving disputes or conflicts.
                    It requires that the listener fully concentrate, understand, respond, and then remember what is being said.
                    <br />
                    <br />
                    The key components of active listening include:
                    <ul>
                        <li>Paying attention</li>
                        <li>Showing that you are listening</li>
                        <li>Providing feedback</li>
                        <li>Deferring judgment</li>
                        <li>Responding appropriately</li>
                    </ul>
                </div>
            </div>

            <div className="rbt-card m-0 p-2">
                <h5 className="rbt-card m-0 p-2" style={{ color: 'green' }}>Marks: 8/10</h5>
            </div>
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