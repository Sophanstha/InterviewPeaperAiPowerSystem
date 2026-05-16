import { GoogleGenAI } from "@google/genai";
import z from "zod";
import dotenv from "dotenv";
import puppeteer from "puppeteer";
dotenv.config();
const ai = new GoogleGenAI({
  apiKey: process.env.AI_API_KEY,
});

export const interviewReportSchema = z.object({
  score: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "An overall resume-to-job match score from 0 to 100. Evaluate how well the candidate's skills, experience, projects, education, and technologies align with the provided job description. Consider technical expertise, years of experience, relevant tools, problem-solving ability, and domain knowledge. A higher score indicates a stronger fit for the target role.",
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "A realistic, role-specific technical interview question based on the candidate's resume, projects, and the technologies mentioned in the job description. Questions should reflect real interview scenarios commonly asked by companies.",
          ),

        answer: z
          .string()
          .describe(
            "A detailed, professional, and technically accurate sample answer to the interview question. The answer should demonstrate strong conceptual understanding, practical experience, clean coding practices, optimization techniques, debugging ability, scalability considerations, and real-world problem-solving skills where relevant.",
          ),

        score: z
          .number()
          .min(0)
          .max(100)
          .describe(
            "A score between 0 and 100 evaluating the quality of the technical answer. Consider technical accuracy, depth of explanation, clarity, best practices, communication skills, and practical applicability in real-world development scenarios.",
          ),
      }),
    )
    .min(5)
    .describe(
      "A list of technical interview questions, ideal answers, and evaluation scores tailored to the candidate's target role, experience level, resume projects, and required technologies.",
    ),

  behaviouralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "A professional behavioural interview question designed to assess communication, teamwork, leadership, adaptability, conflict resolution, time management, decision-making, ownership, and collaboration skills.",
          ),

        answer: z
          .string()
          .describe(
            "A well-structured behavioural interview answer written in a professional tone using the STAR method (Situation, Task, Action, Result) whenever possible. The answer should demonstrate confidence, accountability, teamwork, problem-solving ability, and measurable outcomes from real or realistic experiences.",
          ),

        score: z
          .number()
          .min(0)
          .max(100)
          .describe(
            "A score between 0 and 100 measuring the effectiveness of the behavioural answer. Evaluate communication clarity, relevance, confidence, emotional intelligence, leadership qualities, and the ability to handle workplace situations professionally.",
          ),
      }),
    )
    .min(3)
    .describe(
      "A collection of behavioural interview questions with strong sample answers and evaluation scores intended to assess the candidate's soft skills, workplace behaviour, communication style, and interpersonal effectiveness.",
    ),

  skillGap: z
    .array(
      z.object({
        skill: z
          .string()
          .describe(
            "The name of a missing, weak, or insufficiently demonstrated skill, technology, framework, tool, or concept that is important for the target role but not adequately shown in the candidate's resume or experience.",
          ),

        severity: z
          .enum(["high", "medium", "low"])
          .describe(
            "The importance level of the identified skill gap. Use 'high' for critical missing skills required for the role, 'medium' for important but learnable skills, and 'low' for optional or secondary improvements.",
          ),
      }),
    )
    .min(3)
    .describe(
      "A list of missing or underdeveloped skills identified by comparing the candidate's resume against the job description, including the importance level of each skill gap.",
    ),
  jobTitle: z
    .string()
    .describe(
      "The specific job title the candidate is applying for, such as 'Frontend Developer', 'Backend Engineer', 'Full Stack Developer', 'Data Scientist', etc. This helps tailor the interview questions, skill gap analysis, and preparation plan to the requirements of that particular role.",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe(
            "The day number in the personalized interview preparation roadmap.",
          ),

        focus: z
          .string()
          .describe(
            "The primary learning objective or focus area for the day, such as Data Structures & Algorithms, React, System Design, Backend Development, Database Optimization, Behavioural Preparation, or Mock Interviews.",
          ),

        tasks: z
          .array(z.string())
          .describe(
            "A detailed list of actionable learning tasks, coding exercises, revision topics, project improvements, interview practice activities, mock interviews, or study goals that the candidate should complete during the day.",
          ),
      }),
    )
    .min(3)
    .describe(
      "A structured day-by-day interview preparation roadmap designed to improve the candidate's technical skills, interview confidence, communication ability, and overall readiness for the target role.",
    ),
});

export const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}: {
  resume: string;
  selfDescription: string;
  jobDescription: string;
}) => {
  const prompt = `
You are an expert senior technical interviewer, hiring manager, and AI-powered interview preparation system.

Your task is to generate a COMPLETE personalized interview preparation report for a candidate.

You MUST deeply analyze:
1. Resume
2. Self Description
3. Job Description
4. Candidate experience level
5. Projects
6. Technologies
7. Generated job title

━━━━━━━━━━━━━━━━━━━━
PRIMARY OBJECTIVE
━━━━━━━━━━━━━━━━━━━━

The generated interview preparation report MUST feel:
- realistic
- personalized
- professional
- interview-ready
- company-level quality

The generated questions MUST be highly tailored to:
- resume projects
- technologies used
- candidate experience
- target job description
- generated job title

Questions MUST NOT feel generic.

━━━━━━━━━━━━━━━━━━━━
STRICT OUTPUT RULES
━━━━━━━━━━━━━━━━━━━━

- Return ONLY valid JSON
- DO NOT return markdown
- DO NOT return explanations
- DO NOT return comments
- DO NOT return extra text
- DO NOT wrap JSON in code blocks
- NEVER return null
- NEVER return undefined
- NEVER skip fields
- NEVER return empty arrays
- NEVER use placeholders
- Every array item MUST contain complete valid objects

━━━━━━━━━━━━━━━━━━━━
REQUIRED OUTPUT STRUCTURE
━━━━━━━━━━━━━━━━━━━━

{
  "jobTitle": string,

  "score": number,

  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string,
      "score": number
    }
  ],

  "behaviouralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string,
      "score": number
    }
  ],

  "skillGap": [
    {
      "skill": string,
      "severity": "high" | "medium" | "low"
    }
  ],

  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": string[]
    }
  ]
}

━━━━━━━━━━━━━━━━━━━━
JOB TITLE RULES
━━━━━━━━━━━━━━━━━━━━

- Generate a professional job title based on:
  - candidate skills
  - projects
  - experience
  - target job description

Examples:
- "Frontend React Developer"
- "Full Stack MERN Engineer"
- "Software Engineer"
- "React Frontend Developer"
- "Node.js Backend Developer"

━━━━━━━━━━━━━━━━━━━━
SCORE RULES
━━━━━━━━━━━━━━━━━━━━

- score MUST be between 0 and 100
- score MUST represent:
  - candidate suitability
  - technical alignment
  - project relevance
  - skill match with target role

━━━━━━━━━━━━━━━━━━━━
TECHNICAL QUESTIONS RULES
━━━━━━━━━━━━━━━━━━━━

- Generate AT LEAST 5 technical questions
- Questions MUST be advanced and realistic
- Questions MUST directly relate to:
  - technologies in resume
  - projects in resume
  - responsibilities in job description
  - generated job title

- Questions MUST test:
  - React
  - JavaScript
  - TypeScript
  - Node.js
  - Express.js
  - MongoDB
  - APIs
  - Authentication
  - Performance optimization
  - State management
  - Scalability
  - Architecture
  - Security
  - Debugging
  - Coding logic
  - System design

- Questions MUST resemble:
  - FAANG interviews
  - startup interviews
  - senior frontend/backend interviews

- DO NOT generate beginner questions
- DO NOT generate unrelated questions
- DO NOT repeat concepts
- DO NOT generate filler content

Each technical question MUST contain:
{
  "question": string,
  "intention": string,
  "answer": string,
  "score": number
}

Technical question intention MUST explain:
- what the interviewer is testing
- why the question matters
- which skills are being evaluated

Technical answers MUST:
- be detailed
- be technically accurate
- explain reasoning
- mention tradeoffs
- mention best practices
- include practical implementation details
- match the candidate experience level

━━━━━━━━━━━━━━━━━━━━
BEHAVIOURAL QUESTIONS RULES
━━━━━━━━━━━━━━━━━━━━

- Generate AT LEAST 5 behavioural questions
- Questions MUST be based on:
  - internship experience
  - teamwork
  - project collaboration
  - ownership
  - communication
  - adaptability
  - leadership potential
  - pressure handling

- Questions MUST feel realistic
- Questions MUST NOT be generic HR questions

Each behavioural question MUST contain:
{
  "question": string,
  "intention": string,
  "answer": string,
  "score": number
}

Behavioural intention MUST explain:
- what personality trait is being evaluated
- what soft skill is being tested
- why interviewers ask this question

Behavioural answers MUST:
- use STAR method naturally
- feel realistic
- feel professional
- contain clear actions and outcomes
- demonstrate communication and ownership

━━━━━━━━━━━━━━━━━━━━
SKILL GAP RULES
━━━━━━━━━━━━━━━━━━━━

- Generate AT LEAST 3 realistic skill gaps
- Compare:
  - resume skills
  - required job skills

severity MUST ONLY be:
- "high"
- "medium"
- "low"

━━━━━━━━━━━━━━━━━━━━
PREPARATION PLAN RULES
━━━━━━━━━━━━━━━━━━━━

- Generate EXACTLY 7 preparation days
- day MUST be numeric only (1–7)
- focus MUST be concise
- tasks MUST be non-empty arrays

The plan MUST:
- prioritize weak areas
- prioritize interview-critical topics
- align with skill gaps
- align with target role
- include practical interview preparation

━━━━━━━━━━━━━━━━━━━━
IMPORTANT PERSONALIZATION RULES
━━━━━━━━━━━━━━━━━━━━

- Questions MUST reference actual projects when possible
- If resume mentions MERN:
  generate MERN-focused questions
- If resume mentions React:
  generate advanced React questions
- If resume mentions Socket.io:
  generate realtime communication questions
- If job description mentions performance:
  generate optimization questions
- If job description mentions APIs:
  generate API integration questions
- If job description mentions scalability:
  generate architecture/system design questions

━━━━━━━━━━━━━━━━━━━━
QUALITY RULES
━━━━━━━━━━━━━━━━━━━━

- Avoid shallow answers
- Avoid repetitive wording
- Avoid generic AI-style writing
- Make the report feel human and professional
- Make answers realistic for actual interviews

━━━━━━━━━━━━━━━━━━━━
INPUT DATA
━━━━━━━━━━━━━━━━━━━━

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 }, // disable thinking for speed
      },
    });
    // console.log(response.text as string)

    return JSON.parse(response.text as string);
  } catch (error) {
    console.error("[generateInterviewReport] Failed:", error);
    throw error;
  }
};

const generatePDFformat = async (htmlcontent: string) => { 
  const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
  const page = await browser.newPage();
  await page.setContent
  (htmlcontent, { waitUntil: "networkidle0" as any});
  const pdfBuffer = await page.pdf({ format: "A4",
  margin: {
      top: "20px",
      right: "20px",
      bottom: "20px",
      left: "20px",
    },

  });
  await browser.close();
  return pdfBuffer;
};

export const generateResumePdf = async ({
  resume,
  selfDescription,
  jobDescription,
}: {
  resume: string;
  selfDescription: string;
  jobDescription: string;
}) => {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The HTML content of the resume which can be converted to PDF using any library like puppeteer",
      ),
  });

  const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 }, // disable thinking for speed
      },
    });
   const jsonContent = JSON.parse(response.text as string);
    const PdfBuffer = await generatePDFformat(jsonContent.html); 
    return PdfBuffer;
  } catch (error) {
    console.error("[generateInterviewReport] Failed:", error);
    throw error;
  }
};
