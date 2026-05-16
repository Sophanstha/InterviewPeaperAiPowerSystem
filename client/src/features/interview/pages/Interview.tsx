import React, { useEffect, useState } from "react";
import {
  FiCode,
  FiMessageSquare,
  FiSend,
  FiDownload,
  FiChevronDown,
} from "react-icons/fi";
import { useInterviewHook } from "../hooks/UseInterviewhook";
import { useParams } from "react-router-dom";
import { getUserReport } from "../api/interviewApi";
import LoadingScreen from "../../../components/Loading";
import { RiGeminiFill } from "react-icons/ri";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: <FiCode />,
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: <FiMessageSquare />,
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: <FiSend />,
  },
];

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#111827] w-full h-100vh  border border-white/10 rounded-2xl overflow-hidden">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-4 p-5 cursor-pointer hover:bg-white/5 transition"
      >
        <span className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-sm font-bold">
          Q{index + 1}
        </span>

        <p className="flex-1 text-white font-medium">{item.question}</p>

        <FiChevronDown
          className={`text-gray-400 transition duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <div className="px-5 pb-5 space-y-5">
          <div>
            <span className="inline-block text-xs font-semibold bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full mb-2">
              Intention
            </span>

            <p className="text-gray-300 text-sm leading-relaxed">
              {item.intention}
            </p>
          </div>

          <div>
            <span className="inline-block text-xs font-semibold bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full mb-2">
              Model Answer
            </span>

            <p className="text-gray-300 text-sm leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="bg-[#111827] border border-white/10 rounded-2xl p-5">
    <div className="flex items-center gap-4 mb-4">
      <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs font-semibold">
        Day {day.day}
      </span>

      <h3 className="text-white font-semibold text-lg">{day.focus}</h3>
    </div>

    <ul className="space-y-3">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex items-center gap-3 text-gray-300">
          <span className="w-2 h-2 rounded-full bg-pink-500" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);
type ParamsType = {
  id: string;
};

const Interview = () => {
  const { report, loading, getReport,getReumePdf } = useInterviewHook();
  const [activeNav, setActiveNav] = useState("technical");
  // console.log(report?.behavioursQuestion)
  const { id } = useParams<ParamsType>();

  useEffect(() => {
    if (!id) {
      return;
    }
    getReport(id);
  }, [id]);
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0b1220] border border-white/10 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_320px]">
            {/* LEFT SIDEBAR */}
            <aside className="p-6 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="sticky top-6">
                <p className="text-gray-500 text-sm uppercase tracking-wider mb-6">
                  Sections
                </p>

                <div className="space-y-3">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveNav(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                        activeNav === item.id
                          ? "bg-pink-500 text-white"
                          : "bg-white/5 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>

                      <span className="font-medium text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>

                <button
                onClick={()=>getReumePdf(id as string)}
                className="w-full mt-8 bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 transition rounded-2xl py-4 font-semibold flex items-center justify-center gap-3">
                  <RiGeminiFill />
                  Download Resume
                </button>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="p-6 md:p-8">
              {activeNav === "technical" && (
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Technical Questions</h2>

                    <span className="text-sm text-gray-400">
                      {report?.technicalQuestions.length} questions
                    </span>
                  </div>

                  <div className="space-y-5">
                    {report?.technicalQuestions.map((q, i) => (
                      <QuestionCard key={i} item={q} index={i} />
                    ))}
                  </div>
                </section>
              )}

              {activeNav === "behavioral" && (
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Behavioral Questions</h2>

                    <span className="text-sm text-gray-400">
                      {report?.behaviouralQuestions.length} questions
                    </span>
                  </div>

                  <div className="space-y-5">
                    {report?.behaviouralQuestions.map((q, i) => (
                      <QuestionCard key={i} item={q} index={i} />
                    ))}
                  </div>
                </section>
              )}

              {activeNav === "roadmap" && (
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Preparation Road Map</h2>

                    <span className="text-sm text-gray-400">
                      {report?.preparationPlan.length}-day plan
                    </span>
                  </div>

                  <div className="space-y-5">
                    {report?.preparationPlan.map((day) => (
                      <RoadMapDay key={day.day} day={day} />
                    ))}
                  </div>
                </section>
              )}
            </main>

            {/* RIGHT SIDEBAR */}
            <aside className="p-6 border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="sticky top-6">
                {/* MATCH SCORE */}
                <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 text-center">
                  <p className="text-gray-400 text-sm mb-5">Match Score</p>

                  <div className="w-36 h-36 mx-auto rounded-full border-[10px] border-pink-500 flex items-center justify-center">
                    <div>
                      <span className="text-4xl font-bold">
                        {report?.score}
                      </span>

                      <span className="text-pink-400 text-xl">%</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mt-5">
                    Strong match for this role
                  </p>
                </div>

                {/* SKILL GAPS */}
                <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 mt-6">
                  <h3 className="text-lg font-semibold mb-5">Skill Gaps</h3>

                  <div className="flex flex-wrap gap-3">
                    {report?.skillGap.map((gap, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          gap.severity === "high"
                            ? "bg-red-500/20 text-red-400"
                            : gap.severity === "medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {gap.skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
