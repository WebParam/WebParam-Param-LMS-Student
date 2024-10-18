"use client";

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