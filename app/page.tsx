"use client";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from './components/Navbar';
import LeftSidebar from './components/LeftSidebar'; 
import NewsSidebar from './components/NewsSidebar'; 
import VoterFAQ from './components/VoterFAQ'; 
import ChatBot from './components/ChatBot'; 
import { MapPin, UserCheck, FileSearch, ArrowRight, Info } from 'lucide-react';

const MapComponent = dynamic(() => import('./components/Map'), { 
  ssr: false, 
  loading: () => (
    <div className="h-64 bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400">
      Loading Interactive Map...
    </div>
  ) 
});

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 relative">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-14 px-4 bg-gradient-to-b from-blue-900 to-blue-700 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Your Voice, Your Future.</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          One portal to find your polling booth, check candidate details, and register to vote.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/status">
            <button className="w-full sm:w-auto bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition shadow-lg transform hover:scale-105 duration-200">
              Check My Status
            </button>
          </Link>
          <Link href="/candidates">
            <button className="w-full sm:w-auto border-2 border-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-900 transition shadow-lg">
              Find Candidates
            </button>
          </Link>
        </div>
      </section>

      {/* --- MAIN LAYOUT --- */}
      <div className="max-w-[1400px] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-[30%] flex flex-col gap-8 order-2 lg:order-1">
          <NewsSidebar />
          <LeftSidebar />

          {/* --- VOTER PROMO IMAGE --- */}
          {/* Ensure 'vote-promo.png' is inside the 'public' folder! */}
          <div className="relative rounded-xl overflow-hidden shadow-lg group">
            <img 
              src="/vote-promo.png" 
              alt="Vote for a Better Future" 
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
              <h3 className="text-white font-bold text-lg mb-0.5 shadow-sm">Make It Count</h3>
              <p className="text-gray-200 text-xs opacity-90 font-medium">
                Shape the world's largest democracy.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-[70%] order-1 lg:order-2">
          
          {/* STEPS */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">?</span>
              How to Vote in 3 Simple Steps
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start p-4 bg-slate-50 rounded-lg border border-slate-100 relative group hover:border-blue-200 transition">
                <div className="mr-4">
                  <UserCheck className="h-8 w-8 text-blue-600 mb-2" />
                  <h4 className="font-bold text-gray-900">1. Check Status</h4>
                  <p className="text-xs text-gray-500 mt-1">Ensure your name is on the voter roll.</p>
                </div>
                <ArrowRight className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-6 w-6 z-10" />
              </div>

              <div className="flex items-start p-4 bg-slate-50 rounded-lg border border-slate-100 relative group hover:border-blue-200 transition">
                <div className="mr-4">
                  <FileSearch className="h-8 w-8 text-orange-500 mb-2" />
                  <h4 className="font-bold text-gray-900">2. Pick Candidate</h4>
                  <p className="text-xs text-gray-500 mt-1">Read manifestos and choose wisely.</p>
                </div>
                <ArrowRight className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-6 w-6 z-10" />
              </div>

              <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-100 relative">
                <div className="mr-4">
                  <MapPin className="h-8 w-8 text-green-600 mb-2" />
                  <h4 className="font-bold text-gray-900">3. Visit Booth</h4>
                  <p className="text-xs text-gray-500 mt-1">Carry ID and cast your vote below.</p>
                </div>
              </div>
            </div>
          </div>

          {/* MAP */}
          <section id="map" className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8 overflow-hidden relative">
            <div className="p-6 border-b border-gray-100 flex justify-between items-end bg-white">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Find Polling Station</h2>
                <p className="text-gray-500">Search for booths in New Delhi (Demo Region)</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold border border-green-200 animate-pulse flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                Live GPS
              </span>
            </div>

            <div className="h-[550px] w-full bg-slate-100 relative z-0">
              <MapComponent />
              <div className="absolute bottom-6 left-4 z-[400] bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-gray-200 w-48 pointer-events-none">
                <h4 className="text-[10px] font-bold text-gray-500 mb-2 flex items-center uppercase tracking-wider">
                  <Info className="h-3 w-3 mr-1" /> Map Legend
                </h4>
                <div className="space-y-1.5">
                  <div className="flex items-center text-xs font-medium text-gray-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 border border-white shadow mr-2"></div>
                    Your Location
                  </div>
                  <div className="flex items-center text-xs font-medium text-gray-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-white shadow mr-2"></div>
                    Polling Booth
                  </div>
                  <div className="flex items-center text-xs font-medium text-gray-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-white shadow mr-2"></div>
                    High Wait Time
                  </div>
                  <div className="flex items-center text-xs font-medium text-gray-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 border border-white shadow mr-2"></div>
                    Low Wait Time
                  </div>
                </div>
              </div>
            </div>
          </section>

          <VoterFAQ />
        </div>
      </div>

      <ChatBot />
    </main>
  );
}