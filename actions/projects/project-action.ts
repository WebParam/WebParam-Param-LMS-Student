

import { GET } from "@/app/lib/api-client";
import { readUserData } from "@/app/lib/endpoints";
import { IProject } from "@/interfaces/project/project";
import axios from "axios";

export const getProjectsId = async (userId: string) => {
    try {
      // const response = await axios.get(`${readUserData}/api/v1/OrganizationProgramEnrollment/GetUserEnrolledOrganizationProgram/${userId}`);
      const response = await GET(`${readUserData}/api/v1/OrganizationProgramEnrollment/GetUserEnrolledOrganizationProgram/${userId}`);
  
      if (!response) {
        throw new Error("Failed to fetch logbooks");
      }
  
     return response;

    } catch (error) {
      console.error("Error fetching logbooks:", error);
      throw error;
    }
  };
  

  export const getProgrammeProjects = async (programmeId: string): Promise<IProject[]> => {
    try {
      // const response = await axios.get(`${readUserData}/api/v1/OrganizationProgramEnrollment/GetOrganizationProgramEnrollmentsById/${programmeId}`);
      const response = await GET(`${readUserData}/api/v1/OrganizationProgramEnrollment/GetOrganizationProgramEnrollmentsById/${programmeId}`);
  
      if (!response) {
        throw new Error("Failed to fetch logbooks");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error fetching logbooks:", error);
      throw error;
    }
  };
  