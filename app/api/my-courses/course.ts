
import { GET } from "@/app/lib/api-client";
import { rCourseUrl } from "@/app/lib/endpoints";
import axios from "axios";

export async function getCourseId(userId: string) {
  // const courseId = axios.get(`${rCourseUrl}/Enrollments/GetUserEnrolledCourse/${userId}`);
  
  const courseId = GET(`${rCourseUrl}/Enrollments/GetUserEnrolledCourse/${userId}`);

  if (!courseId) {
    return undefined;
  }

  return courseId;
}

export async function getEnrolledCourse(getCourseId: any) {
  // const knowledgeModule = axios.get(`${rCourseUrl}/api/v1/KnowledgeModules/GetKnowledgeModules/${getCourseId}`);
  
  const knowledgeModule = GET(`${rCourseUrl}/api/v1/KnowledgeModules/GetKnowledgeModules/${getCourseId}`);

  if (!knowledgeModule) {
    return undefined;
  }
  return knowledgeModule;
}
