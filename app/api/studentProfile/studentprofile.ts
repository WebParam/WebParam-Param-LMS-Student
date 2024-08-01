import axios from "axios";
import { deployedUrl } from "../endpoints";
import { readUserData } from "../endpoints";

const route = "dev";

export async function StudentProfile(payload: any) {
    try {
        const register = await axios.put(`https://khumla-${route}-user-write.azurewebsites.net/api/v1/Profile/UpdateProfile`,payload);
        return register;
    } catch (error: any) {
        console.log(error);
    }
}

export async function updateDemographicsInformation(payload: any) {
    try {
        const res = await axios.put(`https://khumla-${route}-user-write.azurewebsites.net/api/Student/UpdateStudentDemographicsInformation`,payload);
        return res;
    } catch (error: any) {
        console.log(error);
    }
}

export async function updateContactInformation(payload: any) {
    try {
        const res = await axios.put(`https://khumla-${route}-user-write.azurewebsites.net/api/Student/UpdateStudentContactInformation`,payload);
        return res;
    } catch (error: any) {
        console.log(error);
    }
}

export async function updateEmployeeInformation(payload: any) {
    try {
        const res = await axios.put(`https://khumla-${route}-user-write.azurewebsites.net/api/Student/UpdateStudentEmployeeInformation`,payload);
        return res;
    } catch (error: any) {
        console.log(error);
    }
}

export async function updateRegionalInformation(payload: any) {
    try {
        const res = await axios.put(`https://khumla-dev-user-write.azurewebsites.net/api/Student/UpdateStudentRegionalInformation`,payload);
        return res;
    } catch (error: any) {
        console.log(error);
    }
}

export async function getStudentProfile(userId:any) {
    try {
        const register = await axios.get(`${readUserData}/api/v1/Profile/GetUserProfile/${userId}`);
        return register;

    } catch(error: any) {
        console.log(error);
    }
}

export const getStudentData = async (studentId: string) => {
    const resp = await axios.get(`https://khumla-dev-user-read.azurewebsites.net/api/Student/GetStudentInformation/${studentId} `)
    return resp.data
  }
  

export async function getStudentDocuments(userId:any) {
    try {
        const register = await axios.get(`https://khumla-dev-user-read.azurewebsites.net/api/v1/Documents/GetDocuments/${userId}`);
        return register;

    } catch(error: any) {
        console.log(error);
    }
}