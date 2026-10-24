export type SportType = 'cricket' | 'football' | 'basketball' | 'esports';

export type MatchStatus = 'live' | 'upcoming' | 'completed';

export interface MatchTeam {
  name: string;
  shortName: string;
  logo: string;
  score?: string;
  overs?: string; // For cricket
  subScore?: string; // E.g. quarters/halves/sets
}

export interface MatchEvent {
  minuteOrOver: string;
  type: 'goal' | 'wicket' | 'basket' | 'card' | 'kill' | 'break';
  description: string;
  player?: string;
  teamShort: string;
}

export interface Match {
  id: string;
  sport: SportType;
  league: string;
  tournamentLogo?: string;
  status: MatchStatus;
  startTime: string;
  venue: string;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  statusDetail: string; // e.g. "Live - 18.4 Overs", "Half-time", "Q4 02:41", "Starting in 2h"
  summary?: string;
  isDemo: boolean;
  timeline?: MatchEvent[];
  stats?: {
    label: string;
    home: string | number;
    away: string | number;
  }[];
  lineups?: {
    home: string[];
    away: string[];
  };
}

export type NewsCategory = 'sports' | 'entertainment' | 'cricket' | 'football' | 'basketball' | 'esports' | 'movies' | 'ott' | 'celebrities';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  categoryLabel: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
  caption?: string;
  tags: string[];
  featured?: boolean;
  content: string[]; // Array of paragraphs/subheadings
}

export interface EntertainmentRelease {
  id: string;
  title: string;
  type: 'movie' | 'ott' | 'celebrity';
  platform?: string; // e.g. Netflix, Disney+, Prime, Theatres
  releaseDate: string;
  rating?: string;
  genre: string[];
  posterImage: string;
  backdropImage: string;
  synopsis: string;
  directorOrCreator?: string;
  cast: string[];
  trailerUrl?: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: 'Sports Championship' | 'Esports Grand Final' | 'Concert & Entertainment' | 'Motorsport';
  date: string;
  time: string;
  venue: string;
  city: string;
  country: string;
  coverImage: string;
  description: string;
  ticketPriceStartingFrom: number;
  currency: string;
  ticketTiers: {
    id: string;
    name: string;
    price: number;
    description: string;
    available: boolean;
  }[];
  featured?: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  category: 'sports' | 'entertainment';
  totalVotes: number;
  options: PollOption[];
  endsAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: 'sports' | 'entertainment';
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: QuizQuestion[];
}

export interface CommentItem {
  id: string;
  authorName: string;
  authorTag?: string;
  avatar: string;
  timestamp: string;
  text: string;
  likes: number;
  topic: string;
  isReported?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'jerseys' | 'headwear' | 'accessories' | 'gaming';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  sizes?: string[];
  inStock: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  selectedSize?: string;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  timestamp: string;
  paymentMethod: string;
}
