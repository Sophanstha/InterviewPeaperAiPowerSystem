import type { Request, Response } from "express";
import { PDFParse } from "pdf-parse";
import {
  generateInterviewReport,
  generateResumePdf,
} from "../services/ai.service";
import Interview from "../model/interview.model";

export const generateInterviewReportController = async (
  req: Request,
  res: Response,
) => {
  try {
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Parse the PDF buffer into text
    const resumeContent = await new PDFParse(
      Uint8Array.from(resumeFile.buffer),
    ).getText();
    const { jobDescription, selfDescription } = req.body;

    // Validate required body fields
    if (!jobDescription || !selfDescription) {
      return res.status(400).json({
        message: "jobDescription and selfDescription are required",
      });
    }

    // Generate AI report
    const interviewReportByAI = await generateInterviewReport({
      resume: resumeContent.text, // pass extracted text, not the whole object
      selfDescription,
      jobDescription,
    });

    // Save to DB
    const interviewReport = await Interview.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interviewReportByAI,
    });

    return res.status(201).json({
      message: "Interview report generated successfully",
      data: interviewReport,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: `Failed to generate the report: ${error.message}`,
      });
    }
  }
};

export const getInterviewResportById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const interviewReport = await Interview.findById(id).select("-__v").lean();
    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found",
      });
    }
    return res.status(200).json({
      message: "Interview report fetched successfully",
      data: interviewReport,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getUserReports = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }

    const interviewReports = await Interview.find({ user: userId })
      .select(
        "-__v -resume -jobDescription -selfDescription -skillGap -behaviouralQuestions -technicalQuestions -preparationPlan",
      )
      .lean();
    // console.log(interviewReports)

    return res.status(200).json({
      success: true,
      message: "User interview reports fetched successfully",
      data: interviewReports,
    });
  } catch (error) {
    // console.error("getUserReports error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const generateResume = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const interviewReport = await Interview.findById(id);

    if (!interviewReport) {
      return res.status(404).json({
        message: "No interview report is available",
      });
    }

    const { resume, selfDescription, jobDescription } = interviewReport;

    const pdfBuffer = await generateResumePdf({
      resume,
      jobDescription,
      selfDescription
    });
    console.log(pdfBuffer)

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${id}.pdf`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("getUserReports error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};