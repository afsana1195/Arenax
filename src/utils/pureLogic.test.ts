import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCartTotals,
  calculateQuizScore,
  calculatePollPercentages,
  filterMatches,
  filterArticles,
  isValidEmail,
} from './pureLogic';
import { CartItem, Match, Article, QuizQuestion, PollOption } from '../types';

test('calculateCartTotals computes subtotal, coupon discount, tax and shipping correctly', () => {
  const mockItem1: CartItem = {
    product: {
      id: 'p1',
      name: 'Pro Jersey',
      category: 'jerseys',
      price: 50,
      rating: 4.8,
      reviewCount: 120,
      image: '',
      description: 'Jersey',
      inStock: true,
    },
    quantity: 1,
  };

  // Cart < $75 without coupon -> $50 + $9.99 shipping + $4.00 tax (8%) = $63.99
  const res1 = calculateCartTotals([mockItem1]);
  assert.equal(res1.subtotal, 50);
  assert.equal(res1.discount, 0);
  assert.equal(res1.shipping, 9.99);
  assert.equal(res1.tax, 4);
  assert.equal(res1.total, 63.99);

  // Cart with ARENA10 coupon code (10% off)
  const res2 = calculateCartTotals([mockItem1], 'arena10');
  assert.equal(res2.subtotal, 50);
  assert.equal(res2.discount, 5); // 10% of 50
  assert.equal(res2.shipping, 9.99);
  assert.equal(res2.tax, 3.6); // 8% of 45
  assert.equal(res2.total, 58.59);

  // Cart >= $75 qualifies for free shipping
  const mockItem2: CartItem = {
    product: {
      id: 'p2',
      name: 'Special Edition Hood',
      category: 'jerseys',
      price: 80,
      rating: 4.9,
      reviewCount: 40,
      image: '',
      description: 'Hoodie',
      inStock: true,
    },
    quantity: 1,
  };
  const res3 = calculateCartTotals([mockItem2]);
  assert.equal(res3.shipping, 0); // Free shipping threshold >= $75
  assert.equal(res3.total, 86.4); // 80 + 0 + 6.40
});

test('calculateQuizScore evaluates correct answers, percentages, and performance grades', () => {
  const mockQuestions: QuizQuestion[] = [
    { id: 'q1', question: 'Question 1', options: ['A', 'B', 'C', 'D'], correctIndex: 1, explanation: 'Exp 1' },
    { id: 'q2', question: 'Question 2', options: ['A', 'B', 'C', 'D'], correctIndex: 3, explanation: 'Exp 2' },
    { id: 'q3', question: 'Question 3', options: ['A', 'B', 'C', 'D'], correctIndex: 0, explanation: 'Exp 3' },
    { id: 'q4', question: 'Question 4', options: ['A', 'B', 'C', 'D'], correctIndex: 2, explanation: 'Exp 4' },
    { id: 'q5', question: 'Question 5', options: ['A', 'B', 'C', 'D'], correctIndex: 0, explanation: 'Exp 5' },
  ];

  // Perfect 5/5
  const perfectAnswers = { q1: 1, q2: 3, q3: 0, q4: 2, q5: 0 };
  const res1 = calculateQuizScore(perfectAnswers, mockQuestions);
  assert.equal(res1.score, 5);
  assert.equal(res1.percentage, 100);
  assert.equal(res1.grade, 'Champion');

  // 4/5 (80%)
  const goodAnswers = { q1: 1, q2: 3, q3: 0, q4: 2, q5: 3 }; // q5 wrong
  const res2 = calculateQuizScore(goodAnswers, mockQuestions);
  assert.equal(res2.score, 4);
  assert.equal(res2.percentage, 80);
  assert.equal(res2.grade, 'Pro');

  // 1/5 (20%)
  const lowAnswers = { q1: 1, q2: 0, q3: 1, q4: 0, q5: 1 };
  const res3 = calculateQuizScore(lowAnswers, mockQuestions);
  assert.equal(res3.score, 1);
  assert.equal(res3.percentage, 20);
  assert.equal(res3.grade, 'Rookie');
});

test('calculatePollPercentages handles vote allocations safely', () => {
  const options: PollOption[] = [
    { id: 'opt1', text: 'Real Madrid', votes: 60 },
    { id: 'opt2', text: 'Manchester City', votes: 40 },
  ];

  const res = calculatePollPercentages(options);
  assert.equal(res[0].percentage, 60);
  assert.equal(res[1].percentage, 40);

  // Safe against 0 votes
  const emptyOptions: PollOption[] = [
    { id: 'opt1', text: 'A', votes: 0 },
    { id: 'opt2', text: 'B', votes: 0 },
  ];
  const emptyRes = calculatePollPercentages(emptyOptions);
  assert.equal(emptyRes[0].percentage, 0);
  assert.equal(emptyRes[1].percentage, 0);
});

test('filterMatches filters accurately by sport, status and search query', () => {
  const mockMatches: Match[] = [
    {
      id: 'm1',
      sport: 'cricket',
      league: 'T20 World Cup',
      status: 'live',
      startTime: '2026-10-24T14:00:00Z',
      venue: 'Melbourne Cricket Ground',
      homeTeam: { name: 'India', shortName: 'IND', logo: '' },
      awayTeam: { name: 'Australia', shortName: 'AUS', logo: '' },
      statusDetail: '18.4 Overs',
      isDemo: true,
    },
    {
      id: 'm2',
      sport: 'football',
      league: 'UEFA Champions League',
      status: 'upcoming',
      startTime: '2026-10-25T19:00:00Z',
      venue: 'Santiago Bernabeu',
      homeTeam: { name: 'Real Madrid', shortName: 'RMA', logo: '' },
      awayTeam: { name: 'Man City', shortName: 'MCI', logo: '' },
      statusDetail: 'Tomorrow 20:00',
      isDemo: true,
    },
  ];

  const cricketOnly = filterMatches(mockMatches, { sport: 'cricket' });
  assert.equal(cricketOnly.length, 1);
  assert.equal(cricketOnly[0].id, 'm1');

  const liveOnly = filterMatches(mockMatches, { status: 'live' });
  assert.equal(liveOnly.length, 1);
  assert.equal(liveOnly[0].id, 'm1');

  const searchMadrid = filterMatches(mockMatches, { search: 'madrid' });
  assert.equal(searchMadrid.length, 1);
  assert.equal(searchMadrid[0].id, 'm2');
});

test('isValidEmail validates emails correctly', () => {
  assert.equal(isValidEmail('fan@arenax.com'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail(''), false);
});
