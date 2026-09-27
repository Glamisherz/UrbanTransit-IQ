import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bot, Send, Radio, Sparkles, X, Loader2, Key } from "lucide-react";

const OPENAI_MODEL = "gpt-4o-mini";

const AICopilot = ({
  setStatusFilter = () => {},
  setActiveTab = () => {},
  setSearchQuery = () => {},
  currentUser = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");

  // `.env` file se API key padhna (Vite aur Create React App dono support karta hai)
  const envApiKey =
    import.meta.env?.VITE_OPENAI_API_KEY ||
    process.env?.REACT_APP_OPENAI_API_KEY ||
    "";

  const [apiKey, setApiKey] = useState(envApiKey);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll on new message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! Main UrbanTransit AI Copilot hoon.\n\nAap mujhse kisi bhi zabaan me sawal pooch sakte hain, dashboard features samajh sakte hain ya transit operations control kar sakte hain!",
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isOpen]);

  const SYSTEM_PROMPT = `
You are UrbanTransit IQ AI Copilot, an intelligent operational assistant for the Karachi Public Transport dashboard.
You MUST respond dynamically and naturally in whatever language the user talks (English, Urdu, Roman Urdu, Sindhi, Hindi, etc.).
Help users understand Karachi transit analytics, passenger volume, bottlenecks, and dashboard actions.
Dashboard controls you can trigger: "Show bottlenecks", "Simulate buses", "Open Audit Logs".
`;

  const handleSendMessage = async (text) => {
    if (!text || !text.trim()) return;

    const userMsg = { sender: "user", text };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsLoading(true);

    const lower = text.toLowerCase();

    // Dashboard UI Controls Triggering
    if (lower.includes("bottleneck") || lower.includes("congest")) {
      setStatusFilter("BOTTLENECK");
      setActiveTab("passenger_flow");
    } else if (lower.includes("overcrowd") || lower.includes("rush")) {
      setStatusFilter("OVERCROWDED");
      setActiveTab("passenger_flow");
    } else if (lower.includes("simulate") || lower.includes("what if")) {
      setActiveTab("what_if");
    } else if (lower.includes("audit") || lower.includes("accuracy")) {
      setActiveTab("audit_logs");
    }

    // Checking if API key exists
    if (!apiKey || apiKey.trim() === "") {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ **API Key Missing!**\n`.env` file me `VITE_OPENAI_API_KEY` set nahi hai ya key missing hai. Aap top-right par 🔑 icon par click karke bhi manually key paste kar sakte hain.",
        },
      ]);
      setIsLoading(false);
      return;
    }

    // OpenAI API Call
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: OPENAI_MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...chatMessages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: text },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey.trim()}`,
          },
        },
      );

      const aiReply = response.data.choices[0]?.message?.content;
      setChatMessages((prev) => [...prev, { sender: "bot", text: aiReply }]);
    } catch (error) {
      console.error("OpenAI Error:", error);
      const errorMessage =
        error.response?.data?.error?.message || error.message;
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `❌ **OpenAI API Error:**\n\n${errorMessage}\n\nKripya check karein ki `
            .env` me API key sahi hai aur credits available hain.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 font-sans max-w-[calc(100vw-24px)]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 hover:from-indigo-500 hover:to-violet-500 text-white px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 sm:gap-3 border border-indigo-400/30 transition-all hover:scale-105 cursor-pointer group"
        >
          <div className="p-1.5 sm:p-2 bg-white/10 rounded-xl group-hover:rotate-12 transition-transform">
            <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-300" />
          </div>
          <div className="text-left">
            <div className="text-xs font-extrabold tracking-wide flex items-center gap-1">
              AI Copilot <Sparkles className="h-3 w-3 text-amber-300" />
            </div>
            <div className="text-[9px] sm:text-[10px] text-indigo-200 font-mono">
              Live GPT Engine
            </div>
          </div>
        </button>
      ) : (
        /* Fully Responsive Drawer Box */
        <div className="w-[calc(100vw-24px)] sm:w-[390px] md:w-[420px] h-[82vh] sm:h-[520px] max-h-[600px] bg-slate-950/95 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden transition-all duration-300">
          {/* HEADER */}
          <div className="p-3.5 sm:p-4 bg-slate-900/90 border-b border-slate-800/80 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl text-indigo-400">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
                  UrbanTransit Copilot
                  <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-mono">
                    GPT-4o
                  </span>
                </h4>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                  <Radio className="h-2.5 w-2.5 animate-pulse" /> Connected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowKeyInput(!showKeyInput)}
                className="text-slate-400 hover:text-amber-300 p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                title="Configure / View API Key"
              >
                <Key className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* MANUAL KEY INPUT DRAWER */}
          {showKeyInput && (
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center gap-2 shrink-0">
              <input
                type="password"
                placeholder="Paste API Key (sk-...)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
              <button
                onClick={() => setShowKeyInput(false)}
                className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-1.5 rounded-xl font-bold cursor-pointer"
              >
                Save
              </button>
            </div>
          )}

          {/* CHAT MESSAGES AREA */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 text-xs">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[88%] p-3 sm:p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-xs shadow-lg shadow-indigo-600/20 font-medium"
                      : "bg-slate-900/90 text-slate-200 border border-slate-800/80 rounded-bl-xs text-[11px] sm:text-xs whitespace-pre-line shadow-inner"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 text-indigo-400 flex items-center gap-2 text-xs font-mono">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Processing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(chatInput);
            }}
            className="p-2.5 sm:p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask Copilot anything..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 sm:p-2.5 rounded-xl shadow-md cursor-pointer disabled:opacity-50 shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AICopilot;
