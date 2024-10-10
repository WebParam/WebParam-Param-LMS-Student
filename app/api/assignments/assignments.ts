import { get, post, put } from "../../lib/util";
import { Diagnostic } from "../../lib/util-logger";
import { rAssessmentUrl, wAssessmentUrl } from "@/app/lib/endpoints";

export const getAssignments = async (id:string) => {
    try {
        const resp = await get(`${rAssessmentUrl}/api/v1/Assignment/GetAssignments/${id}`);
        const data = resp.data;
        Diagnostic("SUCCESS ON GET, returning", data);
        return data;
      } catch (err) {
        Diagnostic("ERROR ON GET, returning", err);
        throw err;
      }
  };

  export const getStudentMarkedAssignments = async (id:string) => {
    try {
        const resp = await get(`${rAssessmentUrl}/api/v1/StudentAssignment/GetStudentMarkedAssignments/${id}`);
        const data = resp.data;
        Diagnostic("SUCCESS ON GET, returning", data);
        return data;
      } catch (err) {
        Diagnostic("ERROR ON GET, returning", err);
        throw err;
      }
  };


  export const downloadStudentAssignment = async (userID:string,assignmentId:string) => {
    try {
        const resp = await get(`${rAssessmentUrl}/api/v1/StudentAssignment/DownloadCompletedAssignment/${userID}/${assignmentId}`);
        const data = resp.data;
        Diagnostic("SUCCESS ON GET, returning", data);
        return data;
      } catch (err) {
        Diagnostic("ERROR ON GET, returning", err);
        throw err;
      }
  };


  export const getStudentUnmarkedAssignments = async (studentId:string, moduleId:string) => {
    try {
        const resp = await get(`${rAssessmentUrl}/api/v1/StudentAssignment/GetStudentUnMarkedAssignments/${studentId}/${moduleId}`);
        const data = resp.data;
        Diagnostic("SUCCESS ON GET, returning", data);
        return data;
      } catch (err) {
        Diagnostic("ERROR ON GET, returning", err);
        throw err;
      }
  };

  export const uploadAssignment = async (formData: any) => {
    try {
      const res = await fetch(
        `${wAssessmentUrl}/api/v1/StudentAssignment/SubmitAssignment`,
        
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Client-Key': process.env.NEXT_PUBLIC_CLIENTKEY || '', 
          },
          body: formData,
        }
      );
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}, Message: ${res.statusText}`);
      }
  
      let data;
      try {
        data = await res.json(); 
      } catch (jsonError) {
        if (jsonError instanceof SyntaxError) {
          Diagnostic("ERROR ON POST, returning", "Unexpected end of JSON input");
          return;
        }
        throw jsonError;
      }
  
      Diagnostic("SUCCESS ON POST, returning", data);
      return data; 
    } catch (err) {
      Diagnostic("ERROR ON POST, error details:", err); 
      throw err; 
    }
  };
  

  
export const updateAssignmentFile = async (formData: any,id:string) => {
    try {
      const res = await fetch(
        `${wAssessmentUrl}/api/v1/StudentAssignment/UpdateStudentAssignment`,
        {
          method: "PUT",
          headers: {
            'Accept': 'application/json',
            'Client-Key': process.env.NEXT_PUBLIC_CLIENTKEY || '', 
          },
          body: formData,
        }
      );
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}, Message: ${res.statusText}`);
      }
  
      let data;
      try {
        data = await res.json(); 
      } catch (jsonError) {
        if (jsonError instanceof SyntaxError) {
          Diagnostic("ERROR ON PUT, returning", "Unexpected end of JSON input");
          return;
        }
        throw jsonError;
      }
  
      Diagnostic("SUCCESS ON PUT, returning", data);
      return data; 
    } catch (err) {
      Diagnostic("ERROR ON PUT, error details:", err); 
      throw err; 
    }
  };

