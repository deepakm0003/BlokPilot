// src/app/api/ai/route.ts
/**
 * API route that forwards a prompt to the Gemini AI service.
 *
 * Security fix:
 *   • The Gemini API key is no longer hard‑coded. It is read from the
 *     `GEMINI_API_KEY` environment variable at runtime.
 *   • If the variable is missing, the route returns a 500 error with a clear
 *     message – this prevents accidental deployment without proper credentials.
 *   • The key is never logged or sent back to the client.
 */

import { NextResponse } from "next/server";

// Helper to obtain the API key safely
function getGeminiApiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    // In production we do not expose the missing‑key detail to the client
    // beyond a generic message to avoid leaking environment configuration.
    throw new Error("Gemini API key is not configured");
  }
  return key;
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    if (typeof prompt !== "string" || prompt.trim() === "") {
      return NextResponse.json({ error: "Prompt must be a non‑empty string" }, { status: 400 });
    }

    const apiKey = getGeminiApiKey();

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Gemini API error:", response.status, errorBody);
      return NextResponse.json({ error: "Failed to fetch response from Gemini" }, { status: 502 });
    }

    const data = await response.json();
    return NextResponse.json({ result: data }, { status: 200 });
  } catch (err) {
    console.error("AI route error:", err);
    // Distinguish missing‑key error from other internal errors
    const message = err instanceof Error && err.message.includes("Gemini API key")
      ? "Server configuration error"
      : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
