import axios from "axios";
import { writeUserData } from "@/app/lib/endpoints";
import { POST, PUT } from "@/app/lib/api-client";


export async function registerUser(payload:any) {
    try {
        // const register = await axios.post(`${writeUserData}/api/v1/Users/RegisterStudent`, payload);
        const register = await POST(payload, `${writeUserData}/api/v1/Users/RegisterStudent`);
        return register;

    } catch(error: any) {
        console.log(error);
    }

}

export async function verifyUserAccount(payload:any) {
    try {
        // const verify = await axios.post(`${writeUserData}/api/v1/Users/VerifyOTP`, payload);
        const verify = await POST(payload, `${writeUserData}/api/v1/Users/VerifyOTP`);
        return verify;

    } catch(error: any) {
        console.log(error);
    }

}

export async function LoginUser(payload:any) {
    try {
        // const register = await axios.post(`${writeUserData}/api/v1/Users/Login`, payload).then(data => {return data});
       const res =  await POST(payload, `${writeUserData}/api/v1/Users/Login`);
        return res;

    } catch(error: any) {
        console.log(error);
    }

}

export async function sendOtp(payload:any) {
    try {
        // const sendOtp = await axios.post(`${writeUserData}/api/v1/Users/SendResetPasswordOtp`, payload);
        const sendOtp = await POST(payload, `${writeUserData}/api/v1/Users/SendResetPasswordOtp`);
        return sendOtp;
    } catch(error: any) {
        console.log(error);
    }
}

export async function verifyOtp(payload:any) {
    try {
        // const verifyOtp = await axios.put(`${writeUserData}/api/v1/Users/ResetPassword`, payload);
        const verifyOtp = await PUT(payload, `${writeUserData}/api/v1/Users/ResetPassword`);
        return verifyOtp;
    } catch(error: any) {
        console.log(error);
    }
}
