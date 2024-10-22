import { GET, PUT } from "@/app/lib/api-client";
import { rCourseUrl, readUserData, writeUserData } from "@/app/lib/endpoints";
import axios from "axios";


export async function StudentProfile(payload: any) {
    try {
        const res = await PUT( payload,`${writeUserData}/api/v1/Profile/UpdateProfile`,);
        return res;
    } catch (error: any) {
        console.log(error);
    }
}

export async function updateDemographicsInformation(payload: any) {
    try {
        const res = await PUT(payload,`${writeUserData}/api/v1/Student/UpdateStudentDemographicsInformation`, );
        return res;
    } catch (error: any) {
        console.log(error);
    }
}

export async function updateContactInformation(payload: any) {
    try {
 
        const res = await PUT( payload,`${writeUserData}/api/v1/Student/UpdateStudentContactInformation`);
        return res;
    } catch (error: any) {
        console.log(error);
    }
}

export async function updateEmployeeInformation(payload: any) {
    try {
  
        const res = await PUT(payload,`${writeUserData}/api/v1/Student/UpdateStudentEmployeeInformation`);
        return res;
    } catch (error: any) {
        console.log(error);
    }
}

export async function updateRegionalInformation(payload: any) {
    try {
        const res = await PUT( payload,`${writeUserData}/api/v1/Student/UpdateStudentRegionalInformation`,);
        return res;
    } catch (error: any) {
        console.log(error);
    }
}

export async function getStudentProfile(userId: any) {
    try {
        const res = await GET(`${readUserData}/api/v1/Profile/GetUserProfile/${userId}`);
        return res;
    } catch (error: any) {
        console.log(error);
    }
}

export const getStudentData = async (studentId: string) => {
    // const resp = await axios.get(`${readUserData}/api/v1/Student/GetStudentInformation/${studentId} `)
    const res = await GET(`${readUserData}/api/v1/Student/GetStudentInformation/${studentId} `);
    return res.data
}


export async function getStudentDocuments(userId: any) {
    try {

        const res = await GET(`${readUserData}/api/v1/Documents/GetDocuments/${userId}`);
        return res;

    } catch (error: any) {
        console.log(error);
    }
}


export async function getDocumentsByCourseId(courseId: any) {
    try {
        const res = await GET(`${readUserData}/api/v1/Documents/GetDocuments/${courseId}`);
        return res;

    } catch (error: any) {
        console.log(error);
    }
}
