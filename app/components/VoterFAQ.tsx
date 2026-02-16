"use client";
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, BookOpen } from 'lucide-react';

export default function VoterFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What documents do I need to carry for voting?",
      answer: "You must carry your Voter ID (EPIC) card. If you don't have it, you can use your Aadhaar Card, Passport, Driving License, or PAN Card as an alternative identity proof."
    },
    {
      question: "Can I vote if my name is not in the electoral roll?",
      answer: "No. Even if you have a Voter ID card, your name MUST be on the current electoral roll to vote. Use the 'Check My Status' button above to verify."
    },
    {
      question: "How do I find my Polling Booth?",
      answer: "Use the 'Locate Booth' feature on this portal. Enter your EPIC number or address to get the exact Google Maps location of your designated station."
    },
    {
      question: "Is online voting available for the 2026 Elections?",
      answer: "Currently, internet voting is NOT available for general citizens. You must visit your designated polling station physically. Postal ballots are available only for specific categories (army, election duty staff)."
    },
    {
      question: "What is NOT allowed inside the polling station?",
      answer: "Mobile phones, cameras, smartwatches, and weapons are strictly prohibited inside the polling booth to maintain the secrecy of your vote."
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <BookOpen className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Voter Awareness Guide</h3>
          <p className="text-sm text-gray-500">Frequently Asked Questions</p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`w-full flex justify-between items-center p-4 text-left font-semibold transition-colors ${
                openIndex === index ? 'bg-blue-50 text-blue-800' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 opacity-50" />
                {faq.question}
              </span>
              {openIndex === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            
            {openIndex === index && (
              <div className="p-4 bg-slate-50 text-gray-600 text-sm leading-relaxed border-t border-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Helpline Banner */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-yellow-800 uppercase tracking-wide">National Voter Helpline</p>
          <p className="text-lg font-black text-gray-900">Call 1950</p>
        </div>
        <button className="bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-2 rounded-full hover:bg-yellow-300">
          Toll Free
        </button>
      </div>
    </div>
  );
}