import { POST, PUT } from "@/app/lib/api-client";
import { wActivityUrl } from "@/app/lib/endpoints";
import axios from "axios";

type TrackTimeSpentPayload = {
    courseId: string;
    userId: string;
}


export async function TrackTimeSpent(payload:TrackTimeSpentPayload) {
    try {
       const res =  await POST(payload, `${wActivityUrl}/api/v1/StudentTimeLog/StartStudentTimeLog`);
        return res;

    } catch(error: any) {
        console.log(error);
    }

}

export async function UpdateTimeSpent(id: string) {
    debugger;
    try {
        const res = await axios.put(`${wActivityUrl}/api/v1/StudentTimeLog/LogStudentTime/${id}`,null,{
            headers: {
                'Content-Type': 'application/json',
                'Client-Key': process.env.NEXT_PUBLIC_CLIENTKEY,
            }
        });
        
        debugger;
        return res;
    } catch (error: any) {
        console.log(error);
    }
}

export async function updateTimeSpent() {
    const id = localStorage.getItem('trackTimeSpentId');
    if (id) {
        try {   
            const res = await UpdateTimeSpent(id);
            console.log('update time spent:', res);
            return res;
        } catch (error: any) {
            console.log(error);
        }
    }
};
