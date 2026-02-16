"use client";
import { Menu, X, Vote } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // CHANGED z-50 TO z-[9999] TO FIX OVERLAP
    <nav className="bg-blue-900 text-white shadow-lg fixed w-full z-[9999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center">
            <Vote className="h-8 w-8 text-yellow-400" />
            <span className="ml-2 font-bold text-xl">SmartVoter</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="hover:bg-blue-700 px-3 py-2 rounded-md">Home</Link>
              <Link href="/#map" className="hover:bg-blue-700 px-3 py-2 rounded-md">Find Booth</Link>
              <Link href="/candidates" className="hover:bg-blue-700 px-3 py-2 rounded-md">Candidates</Link>
              <Link href="/status" className="hover:bg-blue-700 px-3 py-2 rounded-md">Check Status</Link>
              
              <Link href="/register">
                <button className="bg-yellow-500 text-blue-900 font-bold px-4 py-2 rounded-full hover:bg-yellow-400 ml-2">
                  Register Now
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-800">
          <Link href="/" className="block px-3 py-2 hover:bg-blue-700">Home</Link>
          <Link href="/#map" className="block px-3 py-2 hover:bg-blue-700">Find Booth</Link>
          <Link href="/candidates" className="block px-3 py-2 hover:bg-blue-700">Candidates</Link>
          <Link href="/status" className="block px-3 py-2 hover:bg-blue-700">Check Status</Link>
          <Link href="/register" className="block px-3 py-2 hover:bg-blue-700 font-bold text-yellow-400">Register Now</Link>
        </div>
      )}
    </nav>
  );
}