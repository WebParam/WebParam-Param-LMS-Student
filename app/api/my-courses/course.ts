import axios from "axios";

const getUrl = "https://khumla-dev-newcourse-read.azurewebsites.net";
const postUrl = "https://khumla-dev-newcourse-write.azurewebsites.net";

export async function getCourseId(userId:string) {
    const courseId = axios.get(`${getUrl}//api/v1/Enrollments/GetUserEnrolledCourse/${userId}`);
    
    if (!courseId) {
        return undefined;
    }

    return courseId;
}

export async function getEnrolledCourse(getCourseId:any) {
    const knowledgeModule = axios.get(`${getUrl}/api/v1/KnowledgeModules/GetKnowledgeModules/${getCourseId}`);

    if (!knowledgeModule) {
        return undefined;
    }   
    return knowledgeModule;
}