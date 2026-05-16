import { useContext } from "react";
import { ReportContext } from "../InterviewContext";
import {
  generateInterviewReport,
  generatePdf,
  getReportById,
  getUserReport,
} from "../api/interviewApi";
import type { InterviewReportData } from "../../../type/type";
type generateReportProps = {
  jobDescription: string;
  resume: File;
  selfDescription: string;
};

export const useInterviewHook = () => {
  const context = useContext(ReportContext);

  if (!context) {
    throw new Error(
      "useInterviewContext must be used within an InterviewProvider",
    );
  }

  const { loading, report, reports, setloading, setReport, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    resume,
    selfDescription,
  }: generateReportProps): InterviewReportData => {
    setloading(true);
    try {
      const { data } = await generateInterviewReport({
        jobDescription,
        resume,
        selfDescription,
      });
      if (!data) {
        console.log("error while generationg the report ");
        throw new Error("error while generationg the report");
      }
      setReport(data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("failed to generate report please try again");
    } finally {
      setloading(false);
    }
  };

  const getReport = async (id: string) => {
    setloading(true);
    try {
      const { data } = await getReportById(id);
      if (!data) {
        console.log("error while fetching the report ");
        throw new Error("error while fetching the report");
      }
      setReport(data);
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('failed to getReport ')
    } finally {
      setloading(false);
    }
  };

  const getUserData = async () => {
    setloading(true);
    try {
      const { data } = await getUserReport();
      if (!data) {
        console.log("error while generationg the report ");
        throw new Error("error while generationg the report");
      }
      setReports(data);
    } catch (error) {
      if (error instanceof Error) {
        throw error.message
      }
      throw new Error("failed to get user data try again")
    } finally {
      setloading(false);
    }
  };

  const getReumePdf = async (id: string) => {
    setloading(true);
    try {
      const res = await generatePdf(id); // res = Blob
      const blob = new Blob([res], { type: "application/pdf" }); // ✅ no .data
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `interview_report_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // ✅ cleanup memory after click
    } catch (error) {
      if (error instanceof Error) {
        throw error.message
      }
      throw new Error("failed to generate")
    } finally {
      setloading(false);
    }
  };

  return {
    reports,
    loading,
    setloading,
    getReport,
    report,
    setReport,
    generateReport,
    getUserData,
    getReumePdf,
  };
};
