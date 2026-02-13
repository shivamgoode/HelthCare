import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function VolentierForm() {
  const [volunteer, setVolunteer] = useState({});
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const registerVolunteer = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://helthcare-1-30uf.onrender.com/api/volunteer",
        volunteer
      );
      setResponse(res.data.aiEvaluation);
    } catch (error) {
      console.error(error);
      setResponse(
        "⚠️ Something went wrong while processing your registration.\nPlease try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
        * {
          font-family: "Poppins", sans-serif;
        }
      `}</style>

      <section className="relative bg-black flex flex-col md:flex-row justify-center px-4 py-20 gap-20 m-[10px]">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none size-140 bg-purple-500/35 rounded-full blur-[200px]"></div>

        <div className="text-center md:text-left mt-12">
          <h1 className="font-medium text-3xl md:text-5xl/15 bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent max-w-[470px] mt-4">
            Register yourself as Volunteer
          </h1>
          <p className="text-sm/6 text-white max-w-[345px] mt-4 mx-auto md:mx-0">
            Serve the human.
          </p>
        </div>

        <div className="w-full max-w-lg max-md:mx-auto backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <form className="space-y-6" onSubmit={registerVolunteer}>
            <input
              type="text"
              required
              placeholder="Full Name"
              onChange={(e) =>
                setVolunteer({ ...volunteer, fullName: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-600 transition"
            />

            <input
              type="email"
              required
              placeholder="Email"
              onChange={(e) =>
                setVolunteer({ ...volunteer, email: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-600 transition"
            />

            <input
              type="text"
              required
              placeholder="Phone"
              onChange={(e) =>
                setVolunteer({ ...volunteer, phone: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-600 transition"
            />

            <input
              type="text"
              required
              placeholder="Skills"
              onChange={(e) =>
                setVolunteer({ ...volunteer, skills: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-600 transition"
            />

            <input
              type="text"
              required
              placeholder="Availability"
              onChange={(e) =>
                setVolunteer({ ...volunteer, availability: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-600 transition"
            />

            <input
              type="text"
              required
              placeholder="Location"
              onChange={(e) =>
                setVolunteer({ ...volunteer, location: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-600 transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-950 to-purple-600 hover:from-purple-600 hover:to-green-950 text-white text-sm py-3 rounded-full transition duration-300 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register Volunteer"}
            </button>
          </form>
        </div>
      </section>

      {/* ✅ Styled AI Response with Close Button */}
      {response && (
        <div className="relative max-w-3xl mx-auto mt-10 p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 shadow-xl text-slate-700">

          {/* ❌ Close Button */}
          <button
            onClick={() => setResponse("")}
            className="absolute top-4 right-5 text-gray-400 hover:text-red-500 text-xl font-bold transition"
          >
            ✕
          </button>

          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-4">
            AI Evaluation
          </div>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => (
                <h1
                  className="text-xl font-bold text-indigo-700 mb-4"
                  {...props}
                />
              ),
              h2: ({ ...props }) => (
                <h2
                  className="text-lg font-semibold text-indigo-600 mb-3"
                  {...props}
                />
              ),
              p: ({ ...props }) => (
                <p className="mb-3 leading-relaxed" {...props} />
              ),
              li: ({ ...props }) => (
                <li className="ml-5 list-disc mb-1" {...props} />
              ),
              strong: ({ ...props }) => (
                <strong className="font-semibold text-slate-900" {...props} />
              ),
            }}
          >
            {response}
          </ReactMarkdown>
        </div>
      )}
    </>
  );
}
