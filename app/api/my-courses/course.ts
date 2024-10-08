import { rCourseUrl } from "@/app/lib/endpoints";
import axios from "axios";

export async function getCourseId(userId: string) {
  const courseId = axios.get(
    `${rCourseUrl}/Enrollments/GetUserEnrolledCourse/${userId}`
  );

  if (!courseId) {
    return undefined;
  }

  return courseId;
}

export async function getEnrolledCourse(getCourseId: any) {
  const knowledgeModule = axios.get(
    `${rCourseUrl}/KnowledgeModules/GetKnowledgeModules/${getCourseId}`
  );

  if (!knowledgeModule) {
    return undefined;
  }
  return knowledgeModule;
}
