import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    const apiKey = "AIzaSyDGHBfsZac89ZKU8oFtqiDkjA2SjBFsJZc";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent("Say hello in one word");
    const text = result.response.text();
    
    return Response.json({ 
      success: true, 
      message: "Gemini API is working!",
      response: text 
    });
  } catch (error) {
    console.error("Test API Error:", error);
    return Response.json({ 
      success: false, 
      error: `Gemini API error: ${error}` 
    }, { status: 500 });
  }
}
