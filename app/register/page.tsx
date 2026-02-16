"use client";
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form Data State
  const [formData, setFormData] = useState({
    full_name: '',
    voter_id_number: '', // e.g., ABC1234567
    date_of_birth: '',
    constituency: 'New Delhi', // Default
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // 1. Send data to Supabase
    const { error } = await supabase
      .from('voters')
      .insert([formData]);

    if (error) {
      console.error(error);
      setErrorMsg("Registration Failed! Voter ID might already exist.");
    } else {
      setSuccess(true);
      // Optional: Redirect to home after 2 seconds
      setTimeout(() => router.push('/'), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-28 pb-10 px-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-yellow-500">
          
          <div className="text-center mb-6">
            <UserPlus className="h-12 w-12 text-blue-900 mx-auto mb-2" />
            <h1 className="text-2xl font-bold text-gray-800">Voter Registration</h1>
            <p className="text-gray-500 text-sm">Join the digital democracy today.</p>
          </div>

          {/* Success Message */}
          {success ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center">
              <CheckCircle className="inline-block mr-2 h-5 w-5"/>
              <strong>Success!</strong> <br/> You are now registered.
              <p className="text-xs mt-1">Redirecting to home...</p>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  required
                  name="full_name"
                  type="text" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  placeholder="e.g. Rahul Sharma"
                  onChange={handleChange}
                />
              </div>

              {/* Voter ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Voter ID Number</label>
                <input 
                  required
                  name="voter_id_number"
                  type="text" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  placeholder="e.g. EPIC123456"
                  onChange={handleChange}
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input 
                  required
                  name="date_of_birth"
                  type="date" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  onChange={handleChange}
                />
              </div>

              {/* Constituency Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Constituency</label>
                <select 
                  name="constituency"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  onChange={handleChange}
                >
                  <option value="New Delhi">New Delhi</option>
                  <option value="Mumbai South">Mumbai South</option>
                  <option value="Bangalore Central">Bangalore Central</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Error Message Display */}
              {errorMsg && (
                <div className="flex items-center text-red-600 text-sm bg-red-50 p-2 rounded">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {errorMsg}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register to Vote'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}