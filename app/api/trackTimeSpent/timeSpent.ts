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

    const startTime = localStorage.getItem('startTimeTrack') ??"";

    const endTime = new Date().toString();
    const timeSpent = new Date(endTime).getTime() - new Date(startTime).getTime();
    const timeSpentInMinutes = timeSpent / (1000 * 60);

    console.log('Time spent:', timeSpentInMinutes.toFixed(0));

    if (parseInt(timeSpentInMinutes.toFixed(0)) > 20) {
        window.location.href = '/login';
        return;
    }

        if (id) {
        try {
            const res = await UpdateTimeSpent(id);
            console.log('Update time spent response:', res?.data?.data?.startTime);
            localStorage.setItem('startTimeTrack', endTime);

            return res;
        } catch (error: any) {
            console.error("Error updating time spent:", error);
        }
    } else {
        console.error("ID not found in localStorage");
    }
};
