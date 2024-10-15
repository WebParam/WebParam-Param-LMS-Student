import { GET, POST } from "@/app/lib/api-client";
import { rActivityUrl, rCourseUrl, wActivityUrl } from "@/app/lib/endpoints";

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

export async function PostVideoWatched(payload:any) {
    try {
        const res = await POST(payload, `${wActivityUrl}/api/v1/videoswatched/trackvideowatched`);
        console.log(" topics: ",res)
        debugger;
        return res.data;
    } catch (error:any) {
        console.log("error: ", error)
    }
}

export async function GetVideosWatched(studentId:string, topicId:string) {
    try {
        const res = await GET(`${rActivityUrl}/api/v1/VideoWatched/Student/${studentId}/Topic/${topicId}/Videos`);
        console.log(" topics: ",res)
        return res?.data;
    } catch (error:any) {
        console.log("error: ", error)
    }
}

