import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.middleware";
import { upload } from "../middleware/file.middleware";
import { generateInterviewReportController, getInterviewResportById,  getUserReports,generateResume } from "../controller/interviewreport.controller";

const Interviewrouter = Router()
Interviewrouter.route("/").post(authMiddleware,upload.single("resume"),generateInterviewReportController)
Interviewrouter.route("/generatePdf/:id").get(authMiddleware,generateResume)
Interviewrouter.route("/getUserReport").get(
  authMiddleware,
  getUserReports
);

Interviewrouter.route("/:id").get(
  authMiddleware,
  getInterviewResportById
);

export default Interviewrouter;