import { rCourseUrl } from "@/app/lib/endpoints";
import {
  TopicElement,
  TopicElementResponse,
} from "@/interfaces/pharaphase/paraphase-d";

export const fetchTopicElements = async (
  topicId: string
): Promise<TopicElement[]> => {
  try {
    const response = await fetch(
      `${rCourseUrl}/TopicElements/GetTopicElements/${topicId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch topic elements.");
    }

    const responseData: TopicElementResponse = await response.json();

    if (responseData.error) {
      throw new Error(
        responseData.message || "Failed to fetch topic elements."
      );
    }

    return responseData.data;
  } catch (error) {
    console.error("Error fetching topic elements: ", error);
    throw error;
  }
};
