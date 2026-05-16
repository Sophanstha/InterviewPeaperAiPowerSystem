import axios from "axios";
import type { InterviewReportResponse } from "../../../type/type";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

type GenerateReportProps = {
  jobDescription: string;
  resume: File | null;
  selfDescription: string;
};

export const generateInterviewReport = async ({
  jobDescription,
  resume,
  selfDescription,
}: GenerateReportProps): Promise<InterviewReportResponse> => {
  try {
    const formData = new FormData();

    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);

    // only append if file exists
    if (resume) {
      formData.append("resume", resume);
    }

    const res = await api.post<InterviewReportResponse>(
      "/interview",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error generating interview report:",
        error.response?.data || error.message,
      );

      throw new Error(
        error.response?.data?.message || "Failed to generate interview report",
      );
    }

    throw new Error("Something went wrong");
  }
};

export const getReportById = async (
  id: string,
): Promise<InterviewReportResponse> => {
  try {
    const res = await api.get<InterviewReportResponse>(`/interview/${id}`);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching report:",
        error.response?.data || error.message,
      );

      throw new Error(
        error.response?.data?.message || "Failed to fetch report",
      );
    }

    throw new Error("Something went wrong");
  }
};

export const getUserReport = async () => {
  try {
    const res = await api.get("interview/getUserReport")
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching report:",
        error.response?.data || error.message,
      );
      console.log(error);

      throw new Error(
        error.response?.data?.message || "Failed to fetch report",
      );
    }

    throw new Error("Something went wrong");
  }
};

export const generatePdf = async (id: string) => {
  try {
    const res = await api.get(`/interview/generatePdf/${id}`, {
      responseType: "blob",
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error generating PDF:",
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.message || "Failed to generate PDF",
      );
    }
  }
};
