import React, { useState } from 'react';
import { useFanZone } from '../../context/FanZoneContext';
import { ThumbsUp, Flag, Send, MessageSquare, AlertCircle, Check } from 'lucide-react';

export const DiscussionBoard: React.FC = () => {
  const { comments, addComment, likeComment, reportComment } = useFanZone();
  const [authorName, setAuthorName] = useState('');
  const [text, setText] = useState('');
  const [topic, setTopic] = useState('Champions League');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [reportedMsg, setReportedMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !text.trim()) {
      setStatus('error');
      return;
    }

    const ok = addComment(authorName, text, topic);
    if (ok) {
      setText('');
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
    }
  };

  const handleReport = (commentId: string) => {
    reportComment(commentId);
    setReportedMsg('Comment flagged for moderator review.');
    setTimeout(() => setReportedMsg(null), 3000);
  };

  return (
    <div className="bg-[#0e131f] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            Arena Fan Forum
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-wide mt-1">
            Live Stadium Conversations
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Debate match tactics, transfer gossip, and cinema releases with passionate global fans.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-semibold self-start sm:self-auto">
          Active Thread ({comments.length} Comments)
        </div>
      </div>

      {reportedMsg && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{reportedMsg}</span>
        </div>
      )}

      {/* New Comment Form */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Post Your Take
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your fan handle (e.g. Jordan99)"
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
            required
          />

          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
          >
            <option value="Champions League">Topic: Champions League</option>
            <option value="Cricket World Championship">Topic: Cricket World Championship</option>
            <option value="NBA Playoffs">Topic: NBA Playoffs</option>
            <option value="Dune Messiah">Topic: Dune Messiah</option>
            <option value="Valorant Champions">Topic: Valorant Champions</option>
          </select>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your tactical breakdown, prediction, or film review..."
          rows={3}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none resize-none"
          required
        />

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Civil discourse strictly enforced. Inappropriate comments will be removed.
          </span>
          <button
            type="submit"
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-lg uppercase tracking-wider text-xs flex items-center gap-1.5 transition-colors active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Comment</span>
          </button>
        </div>

        {status === 'success' && (
          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <Check className="w-3 h-3" /> Comment published to stadium thread!
          </p>
        )}
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comm) => (
          <div
            key={comm.id}
            className={`p-4 rounded-xl border transition-all ${
              comm.isReported
                ? 'bg-slate-950/40 border-amber-900/30 opacity-60'
                : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={comm.avatar}
                  alt={comm.authorName}
                  className="w-9 h-9 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-white">
                      {comm.authorName}
                    </span>
                    {comm.authorTag && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold">
                        {comm.authorTag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span>{comm.timestamp}</span>
                    <span>•</span>
                    <span className="text-cyan-400/80">{comm.topic}</span>
                  </div>
                </div>
              </div>

              {/* Moderation Flag button */}
              <button
                onClick={() => handleReport(comm.id)}
                title="Flag this comment for community moderation"
                aria-label={`Flag comment by ${comm.authorName}`}
                className="text-slate-600 hover:text-amber-400 p-1 transition-colors"
              >
                <Flag className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              {comm.text}
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs">
              <button
                onClick={() => likeComment(comm.id)}
                aria-label={`Like comment by ${comm.authorName}`}
                className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{comm.likes}</span>
              </button>

              {comm.isReported && (
                <span className="text-[10px] text-amber-400 uppercase font-semibold">
                  Under Moderation Review
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
