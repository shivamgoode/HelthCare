import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Formfill() {
  const [support, setSupport] = useState({
    name: "",
    email: "",
    issue: "",
    urgency: "Low",
  });

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const submitSupport = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://helthcare-1-30uf.onrender.com/api/support",
        support,
      );
      setResponse(res.data.aiSummary);
    } catch (error) {
      console.error(error);
      setResponse(
        "⚠️ Something went wrong while processing your request.\nPlease try again.",
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

      <section className="relative bg-black flex flex-col md:flex-row justify-center px-4 py-20 gap-20">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none size-140 bg-green-500/35 rounded-full blur-[200px]"></div>

        <div className="text-center md:text-left mt-12">
          <h1 className="font-medium text-3xl md:text-5xl/15 bg-linear-to-r from-white to-green-300 bg-clip-text text-transparent max-w-[470px] mt-4">
            Connect with us to make yourself healthy
          </h1>
          <p className="text-sm/6 text-white max-w-[345px] mt-4 mx-auto md:mx-0">
            Be healthy be fit.
          </p>
        </div>

        <div className="w-full max-w-lg max-md:mx-auto backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <form className="space-y-6" onSubmit={submitSupport}>
            <input
              type="text"
              required
              placeholder="Eden Johnson"
              value={support.name}
              onChange={(e) => setSupport({ ...support, name: e.target.value })}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-green-600 transition"
            />

            <input
              type="email"
              required
              placeholder="Eden@example.com"
              value={support.email}
              onChange={(e) =>
                setSupport({ ...support, email: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-green-600 transition"
            />

            <textarea
              rows="4"
              required
              placeholder="Write your issue here..."
              value={support.issue}
              onChange={(e) =>
                setSupport({ ...support, issue: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-green-600 transition resize-none"
            ></textarea>

            <div className="flex items-center gap-4">
              <select
                value={support.urgency}
                onChange={(e) =>
                  setSupport({ ...support, urgency: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-600 transition"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-950 to-green-600 hover:from-green-600 hover:to-green-950 text-white text-sm px-8 py-3 rounded-full transition duration-300 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ✅ Styled AI Response */}
      {response && (
        <div className="max-w-3xl mx-auto mt-10 p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100 shadow-xl text-slate-700">
          <div className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-4">
            AI Health Summary
          </div>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => (
                <h1
                  className="text-xl font-bold text-green-700 mb-4"
                  {...props}
                />
              ),
              h2: ({ ...props }) => (
                <h2
                  className="text-lg font-semibold text-green-600 mb-3"
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
