import { wAssessmentUrl, wStudentAnswersThootoUrl } from "@/app/lib/endpoints";
import { AssessmentResponse } from "@/interfaces/assessments/assessments-interface";

export const submitAssessment = async (
  title: string,
  courseId: string
): Promise<AssessmentResponse> => {
  const clientKey = process.env.NEXT_PUBLIC_CLIENTKEY;
  try {
    console.log("Submitting assessment:", { title, courseId });
    const response = await fetch(
      `${wAssessmentUrl}/Assessments/AddNewAssessment`,
      {
        method: "POST",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          'Client-Key': clientKey || '',
        } as HeadersInit,
        body: JSON.stringify({ title, courseId }),
      }
    );

    console.log("Response status:", response.status);
    if (!response.ok) {
      console.error("Failed to submit assessment", response);
      throw new Error("Failed to submit assessment");
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Submit assessment error:", error);
    throw error;
  }
};

type StudentAnswer = {
  questionId: string;
  description: string;
  questionType: string;
  options: Array<{
    label: string;
    questionId: string;
    isCorrect: boolean;
    description: string;
    id: string;
  }>;
  studentMultipleChoiceAnswer: Array<{
    label: string;
    questionId: string;
    isCorrect: boolean;
    description: string;
    id: string;
  }>;
  studentLongTextAnswer: string;
  rubrics: Array<{
    label: string;
    description: string;
    questionId: string;
    id: string;
    facilitatorScore: number;
    moderatorScore: number;
  }>;
  moderatorFeedBack: string;
  score: number;
};

type AssessmentSubmission = {
  assessmentId: string;
  assessmentName: string;
  userId: string;
  answers: StudentAnswer[];
  fileUrl: string;
};

export const submitAssessmentAnswers = async (
  submission: AssessmentSubmission
): Promise<AssessmentResponse> => {
  const clientKey = process.env.NEXT_PUBLIC_CLIENTKEY;
  try {
    console.log("Submitting assessment:", submission);
    const response = await fetch(
      `${wStudentAnswersThootoUrl}/AddStudentAnswers`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Client-Key': clientKey || '',
        } as HeadersInit,
        body: JSON.stringify([submission]),
      }
    );

    console.log("Response status:", response.status);
    if (!response.ok) {
      console.error("Failed to submit assessment", response);
      throw new Error("Failed to submit assessment");
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Submit assessment error:", error);
    throw error;
  }
};