import { GET } from "@/app/lib/api-client";
import { rCourseUrl } from "@/app/lib/endpoints";
import axios from "axios";

export async function GetKnowledgeTopicsNew(moduleId:any) {
    try {
        // const res = await axios.get( `${rCourseUrl}/api/v1/KnowledgeTopics/GetKnowledgeTopics/${moduleId}`);
        const res = await GET(`${rCourseUrl}/api/v1/KnowledgeTopics/GetKnowledgeTopics/${moduleId}`);
        console.log("get knowledge topics: ",res)
        return res?.data;
    } catch (error:any) {

    }
}

export async function getTopics(topicId:string) {
    try {
        // const res = await axios.get( `${rCourseUrl}/api/v1/TopicElements/GetTopicElements/${topicId}`);
        const res = await GET(`${rCourseUrl}/api/v1/TopicElements/GetTopicElements/${topicId}`);
        console.log(" topics: ",res)
        return res?.data;
    } catch (error:any) {

    }
}