'use client'
import { GET } from "@/app/lib/api-client";
import { useCourseId } from "@/context/courseId-context/courseId-context";
import { useEffect, useState } from "react";

export default function WorkbookPage(){
    const courseId = useCourseId();
    const [data, setData] = useState<any>(null);
    const [questions, setQuestions] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const _id = courseId;
            console.log(_id);
            const {data, message, error} = await GET(`https://thooto-dev-be-workbooks-read.azurewebsites.net/api/v1/Workbook/GetWorkbooks/66c6f9fe0c2eeac80af3b590`);
            console.log('data: ', data.data);
            setData(data.data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const _id = courseId;
            console.log(_id);
            const {data, message, error} = await GET(`https://thooto-dev-be-workbooks-read.azurewebsites.net/api/v1/Workbook/GetWorkbookQuestions/66ff939fef5cc4a18a776302`);
            console.log('questions data: ', data.data);
            debugger;
            setQuestions(data.data);
        }
        fetchData();
    }, []);


    return <div>Workbook 
        {data?.map((item:any)=>(
            <div>
                <h1>{item?.totalMarks}</h1>
                <p>{item?.description}</p>
            </div>
        ))}

        {questions?.map((item:any)=>(
            <div>
                <h1>{item?.question}</h1>
            </div>
        ))}

    </div>
}