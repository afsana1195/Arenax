import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DEMO_ANNOUNCEMENTS } from '../../data/mockData';
import { ChevronRight, Zap, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DEMO_ANNOUNCEMENTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (isDismissed) return null;

  const current = DEMO_ANNOUNCEMENTS[currentIndex];

  return (
    <aside aria-label="Breaking Announcements" className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border-b border-cyan-500/20 text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30 shrink-0">
            <Zap className="w-3 h-3 text-cyan-300 animate-pulse" />
            Breaking
          </span>
          <Link
            to={current.link}
            className="text-slate-200 hover:text-white transition-colors truncate flex items-center gap-1 group font-medium"
          >
            <span>{current.text}</span>
            <ChevronRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex gap-1">
            {DEMO_ANNOUNCEMENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Announcement item ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentIndex ? 'w-4 bg-cyan-400' : 'bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss announcement banner"
            className="p-1 text-slate-400 hover:text-white transition-colors rounded hover:bg-slate-800"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
