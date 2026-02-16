# 🗳️ SmartVoter: The Intelligent Election Portal

SmartVoter is a modern, high-performance web application built to simplify the democratic process for Indian citizens. It features an interactive live polling booth map, real-time aggregated election news, and an intelligent AI assistant powered by Meta's Llama 3 to answer voter queries instantly.

## ✨ Key Features

* **🤖 VoteBot AI Assistant:** A sub-second latency chatbot powered by the Groq API (Llama 3 70B model) that answers FAQs about Voter IDs, polling processes, and helpline numbers. Includes an offline-mode failsafe.
* **🗺️ Interactive Polling Map:** A live, dynamic map built with React-Leaflet and OpenStreetMap data to help users locate nearby polling stations and check estimated wait times.
* **📰 Real-Time Election Feed:** Aggregates live news and updates regarding candidates and election commission announcements.
* **📱 Responsive Design:** A fully mobile-friendly UI built with Tailwind CSS, ensuring accessibility for all voters across any device.
* **⚡ Serverless Architecture:** Deployed on Vercel with a decoupled Supabase PostgreSQL database for 24/7 high availability.

## 🛠️ Tech Stack

**Frontend:**
* [Next.js 14](https://nextjs.org/) (App Router)
* React & TypeScript
* Tailwind CSS
* Lucide React (Icons)
* React-Leaflet (Interactive Maps)

**Backend & APIs:**
* Next.js Serverless Route Handlers
* [Groq API](https://groq.com/) (Llama-3.3-70b-versatile for AI inference)
* NewsAPI (Election updates)
* [Supabase](https://supabase.com/) (PostgreSQL Database)

## 🚀 Getting Started (Local Development)

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/chirag-ydv/smartvoter-portal.git](https://github.com/chirag-ydv/smartvoter-portal.git)
   cd smartvoter-portal
Install dependencies:

Bash
npm install
Set up environment variables:
Create a .env.local file in the root directory and add your API keys:

Code snippet
GROQ_API_KEY=your_groq_api_key
NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
Run the development server:

Bash
npm run dev
Open http://localhost:3000 in your browser to see the application.

🛡️ Failsafe Mechanisms & Graceful Degradation
To ensure maximum reliability during high-traffic election days, this application features built-in API fallback systems. If third-party AI or News providers experience downtime, the system automatically degrades gracefully to serve localized, cached, or static fallback data without crashing the UI.

Built with ❤️ for a stronger democracy.
