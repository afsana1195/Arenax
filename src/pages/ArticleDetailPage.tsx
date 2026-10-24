import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_ARTICLES } from '../data/mockData';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Check,
  Bookmark,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const article = MOCK_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-display text-3xl font-black text-white uppercase">Article Not Found</h1>
        <p className="text-slate-400 text-sm">
          The requested dispatch could not be found or has been archived.
        </p>
        <Link
          to="/news"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to News Hub</span>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedArticles = MOCK_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-cyan-400">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link to="/news" className="hover:text-cyan-400">News</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-cyan-400 truncate max-w-xs">{article.categoryLabel}</span>
      </nav>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            {article.categoryLabel}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.publishedAt}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-[1.05]">
          {article.title}
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal italic">
          "{article.excerpt}"
        </p>

        {/* Author Bylines and Share Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/40"
            />
            <div>
              <span className="text-sm font-bold text-white block">{article.author.name}</span>
              <span className="text-xs text-slate-400">{article.author.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              aria-label="Bookmark article"
              className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                bookmarked
                  ? 'border-amber-500/50 bg-amber-950/40 text-amber-300'
                  : 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-400' : ''}`} />
              <span>{bookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              aria-label="Copy share link"
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Link Copied' : 'Share Story'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Cover Visual */}
      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full max-h-[500px] object-cover"
        />
        {article.caption && (
          <p className="p-3 text-xs text-slate-400 italic bg-slate-900/90 border-t border-slate-800">
            {article.caption}
          </p>
        )}
      </div>

      {/* Article Body */}
      <div className="space-y-6 text-slate-200 text-base leading-relaxed pt-2">
        {article.content.map((para, i) => (
          <p key={i} className="text-slate-300 leading-relaxed font-normal">
            {para}
          </p>
        ))}
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
          Tags:
        </span>
        {article.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-lg text-xs bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Editorial Standards Notice */}
      <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
        <span>
          ARENA X maintains strict editorial independence. Dispatches are verified by our sports analytics desk and entertainment editors.
        </span>
      </div>

      {/* Related Stories */}
      <section aria-label="Related stories" className="pt-10 border-t border-slate-800 space-y-6">
        <h2 className="font-display text-2xl font-black text-white uppercase tracking-wide">
          More from ARENA X
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <Link
              key={rel.id}
              to={`/news/${rel.slug}`}
              className="group bg-[#0e131f] border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden p-4 flex flex-col justify-between"
            >
              <div>
                <img
                  src={rel.coverImage}
                  alt={rel.title}
                  className="w-full aspect-[16/10] object-cover rounded-xl mb-3"
                />
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  {rel.categoryLabel}
                </span>
                <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mt-1">
                  {rel.title}
                </h3>
              </div>
              <span className="text-xs text-cyan-400 font-semibold mt-3 block">Read story →</span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
};
