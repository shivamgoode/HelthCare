import React, { useState } from "react";
import axios from "axios";

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
        "http://localhost:5001/api/support",
        support
      );

      setResponse(res.data.aiSummary); // ✅ Make sure this matches backend
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative bg-black flex flex-col md:flex-row justify-center px-4 py-20 gap-20">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none size-140 bg-green-500/35 rounded-full blur-[200px]"></div>

        <div className="w-full max-w-lg max-md:mx-auto backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <form className="space-y-6" onSubmit={submitSupport}>
            <input
              type="text"
              required
              placeholder="Full Name"
              value={support.name}
              onChange={(e) =>
                setSupport({ ...support, name: e.target.value })
              }
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-green-600 transition"
            />

            <input
              type="email"
              required
              placeholder="Email"
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
              className="w-full bg-gradient-to-r from-green-950 to-green-600 hover:from-green-600 hover:to-green-950 text-white text-sm py-3 rounded-full transition duration-300 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </section>

      {/* ✅ AI RESPONSE BOX WITH CLOSE BUTTON */}
      {response && (
        <div className="relative w-full max-w-2xl mx-auto mt-8 bg-white/5 backdrop-blur border border-green-500/30 rounded-xl p-6 text-white shadow-lg">
          
          {/* ❌ Close Button */}
          <button
            onClick={() => setResponse("")}
            className="absolute top-3 right-4 text-gray-300 hover:text-red-400 text-lg font-bold transition"
          >
            ✕
          </button>

          <h3 className="text-green-400 font-semibold mb-3">
            AI Health Summary
          </h3>

          <div className="leading-relaxed text-sm whitespace-pre-line">
            {response}
          </div>
        </div>
      )}
    </>
  );
}
