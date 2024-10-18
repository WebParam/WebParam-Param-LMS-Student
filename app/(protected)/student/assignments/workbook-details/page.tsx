'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Question {
  type: 'multiple-choice' | 'short-answer';
  question: string;
  options?: string[];
}

interface Workbook {
  name: string;
  questions: Question[];
}

const workbooksData: Workbook[] = [
  {
    name: 'Workbook_KM01',
    questions: [
      { type: 'multiple-choice', question: 'What is the primary role of a project manager?', options: ['To execute tasks assigned by team members', 'To oversee and coordinate all aspects of a project', 'To handle only the financial aspects of a project'] },
      { type: 'multiple-choice', question: 'Which of the following is a key component of project planning?', options: ['Defining project scope', 'Hiring project team members', 'Conducting performance reviews'] },
      { type: 'short-answer', question: 'Explain the importance of stakeholder management in project management.' },
      { type: 'short-answer', question: 'Describe the steps involved in creating a project plan.' },
    ],
  },
  {
    name: 'Workbook_KM03',
    questions: [
      { type: 'multiple-choice', question: 'What is the primary purpose of project scope management?', options: ['To define and control what is included in the project', 'To manage the project budget', 'To oversee project team performance'] },
      { type: 'multiple-choice', question: 'Which document outlines the project scope?', options: ['Project Charter', 'Scope Statement', 'Risk Management Plan'] },
      { type: 'short-answer', question: 'Explain the importance of a Scope Statement in project management.' },
      { type: 'short-answer', question: 'Describe the process of creating a Work Breakdown Structure (WBS).' },
    ],
  },
];

const WorkbookPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [workbookName, setWorkbookName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWorkbookName(searchParams.get("workbookName"));
    }
  }, [searchParams]);

  const workbook = workbooksData.find(wb => wb.name === workbookName);

  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});

  const handleOptionClick = (questionIndex: number, option: string) => {
    setSelectedOptions(prev => ({ ...prev, [questionIndex]: option }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push('/student/assignments?tab=workbooks');
  };

  if (!workbook) {
    return <div>Workbook not found</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 style={{fontSize:'4rem'}}>{workbook.name}</h1>
      {workbook.questions.map((question, index) => (
        <div key={index}>
          <p style={{ fontWeight: '800', margin: '25px 0', fontSize:'20px' }}>{question.question}</p>
          {question.type === 'multiple-choice' && (
            <div>
              {question.options?.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOptionClick(index, option)}
                  style={{
                    marginBottom: '8px',
                    padding: '10px',
                    border: '1.5px solid',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    borderColor: selectedOptions[index] === option ? 'black' : 'lightgray',
                    fontWeight: selectedOptions[index] === option ? '550' : 'normal',
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
          {question.type === 'short-answer' && <textarea rows={4} cols={50} />}
        </div>
      ))}
      <div className="rbt-button-group justify-content-end" style={{ margin: '10px 0' }}>
        <button type="submit" style={{ cursor: 'pointer', marginTop: '16px' }} className="rbt-btn btn-xs bg-primary-opacity radius-round">Submit</button>
      </div>
    </form>
  );
};

export default function WorkBookDetails() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <WorkbookPage/>
      </Suspense>
  );
}
