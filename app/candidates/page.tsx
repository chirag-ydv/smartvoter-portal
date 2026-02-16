"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import { Filter, Users, Map, CheckCircle, Info } from 'lucide-react';

type Candidate = {
  id: string;
  name: string;
  party_name: string;
  party_logo_url: string;
  election_type: string;
  state_name: string;
  constituency: string;
  status: string;
  manifesto: string;
  age: number;
};

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Default to State view as that's where the 2026 action is
  const [activeTab, setActiveTab] = useState<'State' | 'Central'>('State');
  const [selectedState, setSelectedState] = useState('All');

  useEffect(() => {
    fetchData();
  }, [activeTab, selectedState]);

  async function fetchData() {
    setLoading(true);
    let query = supabase.from('candidates').select('*').eq('election_type', activeTab);

    if (selectedState !== 'All' && activeTab === 'State') {
      query = query.eq('state_name', selectedState);
    }
    
    const { data, error } = await query;
    if (!error && data) setCandidates(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-28 px-4 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Candidates 2026</h1>
          <p className="text-gray-600">Explore profiles and manifestos for upcoming elections.</p>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8">
          
          {/* Tabs */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => { setActiveTab('State'); setSelectedState('All'); }}
              className={`px-6 py-2 rounded-md font-bold text-sm transition flex items-center gap-2 ${activeTab === 'State' ? 'bg-white text-blue-900 shadow' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Map className="h-4 w-4" /> State Assembly (2026)
            </button>
            <button 
              onClick={() => setActiveTab('Central')}
              className={`px-6 py-2 rounded-md font-bold text-sm transition flex items-center gap-2 ${activeTab === 'Central' ? 'bg-white text-blue-900 shadow' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Users className="h-4 w-4" /> Central Leaders
            </button>
          </div>

          {/* State Dropdown */}
          {activeTab === 'State' && (
            <div className="mt-4 md:mt-0 flex items-center border-l pl-4 ml-4">
              <span className="text-sm text-gray-500 mr-2">Filter State:</span>
              <select 
                value={selectedState} 
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
              >
                <option value="All">All Upcoming States</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Kerala">Kerala</option>
                <option value="Assam">Assam</option>
              </select>
            </div>
          )}
        </div>

        {/* GRID */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading Election Commission Data...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {candidates.map((c) => (
              <div key={c.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-100 flex flex-col">
                
                {/* Header Strip */}
                <div className={`h-2 w-full ${
                  c.party_name === 'BJP' ? 'bg-orange-500' : 
                  c.party_name === 'INC' ? 'bg-blue-500' : 
                  c.party_name === 'AITC' || c.party_name === 'DMK' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>

                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{c.name}</h2>
                      <span className="text-xs font-semibold text-gray-500">{c.age} Years • {c.constituency}</span>
                    </div>
                    {/* Logo Image */}
                    <div className="h-12 w-12 bg-gray-50 rounded-full p-1 flex items-center justify-center border">
<img 
  src={c.party_logo_url} 
  alt="Party Logo" 
  className="h-12 w-12 object-contain"
  onError={(e) => {
    // If the logo fails, switch to a generic fallback image
    e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/168/168569.png';
  }}
/>                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      c.status.includes('Incumbent') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      <CheckCircle className="w-3 h-3 mr-1" /> {c.status}
                    </span>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {c.party_name}
                    </span>
                  </div>

                  {/* Manifesto Box */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2">
                    <h4 className="flex items-center text-xs font-bold text-gray-500 uppercase mb-1">
                      <Info className="w-3 h-3 mr-1" /> Primary Manifesto
                    </h4>
                    <p className="text-sm text-gray-700 italic leading-relaxed">"{c.manifesto}"</p>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="bg-gray-50 px-6 py-3 border-t text-xs text-center text-gray-500 font-medium">
                  State: {c.state_name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}