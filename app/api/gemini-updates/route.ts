import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// 1. SETUP GROQ CLIENT
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 2. BACKUP DATA (Safety Net for Jan 2026)
const BACKUP_NEWS = [
  {
    id: "backup-1",
    title: "Maharashtra Civic Results",
    category: "Result",
    status: "BJP-Shinde Sena alliance sweeps BMC & Pune Municipal polls.",
    priority: "High"
  },
  {
    id: "backup-2",
    title: "Tamil Nadu 2026",
    category: "Upcoming",
    status: "Actor Vijay's TVK party announces first candidate list for Assembly polls.",
    priority: "Normal"
  },
  {
    id: "backup-3",
    title: "West Bengal Polls",
    category: "Upcoming",
    status: "ECI publishes final electoral roll; 2.4% rise in women voters.",
    priority: "Normal"
  },
  {
    id: "backup-4",
    title: "National Voters' Day",
    category: "News",
    status: "PM addresses youth on 'My India, My Vote' theme.",
    priority: "Normal"
  },
  {
    id: "backup-5",
    title: "Kerala Assembly",
    category: "Upcoming",
    status: "LDF launches state-wide 'Vikasana Jatha' campaign.",
    priority: "Normal"
  }
];

export async function GET() {
  try {
    const prompt = `
      Act as an Indian Election Reporter. Generate 3 realistic updates for recent and upcoming elections in India as of current month.
      Constraints:
      1. DO NOT PROVIDE RESULTS DECLARED BEFORE 2026.
      2. No news, only the post for which elections are/were there.
      Strictly return a JSON Array with keys: id, title, category (Result declared/Upcoming), status, priority (High/Normal).
      Do NOT use markdown. Just raw JSON.
    `;

    // 3. CALL GROQ (Updated Model ID)
    // We switched from 'llama3-8b-8192' to 'llama-3.3-70b-versatile'
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile", // UPDATED: Current supported model
      temperature: 0.7,
    });

    let text = completion.choices[0]?.message?.content || "[]";
    
    // Clean & Parse
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(text);

    return NextResponse.json(data);

  } catch (error) {
    console.error("Groq API Error:", error);
    // Silent Failover: Return backup data if API fails
    return NextResponse.json(BACKUP_NEWS);
  }
}