import React, { useState } from 'react';

const MultipleChoiceQuestions = ({setIsInteracted}:any) => {
  const questions = [
    {
      question: "What is the primary role of a project manager?",
      options: [
        "To develop software",
        "To design marketing strategies",
        "To oversee and manage project progress",
        "To manage the company’s finances"
      ],
      answer: "To oversee and manage project progress"
    },
    {
      question: "Which document outlines the objectives, scope, and participants in a project?",
      options: [
        "Project Charter",
        "Business Plan",
        "Risk Management Plan",
        "Stakeholder Analysis"
      ],
      answer: "Project Charter"
    },
    {
      question: "What is a Gantt Chart used for?",
      options: [
        "Tracking project milestones",
        "Managing project budget",
        "Scheduling project tasks",
        "Conducting risk analysis"
      ],
      answer: "Scheduling project tasks"
    },
    {
      question: "What does the term 'scope creep' refer to in project management?",
      options: [
        "Increased project costs",
        "Uncontrolled changes in the project scope",
        "Delays in project timeline",
        "Decrease in project quality"
      ],
      answer: "Uncontrolled changes in the project scope"
    },
    {
      question: "What is the critical path in project management?",
      options: [
        "The sequence of project activities which add the most value",
        "The longest path through the project schedule",
        "The path with the most dependencies",
        "The sequence of activities that leads to project failure"
      ],
      answer: "The longest path through the project schedule"
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));

  const handleOptionChange = (questionIndex:any, option:any) => {
    

    if (!setIsInteracted) {
       setIsInteracted(true); 
    }
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const checkAnswers = () => {
    const correctAnswers = questions.map(q => q.answer);
    let score = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      if (selectedAnswers[i] === correctAnswers[i]) {
        score += 1;
      }
    }
  };

  return (
    <div>
      {questions.map((q, index) => (
        <div key={index} className='mt-3' style={{ marginBottom: '30px' }}>
          <h3 style={{fontSize:'21px'}}>{`${index + 1}. ${q.question}`}</h3>
          {q.options.map((option, i) => (
            <div key={i}>
              <label style={{
           
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                padding: '20px',
                borderRadius: '6px',
                paddingLeft: '30px',
                cursor: 'pointer',
                marginTop:'5px',
                boxShadow:"0px 6px 34px rgba(215, 216, 222, 0.41)"
                }}
                >
                    
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={selectedAnswers[index] === option}
                  onChange={() => handleOptionChange(index, option)}
                />
             <small>   {option}</small>
              </label>
            </div>
            
          ))}
        <div className="quize-top-left mt-2">
            <span>
                Marks: <strong>5</strong>
            </span>
        </div>
        </div>
      ))}

    </div>
  );
};

export default MultipleChoiceQuestions;
