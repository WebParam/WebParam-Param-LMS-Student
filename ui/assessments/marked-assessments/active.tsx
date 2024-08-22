import React from 'react';
import { useAssessmentContext } from '../(context)/AssessmentContext';

const summativeData = [
  {
    title: "Introduction to Project Management",
    course: "Fundamentals 101",
    dueDate: "2024-01-01",
    totalMarks: 50,
  },
  {
    title: "Advanced Project Management",
    course: "Fundamentals 102",
    dueDate: "2024-02-01",
    totalMarks: 100,
  },
];

const formativeData = [
  {
    title: "Effective Communication in the Workplace",
    course: "Communication 101",
    dueDate: "2024-01-15",
    totalMarks: 20,
  },
  {
    title: "How to Be Well-Articulated and Well-Spoken",
    course: "Communication 102",
    dueDate: "2024-01-20",
    totalMarks: 30,
  },
];

export default function ActiveAssessment() {
  const { assessmentType } = useAssessmentContext();
  const data = assessmentType === "summative" ? summativeData : formativeData;

  return (
    <table className="rbt-table table table-borderless">
      <thead>
        <tr>
          <th>Assessment Name</th>
          <th>Due Date</th>
          <th>Total Marks</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {data.map((assessment, index) => (
          <tr key={index}>
            <th>
              <span className="h6 mb--5">{assessment.title}</span>
              <p className="b3">
                Course: <a href="#">{assessment.course}</a>
              </p>
            </th>
            <td>
              <p className="b3">{assessment.dueDate}</p>
            </td>
            <td>
              <p className="b3">{assessment.totalMarks}</p>
            </td>
            <td>
              <div className="rbt-button-group justify-content-end">
                <a
                  className="rbt-btn btn-xs bg-primary-opacity radius-round"
                  title="Start"
                  href="/take-assessment"
                >
                  Start
                </a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}