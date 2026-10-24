import React, { useState } from 'react';
import { Quiz } from '../../types';
import { calculateQuizScore } from '../../utils/pureLogic';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, XCircle, Trophy, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';

interface QuizModalProps {
  quiz: Quiz | null;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ quiz, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [answeredCurrent, setAnsweredCurrent] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!quiz) return null;

  const currentQ = quiz.questions[currentIdx];
  const total = quiz.questions.length;

  const handleSelectOption = (optionIndex: number) => {
    if (answeredCurrent) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
    setAnsweredCurrent(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 < total) {
      setCurrentIdx((prev) => prev + 1);
      setAnsweredCurrent(false);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00d2ff', '#fbbf24', '#3b82f6', '#ec4899'],
        });
      } catch {
        // ignore
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setAnsweredCurrent(false);
    setIsCompleted(false);
  };

  const scoreResult = calculateQuizScore(selectedAnswers, quiz.questions);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#0c101a] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900/90 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 id="quiz-modal-title" className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
              {quiz.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close quiz dialog"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isCompleted ? (
            /* Results Screen */
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500/20 to-cyan-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-xl">
                <Trophy className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 border border-amber-500/40 text-amber-300">
                  {scoreResult.grade} Level
                </span>
                <h3 className="font-display text-4xl font-black text-white uppercase tracking-wider mt-2">
                  You Scored {scoreResult.score} / {scoreResult.total} ({scoreResult.percentage}%)
                </h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto mt-2">
                  {scoreResult.percentage >= 80
                    ? 'Phenomenal knowledge! You have genuine champion instincts.'
                    : scoreResult.percentage >= 50
                    ? 'Solid performance! You know your sports and cinema culture.'
                    : 'Good attempt! Test your knowledge again to climb the ranks.'}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 hover:text-white hover:border-slate-600 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-colors shadow-lg shadow-cyan-500/20"
                >
                  Complete &amp; Return
                </button>
              </div>
            </div>
          ) : (
            /* Active Question */
            <div className="space-y-6">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>Question {currentIdx + 1} of {total}</span>
                  <span className="text-cyan-400 font-mono">
                    {Math.round(((currentIdx) / total) * 100)}% Complete
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((optText, optIdx) => {
                  const isSelected = selectedAnswers[currentQ.id] === optIdx;
                  const isCorrect = optIdx === currentQ.correctIndex;

                  let btnClasses =
                    'border-slate-800 bg-slate-900/70 text-slate-200 hover:bg-slate-800/80 hover:border-slate-700';

                  if (answeredCurrent) {
                    if (isCorrect) {
                      btnClasses = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200';
                    } else if (isSelected && !isCorrect) {
                      btnClasses = 'border-red-500/60 bg-red-950/40 text-red-200';
                    } else {
                      btnClasses = 'border-slate-800/50 bg-slate-900/30 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={answeredCurrent}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${btnClasses}`}
                    >
                      <span>{optText}</span>
                      {answeredCurrent && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {answeredCurrent && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {answeredCurrent && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-2 animate-fadeIn">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
                    Behind the Trivia
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Next Button */}
              {answeredCurrent && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                  >
                    <span>{currentIdx + 1 === total ? 'View Score Recap' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
