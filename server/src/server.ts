import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDb } from "./config/connectDb.ts";
import authRoute from "./route/auth.router.ts";
// import { generateInterviewReport } from "./services/ai.service.ts";
import Interviewrouter from "./route/interview.route.ts";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDb()
  .then(() => {
    console.log(" Database connected");
  })
  .catch((error) => {
    console.error(" Database connection failed:", error);
    process.exit(1);
  });

app.use("/api/auth", authRoute);
app.use("/api/interview",Interviewrouter)
// // test
// generateInterviewReport({
//   resume: `
//     John Doe
//     Email: johndoe@gmail.com | Phone: +1-234-567-8901

//     Skills: JavaScript, TypeScript, React, Node.js, Express, MongoDB, REST APIs, Git

//     Experience:
//     Junior Frontend Developer - TechCorp (2022 - 2024)
//     - Built responsive UIs using React and TypeScript
//     - Integrated REST APIs with Axios
//     - Worked in agile team of 5 developers

//     Education:
//     Bachelor of Computer Science - XYZ University (2018 - 2022)

//     Projects:
//     - E-commerce website using React, Node.js, MongoDB
//     - Weather app using OpenWeather API and React
//   `,

//   selfDescription: `
//     I am a passionate frontend developer with 2 years of experience building web applications.
//     I enjoy solving problems and learning new technologies. I am a team player and good communicator.
//     Currently looking for a full-stack or frontend role where I can grow my skills further.
//   `,

//   jobDescription: `
//     We are hiring a Full Stack Developer with the following requirements:
//     - 2+ years of experience with React and Node.js
//     - Strong knowledge of TypeScript
//     - Experience with MongoDB and REST API development
//     - Familiarity with Docker and AWS is a plus
//     - Good communication and teamwork skills
//     - Experience with Git and agile development
//   `,
// });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Server running on port: ${PORT}`);
});

export default app;