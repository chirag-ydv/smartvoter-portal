"use client";
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import { Search, CheckCircle, XCircle } from 'lucide-react';

export default function CheckStatus() {
  const [voterId, setVoterId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(false);
    setResult(null);

    // Query Supabase for the Voter ID
    const { data, error } = await supabase
      .from('voters')
      .select('*')
      .eq('voter_id_number', voterId)
      .single();

    if (data) {
      setResult(data);
    }
    setSearched(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-32 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">Check Voter Status</h1>
        
        {/* Search Box */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input 
              type="text" 
              placeholder="Enter Voter ID (e.g. EPIC123)" 
              className="flex-1 border p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              required
            />
            <button disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Results Display */}
        {searched && (
          <div className="animate-fade-in-up">
            {result ? (
              <div className="bg-green-50 border border-green-200 p-8 rounded-xl text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-800 mb-2">You are Registered!</h2>
                <p className="text-gray-600">Name: <span className="font-bold">{result.full_name}</span></p>
                <p className="text-gray-600">Constituency: <span className="font-bold">{result.constituency}</span></p>
                <p className="text-gray-600">Polling Station: <span className="font-bold">Assigned (Check Map)</span></p>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 p-8 rounded-xl text-center">
                <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-800 mb-2">Record Not Found</h2>
                <p className="text-gray-600">Please check the ID or register as a new voter.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}