"use client";
import { useState } from "react";

export function Assistant() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("/api/ai", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }) 
      });
      const data = await res.json();
      if (data.error) {
        setAnswer(`Error: ${data.error}`);
      } else {
        setAnswer(data.text || "No response generated");
      }
    } catch (error) {
      setAnswer(`Network error: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-200 p-6">
      <h3 className="font-semibold">AI Assistant</h3>
      <p className="text-sm text-neutral-600">Generate taglines, summaries, and content ideas.</p>
      <div className="mt-4 flex gap-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask for a headline about your feature"
          className="flex-1 rounded-xl border border-neutral-200 px-4 h-11 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
        />
        <button onClick={submit} disabled={loading} className="h-11 px-5 rounded-xl bg-neutral-900 text-white">
          {loading ? "Thinking..." : "Generate"}
        </button>
      </div>
      {answer && <div className="mt-4 text-sm text-neutral-800">{answer}</div>}
    </div>
  );
}


