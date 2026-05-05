'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Minimize2, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
};

const SUGGESTED_QUESTIONS = [
  'How do I find a tutor?',
  'What subjects are available?',
  'How does booking work?',
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: '0',
    role: 'assistant',
    content:
      "Hi there! 👋 I'm **Bridget**, your AI learning assistant. I can help you find the perfect tutor, explore subjects, or answer any questions about Skillbridge. What can I help you with today?",
    timestamp: new Date(),
  },
];

// Placeholder AI response — replace with OpenRouter integration later
function getMockResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  if (msg.includes('tutor') || msg.includes('find'))
    return "Great question! Head over to our **Tutors** page where you can filter by subject, rating, and price. Each tutor has a detailed profile with reviews and availability. Want me to guide you there?";
  if (msg.includes('subject') || msg.includes('categor'))
    return "We cover a wide range of subjects including **Web Development**, **Data Science**, **Languages**, **Mathematics**, **Design**, and more. Use the Subjects menu to browse all available categories!";
  if (msg.includes('book') || msg.includes('session'))
    return "Booking is simple! Visit a tutor's profile, choose an available time slot, and confirm your session. You'll receive a confirmation email and can manage all your bookings from your **Student Dashboard**.";
  if (msg.includes('price') || msg.includes('cost') || msg.includes('fee'))
    return "Pricing varies by tutor and is set by them individually. You can filter tutors by price on the Tutors page to find one that fits your budget.";
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey'))
    return "Hello! 😊 I'm here to help. Ask me anything about Skillbridge — finding tutors, booking sessions, or navigating the platform!";
  return "That's a great question! Our team is continuously improving Skillbridge. For detailed support, feel free to visit our **Contact** page and we'll get back to you within 24 hours. Is there anything else I can help with?";
}

function parseMarkdown(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
  );
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getMockResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      if (!isOpen) setUnread(u => u + 1);
    }, 1000 + Math.random() * 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[360px] rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-violet-500/10 border-b border-border/50">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-card" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm leading-none">Skill Assistant</h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary" />
                  Powered by AI · Online
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn('flex gap-2 items-end', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
                >
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center shrink-0 mb-1',
                    msg.role === 'assistant'
                      ? 'bg-gradient-to-br from-primary to-violet-600'
                      : 'bg-muted border border-border'
                  )}>
                    {msg.role === 'assistant'
                      ? <Bot className="w-3.5 h-3.5 text-white" />
                      : <User className="w-3.5 h-3.5 text-muted-foreground" />
                    }
                  </div>
                  <div className={cn(
                    'max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                    msg.role === 'assistant'
                      ? 'bg-muted/60 rounded-bl-sm text-foreground'
                      : 'bg-primary text-primary-foreground rounded-br-sm'
                  )}>
                    {parseMarkdown(msg.content)}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-2 items-end">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-muted/60 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-border/50 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-muted/40 border-border/50 focus-visible:ring-primary/30 text-sm h-10"
              />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 shrink-0 bg-gradient-to-br from-primary to-violet-600 hover:opacity-90"
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-violet-600 shadow-lg shadow-primary/30 flex items-center justify-center text-white hover:shadow-xl hover:shadow-primary/40 transition-shadow"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Minimize2 className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Bot className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread Badge */}
        {unread > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}

        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
        )}
      </motion.button>
    </div>
  );
}
