"use client";

import styles from "@/styles/quiz/quiz.module.css";

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

type MultipleChoiceQuestionsProps = {
  questions: Question[];
  selectedAnswers: Option[];
  handleOptionChange: (questionIndex: number, option: Option) => void;
};

const MultipleChoiceQuestions: React.FC<MultipleChoiceQuestionsProps> = ({
  questions,
  selectedAnswers,
  handleOptionChange,
}) => {
  return (
    <div>
      {questions.map((q, index) => (
        <div key={q.id} style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '21px' }}>{`${index + 1}. ${q.description}`}</h3>
          {Array.isArray(q.options) ? q.options.map((option) => (
            <div key={option.id} className="col-lg-12">
              <p className="rbt-checkbox-wrapper mb--5">
                <input
                  id={`rbt-checkbox-${index + 1}-${option.id}`}
                  name={`rbt-checkbox-${index + 1}`}
                  type="radio"
                  value={option.label}
                  checked={selectedAnswers[index]?.id === option.id}
                  onChange={() => handleOptionChange(index, option)}
                />
                <label
                  htmlFor={`rbt-checkbox-${index + 1}-${option.id}`}
                  style={{
                    border: "none",
                    boxShadow: "0px 6px 34px rgba(215, 216, 222, 0.41)",
                    padding: "30px",
                    background:"white"
                  }}
                  className={
                    selectedAnswers[index]?.id === option.id
                      ? styles.correct
                      : styles.wrong
                  }
                >
                  {option.description}
                </label>
              </p>
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