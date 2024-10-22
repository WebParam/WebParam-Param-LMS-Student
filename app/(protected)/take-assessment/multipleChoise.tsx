"use client";

import React, { useState, useEffect } from 'react';
import { rQuestionsThootoUrl, rOptionsThootoUrl } from '../../lib/endpoints';

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
  type: string;
  options: Option[];
  score: string;
};

type MultipleChoiceQuestionsProps = {
  assessmentId: string;
  setIsInteracted: (interacted: boolean) => void;
  submitMultipleChoice: boolean;
  setSubmitMultipleChoice: (submit: boolean) => void;
  setMultipleChoiceAnswers: (answers: any[]) => void;
};

const MultipleChoiceQuestions: React.FC<MultipleChoiceQuestionsProps> = ({
  assessmentId,
  setIsInteracted,
  submitMultipleChoice,
  setSubmitMultipleChoice,
  setMultipleChoiceAnswers,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Option[]>([]);
  const clientKey = process.env.NEXT_PUBLIC_CLIENTKEY;

  useEffect(() => {
    const fetchQuestionsAndOptions = async () => {
      try {
        console.log("Fetching questions for assessmentId:", assessmentId);

        const questionsResponse = await fetch(`${rQuestionsThootoUrl}/GetQuestions/${assessmentId}`, {
          headers: {
            'Client-Key': clientKey || '',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          } as HeadersInit,
        });
        const questionsData = await questionsResponse.json();
        console.log("Questions data:", questionsData);

        if (Array.isArray(questionsData.data)) {
          const multipleChoiceQuestions = questionsData.data.filter((question: any) => question.questionType === "Quiz");
          console.log("Filtered questions:", multipleChoiceQuestions);

          const questionsWithOptions = await Promise.all(
            multipleChoiceQuestions.map(async (question: any) => {
              const optionsResponse = await fetch(`${rOptionsThootoUrl}/GetOptions/${question.id}`, {
                headers: {
                  'Client-Key': clientKey || '',
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                } as HeadersInit,
              });
              const optionsData = await optionsResponse.json();
              console.log(`Options data for question ${question.id}:`, optionsData);

              return {
                ...question,
                options: Array.isArray(optionsData.data) ? optionsData.data : [],
              };
            })
          );

          setQuestions(questionsWithOptions);
          setSelectedAnswers(Array(questionsWithOptions.length).fill(null));
        } else {
          console.error("Unexpected questions data format:", questionsData);
        }
      } catch (error) {
        console.error("Error fetching questions and options:", error);
      }
    };

    if (assessmentId) {
      fetchQuestionsAndOptions();
    } else {
      console.error("assessmentId is not defined");
    }
  }, [assessmentId, clientKey]);

  useEffect(() => {
    if (submitMultipleChoice) {
      handleSubmitAnswers();
      setSubmitMultipleChoice(false);
    }
  }, [submitMultipleChoice]);

  const handleOptionChange = (questionIndex: number, option: Option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = option;
    setSelectedAnswers(updatedAnswers);
    setIsInteracted(true);
  };

  const handleSubmitAnswers = () => {
    const answers = questions.map((question, index) => ({
      questionId: question.id,
      description: question.title,
      questionType: question.type,
      options: question.options,
      studentMultipleChoiceAnswer: selectedAnswers[index] ? [selectedAnswers[index]] : [],
      studentLongTextAnswer: "",
      rubrics: [],
      moderatorFeedBack: "",
      score: 0,
    }));

    setMultipleChoiceAnswers(answers);
  };

  return (
    <div>
      {questions.map((q, index) => (
        <div key={q.id} style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '21px' }}>{`${index + 1}. ${q.title}`}</h3>
          {Array.isArray(q.options) ? q.options.map((option) => (
            <div key={option.id}>
              <label
                style={{
                  border: `${selectedAnswers[index]?.id === option.id ? `2px solid ${process.env.NEXT_PUBLIC_PRIMARY_COLOR ?? 'rgb(36, 52, 92)'}` : '2px solid var(--color-border)'}`,
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px',
                  borderRadius: '6px',
                  paddingLeft: '30px',
                  cursor: 'pointer',
                  marginTop: '5px',
                }}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option.label}
                  checked={selectedAnswers[index]?.id === option.id}
                  onChange={() => handleOptionChange(index, option)}
                />
                {option.description}
              </label>
            </div>
          )) : (
            <p>No options available for this question.</p>
          )}
          <div className="quize-top-left mt-2">
            <span>
              Marks: <strong>{q.score}</strong>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestions;