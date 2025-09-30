import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    
    // Use your real Gemini API key
    const apiKey = "AIzaSyCGZnqZkdDqf4NHvsiLlAklLAcgBPAFHvQ";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const promptText = String(prompt || "Generate a compelling hero tagline about Storyblok and Algolia.");
    const result = await model.generateContent([
      "You are a helpful content assistant for Storyblok creators. Generate creative, engaging content that's perfect for marketing and development.",
      promptText
    ].join("\n\n"));

    const text = result.response.text() || "No response generated";
    return Response.json({ text });
  } catch (error) {
    console.error("AI API Error:", error);
    return new Response(JSON.stringify({ error: `AI service error: ${error}` }), { status: 500 });
  }
}