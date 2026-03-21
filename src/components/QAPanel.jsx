import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { qaService } from '../services/apiService';
import { FiX, FiSend } from 'react-icons/fi';

export const QAPanel = ({ paperId, onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const scrollRef = useRef(null);

  // --- FIX 1: Auto-scroll to bottom when new answers arrive ---
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [questions]);

  // --- FIX 2: Initialize Session only if paperId exists ---
  const initializeSession = async () => {
    if (!paperId) return;
    try {
      const response = await qaService.createSession(paperId);
      // Ensure we match the backend key (response.data.id or response.data.session_id)
      const sid = response.data.id || response.data.session_id;
      setSessionId(sid);
      console.log("Session Initialized:", sid);
    } catch (error) {
      console.error("QA Session Error:", error);
      toast.error('Failed to initialize AI assistant');
    }
  };

  useEffect(() => {
    initializeSession();
    // Reset questions when switching papers
    setQuestions([]);
  }, [paperId]);

  const handleAskQuestion = async () => {
    if (!currentQuestion.trim()) return;
    
    if (!sessionId) {
      toast.error('Assistant not ready. Retrying...');
      await initializeSession();
      return;
    }

    setIsLoading(true);
    try {
      const response = await qaService.askQuestion(paperId, sessionId, currentQuestion);
      
      // FIX 3: Append the new Q&A pair to the list properly
      const newEntry = {
        id: Date.now(), // Fallback ID if backend doesn't provide one
        question: currentQuestion,
        answer: response.data.answer,
        confidence_score: response.data.confidence_score || 0.85
      };

      setQuestions((prev) => [...prev, newEntry]);
      setCurrentQuestion('');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to get answer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* FIX 4: Ensure high z-index and explicit positioning */
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gray-900 shadow-2xl border-l border-gray-700 z-[100] flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800">
        <div>
          <h3 className="text-lg font-bold text-white">AI Research Assistant</h3>
          <p className="text-xs text-blue-400">Session: {sessionId ? 'Active' : 'Connecting...'}</p>
        </div>
        <button 
          onClick={onClose} 
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {questions.length === 0 && !isLoading && (
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">Ask anything about the document content, methodology, or results.</p>
          </div>
        )}

        {questions.map((q) => (
          <div key={q.id} className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-blue-600/20 border border-blue-500/30 p-3 rounded-2xl rounded-tr-none ml-8">
              <p className="text-sm font-medium text-blue-100">{q.question}</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 p-3 rounded-2xl rounded-tl-none mr-8">
              <p className="text-sm text-gray-300 leading-relaxed">{q.answer}</p>
              {q.confidence_score && (
                <div className="flex items-center mt-2 space-x-2">
                   <div className="h-1 w-16 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ width: `${q.confidence_score * 100}%` }}
                      ></div>
                   </div>
                   <span className="text-[10px] text-gray-500">
                     {(q.confidence_score * 100).toFixed(0)}% Match
                   </span>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex space-x-2 p-3 bg-gray-800 rounded-2xl w-16 justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="relative">
          <textarea
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAskQuestion();
              }
            }}
            placeholder="Type your question..."
            className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl p-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-24 text-sm"
          />
          <button
            onClick={handleAskQuestion}
            disabled={isLoading || !currentQuestion.trim()}
            className="absolute bottom-3 right-3 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 transition-all"
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};