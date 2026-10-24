import { CartItem, Match, Article, QuizQuestion, PollOption, SportType, MatchStatus } from '../types';

export interface CartCalculationResult {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

/**
 * Calculates cart order totals including coupon codes, dynamic shipping, and tax
 */
export function calculateCartTotals(
  items: CartItem[],
  couponCode: string = '',
  freeShippingThreshold: number = 75,
  taxRate: number = 0.08
): CartCalculationResult {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discount = 0;
  const normalizedCoupon = couponCode.trim().toUpperCase();
  if (normalizedCoupon === 'ARENA10') {
    discount = Math.round(subtotal * 0.1 * 100) / 100;
  } else if (normalizedCoupon === 'VIP20') {
    discount = Math.round(subtotal * 0.2 * 100) / 100;
  }

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const shipping = items.length === 0 || discountedSubtotal >= freeShippingThreshold ? 0 : 9.99;
  const tax = Math.round(discountedSubtotal * taxRate * 100) / 100;
  const total = Math.round((discountedSubtotal + shipping + tax) * 100) / 100;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discount,
    shipping,
    tax,
    total,
  };
}

/**
 * Calculates quiz scoring and evaluation grade
 */
export function calculateQuizScore(
  userAnswers: Record<string, number>,
  questions: QuizQuestion[]
): {
  score: number;
  total: number;
  percentage: number;
  grade: 'Champion' | 'Pro' | 'Contender' | 'Rookie';
  details: { questionId: string; correct: boolean; explanation: string }[];
} {
  const total = questions.length;
  let score = 0;

  const details = questions.map((q) => {
    const isCorrect = userAnswers[q.id] === q.correctIndex;
    if (isCorrect) score += 1;
    return {
      questionId: q.id,
      correct: isCorrect,
      explanation: q.explanation,
    };
  });

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  let grade: 'Champion' | 'Pro' | 'Contender' | 'Rookie' = 'Rookie';
  if (percentage === 100) grade = 'Champion';
  else if (percentage >= 80) grade = 'Pro';
  else if (percentage >= 50) grade = 'Contender';

  return { score, total, percentage, grade, details };
}

/**
 * Computes percentage share for poll options with safety for 0 total votes
 */
export function calculatePollPercentages(options: PollOption[]): { id: string; percentage: number }[] {
  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);
  if (totalVotes === 0) {
    return options.map((opt) => ({ id: opt.id, percentage: 0 }));
  }

  return options.map((opt) => ({
    id: opt.id,
    percentage: Math.round((opt.votes / totalVotes) * 100),
  }));
}

/**
 * Filters sports matches by sport, status tab, and search query
 */
export function filterMatches(
  matches: Match[],
  filters: {
    sport?: SportType | 'all';
    status?: MatchStatus | 'all';
    search?: string;
  }
): Match[] {
  return matches.filter((match) => {
    if (filters.sport && filters.sport !== 'all' && match.sport !== filters.sport) {
      return false;
    }
    if (filters.status && filters.status !== 'all' && match.status !== filters.status) {
      return false;
    }
    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      const matchText = `${match.homeTeam.name} ${match.awayTeam.name} ${match.league} ${match.venue}`.toLowerCase();
      if (!matchText.includes(q)) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Filters articles by category, tag, or text
 */
export function filterArticles(
  articles: Article[],
  filters: {
    category?: string | 'all';
    search?: string;
  }
): Article[] {
  return articles.filter((article) => {
    if (filters.category && filters.category !== 'all') {
      const normalizedCat = filters.category.toLowerCase();
      const articleCat = article.category.toLowerCase();
      // Allow general 'sports' to match cricket, football, etc.
      if (normalizedCat === 'sports') {
        const isSport = ['sports', 'cricket', 'football', 'basketball', 'esports'].includes(articleCat);
        if (!isSport) return false;
      } else if (normalizedCat === 'entertainment') {
        const isEnt = ['entertainment', 'movies', 'ott', 'celebrities'].includes(articleCat);
        if (!isEnt) return false;
      } else if (articleCat !== normalizedCat) {
        return false;
      }
    }

    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      const contentText = `${article.title} ${article.excerpt} ${article.tags.join(' ')} ${article.author.name}`.toLowerCase();
      if (!contentText.includes(q)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Validates email address format
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.trim().length === 0) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Humanizes match status display with badge metadata
 */
export function formatMatchStatusBadge(match: Match): {
  text: string;
  colorClass: string;
  isPulsing: boolean;
} {
  switch (match.status) {
    case 'live':
      return {
        text: 'LIVE NOW',
        colorClass: 'bg-red-500/20 text-red-400 border-red-500/30',
        isPulsing: true,
      };
    case 'upcoming':
      return {
        text: 'UPCOMING',
        colorClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        isPulsing: false,
      };
    case 'completed':
      return {
        text: 'FINAL',
        colorClass: 'bg-slate-700/40 text-slate-400 border-slate-700',
        isPulsing: false,
      };
  }
}
