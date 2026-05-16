import { useEffect, useRef, useState } from "react";
import { useInterviewHook } from "../hooks/UseInterviewhook";
import { useNavigate } from "react-router-dom";
import type { InterviewReportData } from "../../../type/type";
import { getUserReport } from "../api/interviewApi";
import LoadingScreen from "../../../components/Loading";
import { toast } from "sonner";

export default function Home() {
  const navigation = useNavigate();

  const { loading, generateReport ,getUserData,reports } = useInterviewHook();

  // Two-way binding states
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");

  // ✅ Correct TypeScript ref for file input
  const pdfRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    try {
      const file = pdfRef.current?.files?.[0];
      if(!file){
        return
      }

      const res: InterviewReportData = await generateReport({
        jobDescription,
        selfDescription,
        resume: file,
      });
      navigation(`/interview/${res._id}`);
    } catch (error) {
      if(error instanceof Error){
        toast.error(error.message)
      }else{
        toast.error("failed please try again")
      }
    }
  };
  useEffect(()=>{
    getUserData()
  },[])

  if(loading){
    return(
    <LoadingScreen/>
    )
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Create Your Custom{" "}
            <span className="text-pink-500">Interview Plan</span>
          </h1>

          <p className="text-gray-400 mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#0b1220] border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Section */}
            <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-5 h-5 rounded-md border border-pink-500 flex items-center justify-center text-pink-500 text-xs">
                  ▣
                </div>

                <h2 className="font-semibold text-white text-lg">
                  Target Job Description
                </h2>

                <span className="ml-auto text-[10px] tracking-wide bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full border border-pink-500/30">
                  REQUIRED
                </span>
              </div>

              {/* ✅ Two-way binding */}
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here...

e.g. ‘Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...’"
                className="w-full h-[320px] bg-[#131c31] border border-white/10 rounded-2xl p-5 text-sm text-gray-300 placeholder:text-gray-500 resize-none outline-none focus:border-pink-500 transition"
              />

              <div className="flex justify-end mt-2 text-xs text-gray-500">
                {jobDescription.length} / 5000 chars
              </div>
            </div>

            {/* Right Section */}
            <div className="p-6 md:p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-5 h-5 rounded-full border border-pink-500 flex items-center justify-center text-pink-500 text-xs">
                  ◉
                </div>

                <h2 className="font-semibold text-white text-lg">
                  Your Profile
                </h2>
              </div>

              {/* Upload Resume */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-medium text-sm md:text-base">
                    Upload Resume
                  </h3>

                  <span className="text-[10px] bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full border border-pink-500/30">
                    BEST RESULTS
                  </span>
                </div>

                <label className="border border-white/10 bg-[#131c31] rounded-2xl h-[140px] flex flex-col items-center justify-center text-center px-4 cursor-pointer hover:border-pink-500/50 transition">
                  <input
                    ref={pdfRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />

                  <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 text-2xl mb-3">
                    ⤴
                  </div>

                  <p className="text-sm text-gray-200 font-medium">
                    Click to upload or drag & drop
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    PDF or DOCX (Max 5MB)
                  </p>
                </label>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-gray-500">OR</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Self Description */}
              <div>
                <h3 className="font-medium text-sm md:text-base mb-3">
                  Quick Self-Description
                </h3>

                {/* ✅ Two-way binding */}
                <textarea
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don’t have a resume handy..."
                  className="w-full h-[120px] bg-[#131c31] border border-pink-500/40 rounded-2xl p-4 text-sm text-gray-300 placeholder:text-gray-500 resize-none outline-none focus:border-pink-500 transition"
                />
              </div>

              {/* Info Box */}
              <div className="mt-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-xs mt-0.5">
                  i
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">
                  Either a <span className="font-semibold">Resume</span> or a{" "}
                  <span className="font-semibold">Self Description</span> is
                  required to generate a personalized plan.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 px-6 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-xs md:text-sm text-gray-500 text-center md:text-left">
              AI-Powered Strategy Generation • Approx 30s
            </p>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full 
              active:scale-100
              md:w-auto bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 transition text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-pink-500/20 disabled:opacity-50"
            >
              {loading
                ? "Generating..."
                : "✦ Generate My Interview Strategy"}
            </button>
          </div>
        </div>
      {/* History */}
{
  reports.length > 0 && (
    <>
    {/* History */}
<div className="mt-10">
  <div className="flex items-center justify-between mb-5">
    <h2 className="text-2xl font-bold text-white">
      Previous Reports
    </h2>

    <span className="text-sm text-gray-400">
      {reports.length} Reports
    </span>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
    {reports.map((data, idx) => (
      <div
        key={idx}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] p-5 transition-all duration-300 hover:border-pink-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/10"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-pink-400 mb-2">
                Interview Report
              </p>

              <h3 className="text-lg font-semibold text-white leading-snug">
                {data.jobTitle}
              </h3>
            </div>

            <div className="w-14 h-14 rounded-full border-4 border-pink-500/30 flex items-center justify-center bg-pink-500/10">
              <span className="text-sm font-bold text-pink-400">
                {data.score}%
              </span>
            </div>
          </div>

          <div className="mt-5">
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                style={{ width: `${data.score}%` }}
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
              />
            </div>
          </div>

          <button
          onClick={()=>navigation(`/interview/${data._id}`)}
            className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-gray-300 transition hover:border-pink-500/40 hover:bg-pink-500/10 hover:text-white"
          >
            View Full Report
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
    </>
  )
}

        {/* Bottom Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
          <button className="hover:text-white transition">
            Privacy Policy
          </button>

          <button className="hover:text-white transition">
            Terms of Service
          </button>

          <button className="hover:text-white transition">
            Help Center
          </button>
        </div>
      </div>
    </div>
  );
}