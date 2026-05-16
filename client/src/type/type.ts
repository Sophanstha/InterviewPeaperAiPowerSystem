export interface User {
  _id: string;
  username?: string;
  email?: string;
  password?: string;
  createdAt?: "2026-05-08T08:30:29.098Z";
  updatedAt?: "2026-05-08T08:30:29.098Z";
}

export interface LoginResponse {
  message: string;
  user: User;
}
export interface RegisterResponse {
  message: string;
  user: User;
}
export interface GetMeResponse {
  message: string;
  user: User;
}

export interface InterviewReportResponse {
  message: string;
  data: InterviewReportData;
}

export interface InterviewReportData {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  resume: string;

  score: number;

  skillGap: SkillGap[];

  preparationPlan: PreparationPlan[];

  technicalQuestions: TechnicalQuestion[];

  behaviouralQuestions: BehaviourQuestion[];

  // __v: number;
}

export interface SkillGap {
  skill: string;
  severity: "low" | "medium" | "high";
}

export interface PreparationPlan {
  day: number;
  focus: string;
  tasks: string[];
}

export interface TechnicalQuestion {
  question: string;
  answer: string;
  score: number;
}

export interface BehaviourQuestion {
  question: string;
  answer: string;
  score: number;
}

export interface InterviewReport {
  _id: string;
  score: number;
  user: string;
  jobTitle: string;
}

export interface GetUserInterviewReportsResponse {
  success: boolean;
  message: string;
  data: InterviewReport[];
}
