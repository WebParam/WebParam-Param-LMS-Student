import axios from "axios";
import { wCreateCheckin } from "@/app/lib/endpoints";

interface WorkExperience {
    workExperienceRating: string;
    jobDescriptionMatch: number;
    workloadStatement: string;
    supervisorFeedbackRating: number;
    additionalComments: string;
}

interface LearningExperience {
    monthlyWorkExperienceRating: string;
    jobDescriptionMatch: number;
    additionalComments: string;
}

interface Survey {
    survey: {
        userId: string;
        name: string;
        surname: string;
        monthReporting: string;
        emailAddress: string;
        hostPartner: string;
        workExperience: WorkExperience;
        learningExperience: LearningExperience;
    }
}


export async function postCreateSurvey(survey: Survey) {
    const clientKey = process.env.NEXT_PUBLIC_CLIENTKEY;
    const headers = {
        'Client-Key': clientKey,
        'Content-Type': 'application/json',
    };
    try {
        const res = await axios.post(
            `${wCreateCheckin}/api/v1/Survey/CreateSurvey`,
            survey,
            { headers }
        );
        return res;
    } catch (error) {
        console.error("Error creating survey:", error);
        throw error;
    }
}
