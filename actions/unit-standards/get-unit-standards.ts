import { GET } from "@/app/lib/api-client";
import { rCourseUrl } from "@/app/lib/endpoints";
import {
  UnitStandardData,
  ApiResponse,
} from "@/interfaces/enrolled-unit-standards/unit-standards/unit-standards";

export const getAlltUnitStandards = async (
  courseId: string
): Promise<UnitStandardData[]> => {
  try {
    // const response = await fetch(
    //   `${rCourseUrl}/api/v1/KnowledgeModules/GetKnowledgeModules/${courseId}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //     },
    //   }
    // );

    const response = await GET(`${rCourseUrl}/api/v1/KnowledgeModules/GetKnowledgeModules/${courseId}`);
 
    const responseData= response.data;

    if (responseData.error) {
      throw new Error(
        responseData.message || "Failed to fetch unit standards."
      );
    }

    return responseData.data;
  } catch (error) {
    console.log("Error fetching unit standards: ", error);
    throw error;
  }
};
