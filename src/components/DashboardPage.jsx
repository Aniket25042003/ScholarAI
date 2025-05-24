import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Brain,
  Zap,
  AlertCircle,
  MessageCircle,
  ClipboardCopy,
  DownloadCloud,
} from "lucide-react";

const BASE_URL = "http://localhost:8000";

async function fetchReport(topic) {
  const res = await fetch(`${BASE_URL}/api/research`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, num_papers: 3, citation_style: "APA" }),
  });
  if (!res.ok) {
    const { detail } = await res.json();
    throw new Error(detail || "Failed to fetch report");
  }
  return res.json();
}

async function postChat(question) {
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) {
    const { detail } = await res.json();
    throw new Error(detail || "Chat error");
  }
  return res.json();
}

export default function DashboardPage({ user }) {
  // Research
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reportMd, setReportMd] = useState("");
  const [error, setError] = useState("");

  // Chat
  const [chatEnabled, setChatEnabled] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  // Word count & read time
  const { wordCount, readTime } = useMemo(() => {
    if (!reportMd) return { wordCount: 0, readTime: 0 };
    const words = reportMd.trim().split(/\s+/).length;
    return { wordCount: words, readTime: Math.max(1, Math.ceil(words / 200)) };
  }, [reportMd]);

  const handleFetch = async () => {
    if (!topic.trim()) {
      setError("Please enter a research topic.");
      return;
    }
    setError("");
    setIsLoading(true);
    setReportMd("");
    setChatEnabled(false);

    try {
      const { researchReport } = await fetchReport(topic);
      setReportMd(researchReport);
      setChatEnabled(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const q = chatInput;
    setChatInput("");
    setChatLog((log) => [...log, { question: q, answer: "...thinking..." }]);
    try {
      const { reply } = await postChat(q);
      setChatLog((log) =>
        log.map((e) =>
          e.answer === "...thinking..." ? { ...e, answer: reply } : e
        )
      );
    } catch (e) {
      setChatLog((log) =>
        log.map((entry) =>
          entry.answer === "...thinking..."
            ? { ...entry, answer: `Error: ${e.message}` }
            : entry
        )
      );
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reportMd);
  };
  const handleDownload = () => {
    const blob = new Blob([reportMd], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.trim().replace(/\s+/g, "_")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full min-h-screen bg-gradient-to-r from-purple-950 via-indigo-900 to-indigo-800">
      <main className="flex-1 p-6 space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold text-violet-100 drop-shadow">
            Academic Research Dashboard
          </h1>
          {user && (
            <p className="text-violet-400">
              Welcome back, {user.displayName || user.email}!
            </p>
          )}
        </header>

        {/* 1️⃣ Enter Topic */}
        <section className="bg-indigo-950 p-6 rounded-lg shadow-lg border border-purple-900">
          <h3 className="text-xl font-semibold text-violet-100 mb-4">
            Enter Research Topic
          </h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., large language models"
              className="flex-grow p-3 rounded border border-violet-800 bg-gray-900 text-violet-100 placeholder-violet-400 focus:ring-violet-400 focus:border-violet-400"
            />
            <button
              onClick={handleFetch}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-700 to-violet-600 hover:from-violet-700 hover:to-indigo-800 text-white px-6 rounded disabled:opacity-50 flex items-center"
            >
              {isLoading ? (
                <>
                  <Zap className="animate-spin mr-2" /> Searching…
                </>
              ) : (
                <>
                  <Brain className="mr-2" /> Fetch Report
                </>
              )}
            </button>
          </div>
          {error && (
            <p className="mt-3 text-red-400 flex items-center">
              <AlertCircle className="mr-1" /> {error}
            </p>
          )}
        </section>

        {/* 2️⃣ Research Report */}
        {reportMd && (
          <section className="bg-indigo-950 p-6 rounded-lg shadow-lg space-y-4 border border-purple-900">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-violet-100">
                Research Report
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 bg-violet-800/60 text-violet-200 px-3 py-1 rounded hover:bg-violet-700"
                >
                  <ClipboardCopy size={16} />
                  <span>Copy</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-1 bg-green-900/70 text-green-200 px-3 py-1 rounded hover:bg-green-800"
                >
                  <DownloadCloud size={16} />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <p className="text-sm text-violet-400">
              {wordCount.toLocaleString()} words • {readTime} min read
            </p>

            {/* Markdown Rendering */}
            <article className="prose prose-invert prose-violet max-w-none bg-indigo-900/70 rounded p-4 text-violet-100">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {reportMd}
              </ReactMarkdown>
            </article>
          </section>
        )}

        {/* 3️⃣ Chat */}
        <section
          className={`bg-indigo-950 p-6 rounded-lg shadow-lg border border-purple-900 ${
            !chatEnabled ? "opacity-50" : ""
          }`}
        >
          <h3 className="text-xl font-semibold text-violet-100 mb-4">
            Chat with Agent
          </h3>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={!chatEnabled}
              placeholder={chatEnabled ? "Ask follow-up…" : "Fetch report first"}
              className="flex-grow p-3 rounded border border-violet-800 bg-gray-900 text-violet-100 placeholder-violet-400 focus:ring-violet-400 focus:border-violet-400"
            />
            <button
              onClick={handleChat}
              disabled={!chatEnabled || !chatInput.trim()}
              className="bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white px-6 rounded flex items-center disabled:opacity-50"
            >
              <MessageCircle className="mr-2" /> Send
            </button>
          </div>
          <div className="space-y-4 max-h-64 overflow-auto">
            {chatLog.map((entry, i) => (
              <div key={i} className="space-y-1">
                <p className="text-violet-100">
                  <strong>You:</strong> {entry.question}
                </p>
                <p className="text-violet-300 ml-4">
                  <strong>Agent:</strong> {entry.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
