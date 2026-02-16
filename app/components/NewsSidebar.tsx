"use client";
import { useEffect, useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';

type NewsItem = {
  id: number;
  title: string;
  desc: string;
  date: string;
  source: string;
  url: string;
};

export default function NewsSidebar() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch live news
  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news'); // Calls our internal API
      const data = await res.json();
      if (Array.isArray(data)) {
        setNews(data);
      }
    } catch (error) {
      console.error("Failed to load news", error);
    }
    setLoading(false);
  };

  // Fetch on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-fit">
      
      {/* Header */}
      <div className="bg-blue-900 p-4 flex justify-between items-center">
        <div>
          <h3 className="text-white font-bold text-lg flex items-center">
            <span className="animate-pulse mr-2 text-red-500">●</span> Live News
          </h3>
          <p className="text-blue-200 text-xs mt-1">Real-time election updates</p>
        </div>
        <button 
          onClick={fetchNews} 
          className="text-white opacity-70 hover:opacity-100 transition p-1"
          title="Refresh News"
        >
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* News List */}
      <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
        {loading ? (
          // Loading Skeleton
          <div className="p-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          news.map((item) => (
            <a 
              key={item.id} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 hover:bg-slate-50 transition group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {item.source}
                </span>
                <span className="text-xs text-gray-400">{item.date}</span>
              </div>
              
              <h4 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-blue-700 leading-snug">
                {item.title}
              </h4>
              
              {/* Truncate description to keep it neat */}
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                {item.desc}
              </p>
              
              <div className="mt-2 flex items-center text-xs text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition">
                Read full story <ExternalLink className="h-3 w-3 ml-1" />
              </div>
            </a>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-gray-50 border-t text-center">
        <p className="text-xs text-gray-400">Powered by NewsAPI.org</p>
      </div>
    </div>
  );
}