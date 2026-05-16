import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}
export interface TokenBlackList extends Document {
  token: string;
}

export interface ItechicalQuestion extends Document {
  question: string;
  intention: string;
  answer: string;
}
export interface IbehavioursQuestion extends Document {
  question: string;
  intention: string;
  answer: string;
}
export interface IskillGap extends Document {
  skill: string;
  severity: string;
}

export interface Iperpationplan extends Document {
  day: number;
  focus: string;
  tasks: [string];
}

export interface IinterviewReport extends Document {
  jobDescription: string;
  resume: string;
  selfDescription: string;
  score: number;
  preparationPlan : [Iperpationplan],
  skillGap : [IskillGap],
  technicalQuestions : [ItechicalQuestion],
  behaviouralQuestions :[IbehavioursQuestion],
  user : mongoose.Types.ObjectId;
  jobTitle : string
}
