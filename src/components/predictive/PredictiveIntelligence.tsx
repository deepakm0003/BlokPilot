"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type PersonaId = "developer" | "marketer" | "buyer" | "startup";

const personas: { id: PersonaId; name: string; icon: string }[] = [
  { id: "developer", name: "Developer", icon: "💻" },
  { id: "marketer", name: "Marketer", icon: "📈" },
  { id: "buyer", name: "Buyer", icon: "🏢" },
  { id: "startup", name: "Founder", icon: "🚀" },
];

export default function PredictiveIntelligence() {
  const [input, setInput] = useState("");
  const [persona, setPersona] = useState<PersonaId>("developer");
  const [locale, setLocale] = useState("en");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const analyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      // Use existing /api/ai for a lightweight scoring prompt
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are a predictive content intelligence model. Score the content for click-through, engagement, and conversion likelihood (0-100). 
Persona: ${persona}
Locale: ${locale}
Content: """${input}"""
Return strictly valid JSON with:
{
  "overall": 0-100,
  "scores": {"ctr": 0-100, "engagement": 0-100, "conversion": 0-100},
  "persona_resonance": {"developer": 0-100, "marketer": 0-100, "buyer": 0-100, "startup": 0-100},
  "trend_alignment": "one sentence", 
  "recommendations": ["tip1","tip2","tip3"]
}`,
        }),
      });
      const data = await res.json();
      const match = (data.text || "").match(/\{[\s\S]*\}$/);
      if (match) {
        setResult(JSON.parse(match[0]));
      } else {
        // fallback heuristic
        setResult(mockScore(input, persona));
      }
    } catch {
      setResult(mockScore(input, persona));
    } finally {
      setLoading(false);
    }
  };

  const mockScore = (text: string, p: PersonaId) => {
    const base = 70 + Math.min(15, Math.floor(text.length / 60));
    const bias = p === "developer" ? 8 : p === "marketer" ? 5 : 3;
    const overall = Math.min(95, base + bias);
    return {
      overall,
      scores: { ctr: overall - 5, engagement: overall - 3, conversion: overall - 12 },
      persona_resonance: {
        developer: p === "developer" ? overall : overall - 10,
        marketer: p === "marketer" ? overall - 3 : overall - 12,
        buyer: p === "buyer" ? overall - 6 : overall - 14,
        startup: p === "startup" ? overall - 4 : overall - 11,
      },
      trend_alignment: "Matches current demand for AI + productivity; add proof of ROI.",
      recommendations: [
        "Shorten headline to under 10 words",
        "Add a concrete ROI proof point",
        "Use a benefit-led CTA (e.g., ‘Grow faster now’)",
      ],
    };
  };

  const badge = (v: number) =>
    v >= 85 ? "bg-green-100 text-green-700" : v >= 70 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700";

  return (
    <section id="predictive" className="max-w-7xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h2 className="text-3xl font-semibold mb-2">🧠 Predictive Content Intelligence</h2>
        <p className="text-neutral-600 max-w-3xl mx-auto">
          See tomorrow’s winning content today. Forecast performance before you publish—then deploy to Storyblok with confidence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste headline, body, or block copy here..." className="w-full h-36 p-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="flex gap-2">
            <select value={persona} onChange={(e) => setPersona(e.target.value as PersonaId)} className="flex-1 p-3 border border-neutral-200 rounded-lg">
              {personas.map((p) => (
                <option key={p.id} value={p.id}>{p.icon} {p.name}</option>
              ))}
            </select>
            <select value={locale} onChange={(e) => setLocale(e.target.value)} className="w-32 p-3 border border-neutral-200 rounded-lg">
              <option value="en">EN</option>
              <option value="de">DE</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
            </select>
          </div>
          <button onClick={analyze} disabled={loading || !input.trim()} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50">{loading ? "Analyzing…" : "Analyze"}</button>
        </div>

        <div className="lg:col-span-2">
          {!result ? (
            <div className="border border-neutral-200 rounded-xl p-6 text-neutral-500">Enter content and click Analyze to see predictions.</div>
          ) : (
            <div className="space-y-6">
              <div className="border border-neutral-200 rounded-xl p-6 flex items-center justify-between">
                <div>
                  <div className="text-sm text-neutral-500">Overall Score</div>
                  <div className="text-3xl font-semibold">{result.overall}/100</div>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded ${badge(result.scores.ctr)}`}>CTR {result.scores.ctr}</span>
                  <span className={`px-2 py-1 rounded ${badge(result.scores.engagement)}`}>Eng {result.scores.engagement}</span>
                  <span className={`px-2 py-1 rounded ${badge(result.scores.conversion)}`}>CVR {result.scores.conversion}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(Object.keys(result.persona_resonance) as PersonaId[]).map((k) => (
                  <div key={k} className={`border rounded-lg p-3 text-center ${badge(result.persona_resonance[k])}`}>
                    <div className="text-sm mb-1">{k.toUpperCase()}</div>
                    <div className="text-lg font-semibold">{result.persona_resonance[k]}</div>
                  </div>
                ))}
              </div>

              <div className="border border-neutral-200 rounded-xl p-6">
                <div className="font-semibold mb-2">Recommendations</div>
                <ul className="list-disc pl-5 text-sm text-neutral-700 space-y-1">
                  {result.recommendations.map((r: string, i: number) => <li key={i}>{r}</li>)}
                </ul>
              </div>

              <div className="border border-neutral-200 rounded-xl p-6 flex items-center justify-between">
                <div className="text-sm text-neutral-700">Trend alignment: {result.trend_alignment}</div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm rounded-md bg-neutral-100">Simulate Persona</button>
                  <a href="#content" className="px-3 py-1.5 text-sm rounded-md bg-green-600 text-white">Deploy to Storyblok</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


