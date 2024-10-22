import { POST, GET } from "@/app/Utils/methods";
import { rLoogBookUrl, wLoogBookUrl } from "@/app/lib/endpoints";
import { Diagnostic } from "@/app/lib/util-logger";
import { IStudentLogbook, ICourseLogbook } from "@/interfaces/logbook-interface/logbook-interface";

// /api/v1/StudentLogbook/AddStudentLogbook
export const addStudentLogbook = async (formData: FormData): Promise<{ data: IStudentLogbook | null, message: string, error: boolean }> => {
  try {
    const resp = await POST(`${wLoogBookUrl}/api/v1/StudentLogbook/AddStudentLogbook`, formData);
    Diagnostic("SUCCESS ON ADD STUDENT LOGBOOK, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON ADD STUDENT LOGBOOK, returning", err);
    throw err;
  }
}

// /api/v1/CourseLogbooks/GetCourseLogbooksByCourse/testCourseId
export const getCourseLogbooksByCourse = async (courseId: string): Promise<{ data: ICourseLogbook | null, message: string, error: boolean }> => {
  try {
    const resp = await GET(`${rLoogBookUrl}/api/v1/CourseLogbooks/GetCourseLogbooksByCourse/${courseId}`);
    Diagnostic("SUCCESS ON GET COURSE LOGBOOKS BY COURSE, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON GET COURSE LOGBOOKS BY COURSE, returning", err);
    throw err;
  }
}

// /api/v1/CourseLogbooks/GetAllCourseLogbooks
export const getAllCourseLogbooks = async (): Promise<{ data: ICourseLogbook[] | null, message: string, error: boolean }> => {
  try {
    const resp = await GET(`${rLoogBookUrl}/api/v1/CourseLogbooks/GetAllCourseLogbooks`);
    Diagnostic("SUCCESS ON GET ALL COURSE LOGBOOKS, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON GET ALL COURSE LOGBOOKS, returning", err);
    throw err;
  }
}

// /api/v1/CourseLogbooks/GetAllCourseLogbooksByAdmin/{adminId}
export const getAllCourseLogbooksByAdmin = async (adminId: string): Promise<{ data: ICourseLogbook[] | null, message: string, error: boolean }> => {
  try {
    const resp = await GET(`${rLoogBookUrl}/api/v1/CourseLogbooks/GetAllCourseLogbooksByAdmin/${adminId}`);
    Diagnostic("SUCCESS ON GET ALL COURSE LOGBOOKS BY ADMIN, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON GET ALL COURSE LOGBOOKS BY ADMIN, returning", err);
    throw err;
  }
}

// /api/v1/StudentLogbooks/GetStudentLogbooksByCourse/{studentId}/{courseId}
export const getStudentLogbooksByCourse = async (studentId: string, courseId: string): Promise<{ data: IStudentLogbook[] | null, message: string, error: boolean }> => {
  try {
    const resp = await GET(`${rLoogBookUrl}/api/v1/StudentLogbooks/GetStudentLogbooksByCourse/${studentId}/${courseId}`);
    Diagnostic("SUCCESS ON GET STUDENT LOGBOOKS BY COURSE, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON GET STUDENT LOGBOOKS BY COURSE, returning", err);
    throw err;
  }
}

// /api/v1/StudentLogbooks/GetAllStudentLogbooks/{studentId}
export const getAllStudentLogbooks = async (studentId: string): Promise<{ data: IStudentLogbook[] | null, message: string, error: boolean }> => {
  try {
    const resp = await GET(`${rLoogBookUrl}/api/v1/StudentLogbooks/GetAllStudentLogbooks/${studentId}`);
    Diagnostic("SUCCESS ON GET ALL STUDENT LOGBOOKS, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON GET ALL STUDENT LOGBOOKS, returning", err);
    throw err;
  }
}

// /api/v1/StudentLogbooks/GetAllCourseLogbooks/{courseId}
export const getAllCourseLogbooksByCourse = async (courseId: string): Promise<{ data: IStudentLogbook[] | null, message: string, error: boolean }> => {
  try {
    const resp = await GET(`${rLoogBookUrl}/api/v1/StudentLogbooks/GetAllCourseLogbooks/${courseId}`);
    Diagnostic("SUCCESS ON GET ALL COURSE LOGBOOKS BY COURSE, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON GET ALL COURSE LOGBOOKS BY COURSE, returning", err);
    throw err;
  }
}


// Dead Code from Below

// import { rLoogBookUrl, wLoogBookUrl } from "@/app/lib/endpoints";
// import {
//   CheckinResponse,
//   CheckoutResponse,
//   Logbook,
// } from "@/interfaces/logbook-interface/logbook-interface";
// //The end points for the logbook
// export const CheckIn = async (
//   userId: string,
//   classId: string
// ): Promise<CheckinResponse> => {
//   try {
//     const response = await fetch(`${wLoogBookUrl}/LogBooks/CheckIn`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ userId, classId }),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to check in.");
//     }
//     const data = response.json();
//     console.log("check in data: ", data);
//     return data;
//   } catch (error) {
//     console.log("checking-in error: ", error);
//     throw error;
//   }
// };

// export const CheckOut = async (
//   id: string,
//   feedback: string,
//   rating: string,
//   classId: string
// ): Promise<CheckoutResponse> => {
//   try {
//     const response = await fetch(`${wLoogBookUrl}/LogBooks/CheckOut`, {
//       method: "POST",
//       headers: {
//         Accept: "text/plain",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id, feedback, rating, classId }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to check out");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Check-out error:", error);
//     throw error;
//   }
// };

// export const getLogbooks = async (userId: string): Promise<Logbook[]> => {
//   try {
//     const response = await fetch(
//       `${rLoogBookUrl}/LogBooks/GetLogBooks/${userId}`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "text/plain",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch logbooks");
//     }

//     const data = await response.json();
//     console.log("get logbooks data: ", data);
//     return data.data;
//   } catch (error) {
//     console.error("Error fetching logbooks:", error);
//     throw error;
//   }
// };
