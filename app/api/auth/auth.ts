import axios from "axios";
import { writeUserData } from "@/app/lib/endpoints";
import { POST, PUT } from "@/app/lib/api-client";


export async function registerUser(payload: any) {
    try {
        // const register = await axios.post(`${writeUserData}/api/v1/Users/RegisterStudent`, payload);
        const register = await POST(payload, `${writeUserData}/api/v1/Users/RegisterStudent`);
        return register;

    } catch (error: any) {
        console.log(error);
    }

}

export async function verifyUserAccount(payload: any) {
    try {
        const verify = await POST(payload, `${writeUserData}/api/v1/Users/VerifyOTP`);
        return verify;

    } catch (error: any) {
        console.log(error);
    }

}


export async function ResendSMS(payload: any) {
    try {
        const verify = await POST(payload, `${writeUserData}/api/v1/Users/ReSendOTP`);
        debugger;
        return verify;

    } catch (error: any) {
        console.log(error);
    }

}

export async function LoginUser(payload: any) {
    const headers = {
        'Client-Key': 'ec51852d24b1450faff0a868e84d05e5',
        'Content-Type': 'application/json',
    };
    try {
        const res = await axios.post(
            `${writeUserData}/api/v1/Users/Login`,
            payload,
            { headers }
        );
        return res;
    } catch (error) {
        console.error("Error creating survey:", error);
        throw error;
    }
}

export async function sendOtp(payload: any) {
    try {

        const sendOtp = await POST(payload, `${writeUserData}/api/v1/Users/SendResetPasswordOtp`);
        return sendOtp;
    } catch (error: any) {
        console.log(error);
    }
}

export async function verifyOtp(payload: any) {
    try {

        const verifyOtp = await PUT(payload, `${writeUserData}/api/v1/Users/ResetPassword`);
        return verifyOtp;
    } catch (error: any) {
        console.log(error);
    }
}
