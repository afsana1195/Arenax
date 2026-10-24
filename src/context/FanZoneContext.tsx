import React, { createContext, useContext, useState, useEffect } from 'react';
import { Poll, CommentItem } from '../types';
import { MOCK_POLLS, MOCK_COMMENTS } from '../data/mockData';

interface FanZoneContextType {
  polls: Poll[];
  votedPolls: Record<string, string>; // pollId -> optionId
  votePoll: (pollId: string, optionId: string) => boolean;
  comments: CommentItem[];
  addComment: (authorName: string, text: string, topic: string) => boolean;
  likeComment: (commentId: string) => void;
  reportComment: (commentId: string) => void;
}

const FanZoneContext = createContext<FanZoneContextType | undefined>(undefined);

const VOTED_POLLS_KEY = 'arenax_voted_polls_v1';
const POLLS_DATA_KEY = 'arenax_polls_v1';
const COMMENTS_DATA_KEY = 'arenax_comments_v1';

export const FanZoneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [polls, setPolls] = useState<Poll[]>(() => {
    try {
      const saved = localStorage.getItem(POLLS_DATA_KEY);
      return saved ? JSON.parse(saved) : MOCK_POLLS;
    } catch {
      return MOCK_POLLS;
    }
  });

  const [votedPolls, setVotedPolls] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(VOTED_POLLS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [comments, setComments] = useState<CommentItem[]>(() => {
    try {
      const saved = localStorage.getItem(COMMENTS_DATA_KEY);
      return saved ? JSON.parse(saved) : MOCK_COMMENTS;
    } catch {
      return MOCK_COMMENTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(POLLS_DATA_KEY, JSON.stringify(polls));
    } catch (e) {
      console.warn('Failed saving polls', e);
    }
  }, [polls]);

  useEffect(() => {
    try {
      localStorage.setItem(VOTED_POLLS_KEY, JSON.stringify(votedPolls));
    } catch (e) {
      console.warn('Failed saving voted polls', e);
    }
  }, [votedPolls]);

  useEffect(() => {
    try {
      localStorage.setItem(COMMENTS_DATA_KEY, JSON.stringify(comments));
    } catch (e) {
      console.warn('Failed saving comments', e);
    }
  }, [comments]);

  const votePoll = (pollId: string, optionId: string): boolean => {
    if (votedPolls[pollId]) {
      return false; // Already voted
    }

    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id !== pollId) return poll;
        return {
          ...poll,
          totalVotes: poll.totalVotes + 1,
          options: poll.options.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          ),
        };
      })
    );

    setVotedPolls((prev) => ({
      ...prev,
      [pollId]: optionId,
    }));

    return true;
  };

  const addComment = (authorName: string, text: string, topic: string): boolean => {
    if (!authorName.trim() || !text.trim()) return false;

    // Basic profanity / spam check
    const prohibited = ['spamlink', 'freecrypto', 'scam'];
    const hasSpam = prohibited.some((w) => text.toLowerCase().includes(w));
    if (hasSpam) return false;

    const newComment: CommentItem = {
      id: `comm-${Date.now()}`,
      authorName: authorName.trim(),
      authorTag: 'Fan Community',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      timestamp: 'Just now',
      text: text.trim(),
      likes: 1,
      topic: topic.trim() || 'General Discussion',
    };

    setComments((prev) => [newComment, ...prev]);
    return true;
  };

  const likeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  const reportComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, isReported: true } : c))
    );
  };

  return (
    <FanZoneContext.Provider
      value={{
        polls,
        votedPolls,
        votePoll,
        comments,
        addComment,
        likeComment,
        reportComment,
      }}
    >
      {children}
    </FanZoneContext.Provider>
  );
};

export const useFanZone = () => {
  const context = useContext(FanZoneContext);
  if (!context) {
    throw new Error('useFanZone must be used within a FanZoneProvider');
  }
  return context;
};
