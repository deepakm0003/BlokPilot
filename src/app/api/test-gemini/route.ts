import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    const apiKey = "AIzaSyCGZnqZkdDqf4NHvsiLlAklLAcgBPAFHvQ";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const result = await model.generateContent("Say hello in one word");
    const text = result.response.text();
    
    return Response.json({ 
      success: true, 
      message: "Gemini API is working!",
      response: text 
    });
  } catch (error) {
    console.error("Gemini Test Error:", error);
    return Response.json({ 
      success: false, 
      error: `Gemini API error: ${error}` 
    }, { status: 500 });
  }
}