import mongoose, { Schema } from "mongoose";
import type {
  IbehavioursQuestion,
  IinterviewReport,
  Iperpationplan,
  IskillGap,
  ItechicalQuestion,
} from "../types/type";

const technicalQuestionSchema = new Schema<ItechicalQuestion>(
  {
    question: {
      type: String,
      required: true,
    },
    intention: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const behaviorQuestionSchema = new Schema<IbehavioursQuestion>(
  {
    question: {
      type: String,
      required: true,
    },
    intention: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new Schema<IskillGap>(
  {
    skill: String,
    severity: {
      type: String,
      enum: ["high", "medium", "low"],
    },
  },
  {
    _id: false,
  },
);

const preparationPlanSchema = new Schema<Iperpationplan>(
  {
    day: {
      type: Number,
      required: true,
    },
    focus: {
      type: String,
      required: true,
    },
    tasks: {
      type: [String],
      required: true,
    },
  },
  {
    _id: false,
  },
);

const interviewReportSchema = new Schema<IinterviewReport>({
  jobDescription: {
    type: String,
    required: true,
  },

  resume: {
    type: String,
  },

  selfDescriptiom: {
    type: String,
  },

  score: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },

  technicalQuestions: {
    type: [technicalQuestionSchema],
  },

  behaviouralQuestions: {
    type: [behaviorQuestionSchema],
  },

  skillGap: {
    type: [skillGapSchema],
  },

  preparationPlan: {
    type: [preparationPlanSchema],
  },
  user :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "user",
    required :true
  },
  jobTitle : {
    type :String,
    required : true
  }
});

const Interview = mongoose.model("Interview", interviewReportSchema);

export default Interview;
