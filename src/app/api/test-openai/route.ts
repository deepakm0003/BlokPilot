import OpenAI from "openai";

export async function GET() {
  try {
    const apiKey = "sk-7890abcdef7890abcdef7890abcdef7890abcd";
    const client = new OpenAI({ apiKey });
    
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Say hello in one word" }
      ],
      temperature: 0.7,
    });

    const text = completion.choices?.[0]?.message?.content ?? "No response";
    
    return Response.json({ 
      success: true, 
      message: "OpenAI API is working!",
      response: text 
    });
  } catch (error) {
    console.error("OpenAI Test Error:", error);
    return Response.json({ 
      success: false, 
      error: `OpenAI API error: ${error}` 
    }, { status: 500 });
  }
}
