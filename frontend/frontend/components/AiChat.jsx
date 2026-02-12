import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Send,
  User,
  Bot,
  Heart,
  HandHelping,
  MoreVertical,
  Minus,
  Brain,
  BrainCircuit,
} from "lucide-react";

const AiChat = () => {
  const [isActive, setIsActive] = useState(false); // 🔥 NEW STATE
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I'm your Chiktsak AI.\n\nAre you looking for support as a patient, or would you like to contribute your skills as a volunteer?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState("general");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post("https://helthcare-1-30uf.onrender.com/api/chat", {
        message: input,
      });

      const aiResponse = {
        id: Date.now() + 1,
        role: "assistant",
        content: res.data.reply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "assistant",
          content: "⚠️ Something went wrong.\nPlease try again.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  useEffect(() => {
    const openHandler = () => setIsActive(true);
    window.addEventListener("open-chikitsak-ai", openHandler);

    return () => {
      window.removeEventListener("open-chikitsak-ai", openHandler);
    };
  }, []);

  return (
    <>
      {/* 🔵 Floating AI Button (Inactive State) */}
      {!isActive && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            onClick={() => setIsActive(true)}
            className="w-16 h-16 bg-gradient-to-r from-green-950 to-purple-600  rounded-full flex items-center justify-center text-white shadow-2xl cursor-pointer hover:scale-110 transition-all duration-300 animate-bounce"
          >
            <Brain size={28} />
          </div>
        </div>
      )}

      {/* 💬 Chat Console */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          isActive
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="w-[380px] h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                <Brain size={20} />
              </div>
              <h1 className="font-semibold text-slate-800">Chikitsak AI</h1>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              {/* 🔥 Minimize Button */}
              <button
                onClick={() => setIsActive(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <Minus size={18} />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl text-sm shadow ${
                    msg.role === "user"
                      ? "bg-slate-800 text-white"
                      : "bg-white border border-slate-200"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="text-xs font-bold text-indigo-500 mb-2 uppercase">
                      AI Response
                    </div>
                  )}

                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>

                  <div className="text-[10px] text-slate-400 mt-2 text-right">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="text-sm text-slate-400 animate-pulse">
                AI is thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="w-full bg-slate-100 rounded-full py-3 pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:bg-slate-300 transition"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiChat;
