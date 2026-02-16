import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let message = "";
  try {
    const body = await req.json();
    message = body.message;
  } catch (e) {
    return NextResponse.json({ reply: "I didn't catch that. Could you say it again?" });
  }

  try {
    const groqApiKey = process.env.GROQ_API_KEY;

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // THE FIX: Using Groq's active 2026 model
        model: "llama-3.3-70b-versatile", 
        messages: [
          { 
            role: "system", 
            content: "You are 'VoteBot', a smart and friendly election assistant for India. If the user says 'hi' or 'hello', greet them warmly and ask how you can help. Keep answers short (2-3 sentences max)." 
          },
          { 
            role: "user", 
            content: message 
          }
        ],
        temperature: 0.7,
      })
    });

    if (!groqResponse.ok) {
        // This captures the EXACT reason if Groq rejects the request (e.g., bad key, no quota)
        const errorData = await groqResponse.text();
        throw new Error(`Groq API Error: ${groqResponse.status} - ${errorData}`);
    }

    const data = await groqResponse.json();
    const replyText = data.choices[0].message.content;

    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    console.error("AI CRASH REASON:", error);
    
    // THIS WILL SHOW YOU THE EXACT ERROR IN THE CHAT IF IT FAILS
    const errorMessage = error.message || "Unknown Server Error";
    return NextResponse.json({ reply: `SYSTEM DIAGNOSTIC: ${errorMessage}` });
  }
}