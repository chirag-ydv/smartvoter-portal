"use client";
import { useState, useEffect } from 'react';
import { RefreshCw, Radio, CheckCircle, Clock, Calendar, AlertTriangle, Sparkles, FileText } from 'lucide-react';

// 1. Interface matching YOUR API response exactly
type ElectionUpdate = {
  id: string;
  title: string;
  category: "Upcoming" | "Result" | "News";
  status: string;
  priority: "High" | "Normal";
};

export default function LeftSidebar() {
  const [updates, setUpdates] = useState<ElectionUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. REALISTIC BACKUP DATA (Jan 2026 Context)
  // Used if Gemini API fails or quota runs out during demo.
  const BACKUP_DATA: ElectionUpdate[] = [
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
    }
  ];

  const fetchGeminiNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gemini-updates', { cache: 'no-store' });
      const data = await res.json();
      
      // Validation: Ensure we actually got an array
      if (Array.isArray(data) && data.length > 0) {
        setUpdates(data);
      } else {
        throw new Error("Empty or invalid API response");
      }
    } catch (error) {
      console.warn("API failed, using backup data for demo:", error);
      setUpdates(BACKUP_DATA);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGeminiNews();
  }, []);

  // 3. Style Helper (Matches your specific categories)
  const getCategoryStyle = (category: string) => {
    switch(category) {
      case 'Result': return { 
        badge: 'bg-green-100 text-green-800 border-green-200',
        icon: <CheckCircle className="h-3 w-3 mr-1" />
      };
      case 'Upcoming': return { 
        badge: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: <Calendar className="h-3 w-3 mr-1" />
      };
      case 'News': return { 
        badge: 'bg-slate-100 text-slate-800 border-slate-200',
        icon: <FileText className="h-3 w-3 mr-1" />
      };
      default: return { 
        badge: 'bg-gray-100 text-gray-800',
        icon: <Radio className="h-3 w-3 mr-1" />
      };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-fit">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-4 text-white flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-400" /> 
            AI Election Feed
          </h2>
          <p className="text-[10px] text-blue-200 opacity-80 uppercase tracking-wide">Powered by Gemini 2.5</p>
        </div>
        <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-xs border border-white/20">
          <Radio className="h-3 w-3 text-red-400 animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[200px]">
        {loading ? (
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse"></div>
            <p className="text-xs text-center text-gray-500 pt-2 flex items-center justify-center gap-2">
              <RefreshCw className="h-3 w-3 animate-spin text-blue-600" />
              Analyzing 2026 Trends...
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {updates.map((item) => {
              const style = getCategoryStyle(item.category);
              return (
                <div key={item.id} className="p-4 hover:bg-slate-50 transition duration-150 group">
                  
                  {/* Top Row: Category Badge & Priority */}
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider flex items-center ${style.badge}`}>
                      {style.icon} {item.category}
                    </span>
                    {item.priority === 'High' && (
                      <span className="flex items-center text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100 animate-pulse">
                        <AlertTriangle className="h-3 w-3 mr-1" /> URGENT
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-gray-800 leading-tight mb-1 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  {/* Status / Description */}
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {item.status}
                  </p>

                  {/* Timestamp Footer */}
                  <div className="mt-2 flex items-center text-[10px] text-gray-400 font-medium">
                    <Clock className="h-3 w-3 mr-1" /> Just now
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <div className="bg-gray-50 p-3 border-t border-gray-100 text-center">
        <button 
          onClick={fetchGeminiNews}
          className="text-blue-700 text-xs font-bold hover:bg-blue-100 px-4 py-2 rounded-full transition flex items-center justify-center gap-2 mx-auto"
        >
          Refetch AI Updates <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
}