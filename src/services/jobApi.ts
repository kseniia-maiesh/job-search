import axios from "axios";
import { JobSearchResponse } from "@/types/job";

const API_BASE_URL = "https://jsearch.p.rapidapi.com";
const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  },
});

export const jobApi = {
  searchJobs: async (
    query: string,
    page: number = 1
  ): Promise<JobSearchResponse> => {
    const response = await apiClient.get("/search", {
      params: {
        query,
        page,
        num_pages: 1,
        country: "us",
        date_posted: "all",
      },
    });
    return response.data;
  },

  getJobDetails: async (jobId: string) => {

    const decodedJobId = decodeURIComponent(jobId);

    try {
      const response = await apiClient.get("/job-details", {
        params: {
          job_id: decodedJobId,
          country: "us",
        },
      });
      console.log("Job details response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Job details API error:", error);
      throw error;
    }
  },
};
