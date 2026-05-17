import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minus, ChevronDown } from 'lucide-react';

interface Message {
  role: 'ai' | 'user';
  content: string;
  timestamp?: Date;
}

const RESPONSES: Record<string, string[]> = {
  greeting: [
    "Hey! I'm Saha — Harish's AI companion. What would you like to know about him?",
    "Hello! Saha here. I can walk you through Harish's work, skills, and experience. What are you curious about?",
    "Hi there! Think of me as Harish's digital side — happy to answer anything. Where would you like to start?",
  ],
  skills: [
    "Harish is strong across the full stack — Python, TypeScript, React, Node.js on the engineering side, and TensorFlow, PyTorch, LangChain for AI work. He bridges both worlds naturally.",
    "Frontend: React, Next.js, Tailwind, Framer Motion. Backend: FastAPI, Node.js, Express. AI: TensorFlow, PyTorch, LangChain, OpenCV. Databases: PostgreSQL, MongoDB, Redis. That's the short version.",
    "His core strengths are full-stack development and AI/ML engineering — Python and TypeScript are his go-to languages. He's particularly sharp with LLM integration and production-grade systems.",
  ],
  projects: [
    "He's shipped 15+ projects. Highlights: NeuralChat AI (real-time LLM chat), CodeVision (AI-powered code analysis), DeepSight (computer vision dashboard), and DataNexus (analytics platform). Scroll down to Projects for details.",
    "Quite a range — from conversational AI systems to computer vision tools to full-stack SaaS products. Each one solves a real problem. Check the Projects section below for live demos.",
    "His project work spans LLM apps, vision models, and developer tooling. NeuralChat and DeepSight are probably the most interesting technically. Want to know more about any specific one?",
  ],
  experience: [
    "Two meaningful internships so far: React/Node.js development at TechCorp Solutions, and NLP + computer vision model work at AI Innovations Lab using PyTorch and FastAPI. Real production experience, not just coursework.",
    "He's done hands-on engineering work — frontend at TechCorp, AI model development at AI Innovations Lab. Both roles involved shipping to production, not just prototypes.",
  ],
  contact: [
    "Best way to reach him: harish@example.com. Also active on LinkedIn and GitHub — links are in the Contact section at the bottom.",
    "Drop him a message via the Contact form below. He responds fast. You can also connect on LinkedIn directly.",
  ],
  hire: [
    "Yes — he's actively open to roles in AI engineering and full-stack development. Particularly drawn to AI-first products and high-impact engineering teams.",
    "Absolutely open to the right opportunity. He's looking for work at the intersection of AI and great engineering. Reach out via the Contact section.",
  ],
  certifications: [
    "Certified in AWS Cloud Practitioner, TensorFlow Developer (Google), React Advanced (Meta), and a few others. All earned through actual study, not just paid for.",
    "His certifications cover cloud architecture, deep learning, and frontend engineering. Check the Certifications section for the complete list with badges.",
  ],
  about: [
    "Harish Sabari P V — B.Tech in CSE with an AI/ML specialization. He builds things at the intersection of intelligent systems and great user experiences. This portfolio is a pretty good example of that.",
    "Full-stack developer and AI engineer. He cares a lot about the craft — both the technical depth and the experience layer. That's why this portfolio feels the way it does.",
    "He's driven by the challenge of making AI systems that actually feel good to use. Engineering under the hood, design on the surface.",
  ],
  ai: [
    "AI is his main interest — specifically LLM applications, computer vision, and building AI products that feel intuitive. He's been building in this space since before it was trendy.",
    "He works with TensorFlow, PyTorch, LangChain, and various vision frameworks. His focus is applied AI — systems that solve real problems and integrate cleanly into products.",
  ],
  resume: [
    "You can grab his resume using the 'Download Resume' button in the hero section at the top of the page.",
    "His resume is available via the Download button at the top. It's up to date.",
  ],
  default: [
    "Good question. I can tell you about Harish's skills, projects, experience, certifications, or how to get in touch. What interests you?",
    "Try asking about his tech stack, projects, or experience — or just say hi. I'll give you the real picture.",
    "Happy to help. Ask me about his AI work, frontend engineering, internships, or anything else on the portfolio.",
  ],
};

function getReply(input: string): string {
  const text = input.toLowerCase();
  let category = 'default';

  if (/\b(hi|hello|hey|sup|greet|yo)\b/.test(text)) category = 'greeting';
  else if (/\b(skill|tech|stack|language|tool|framework|python|react|typescript|node|tensorflow|pytorch)\b/.test(text)) category = 'skills';
  else if (/\b(project|work|portfolio|build|ship|create|demo)\b/.test(text)) category = 'projects';
  else if (/\b(experience|intern|job|role|company|work at)\b/.test(text)) category = 'experience';
  else if (/\b(contact|email|reach|connect|message|dm)\b/.test(text)) category = 'contact';
  else if (/\b(hire|available|opportunity|recruit|position|open to)\b/.test(text)) category = 'hire';
  else if (/\b(cert|certification|certificate|aws|google|meta)\b/.test(text)) category = 'certifications';
  else if (/\b(about|who|harish|person|background|bio)\b/.test(text)) category = 'about';
  else if (/\b(ai|ml|machine learning|llm|gpt|vision|model|neural|deep learning)\b/.test(text)) category = 'ai';
  else if (/\b(resume|cv|download)\b/.test(text)) category = 'resume';

  const opts = RESPONSES[category];
  return opts[Math.floor(Math.random() * opts.length)];
}

function SAHAFace({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  return (
    <div className={`relative transition-all duration-500 ${isActive ? 'saha-breathe' : ''}`}>
      <svg
        viewBox="0 0 100 118"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ filter: `drop-shadow(0 0 ${isHovered ? '12' : '6'}px rgba(0,212,255,0.5))` }}
      >
        <defs>
          <radialGradient id="sahaFaceBg" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#0d2040" />
            <stop offset="70%" stopColor="#080f1e" />
            <stop offset="100%" stopColor="#050816" />
          </radialGradient>
          <radialGradient id="sahaEyeL" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#00d4ff" />
            <stop offset="70%" stopColor="#0055cc" />
            <stop offset="100%" stopColor="#001a4d" stopOpacity="0.3" />
          </radialGradient>
          <radialGradient id="sahaEyeR" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#bd93f9" />
            <stop offset="70%" stopColor="#6e3da8" />
            <stop offset="100%" stopColor="#200a40" stopOpacity="0.3" />
          </radialGradient>
          <radialGradient id="sahaForehead" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </radialGradient>
          <filter id="sahaGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="sahaEyeGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="faceClip">
            <ellipse cx="50" cy="62" rx="33" ry="44" />
          </clipPath>
        </defs>

        {/* Outer ambient glow */}
        <ellipse cx="50" cy="60" rx="46" ry="55" fill="none" stroke={isHovered ? '#00d4ff' : 'transparent'}
          strokeWidth="0.3" strokeOpacity="0.4" />
        <ellipse cx="50" cy="60" rx="42" ry="51" fill="none" stroke="#00d4ff" strokeWidth="0.2" strokeOpacity="0.2" />

        {/* Face oval */}
        <ellipse cx="50" cy="62" rx="33" ry="44"
          fill="url(#sahaFaceBg)"
          stroke="#00d4ff" strokeWidth="0.7" strokeOpacity={isHovered ? 0.9 : 0.6} />

        {/* Edge lighting — left side (cyan) */}
        <path d="M17.5 30 Q16 62 18.5 92"
          stroke="#00d4ff" strokeWidth="1.5" fill="none"
          strokeOpacity="0.7" strokeLinecap="round"
          filter="url(#sahaGlow)" />

        {/* Edge lighting — right side (purple) */}
        <path d="M82.5 30 Q84 62 81.5 92"
          stroke="#bd93f9" strokeWidth="1.5" fill="none"
          strokeOpacity="0.7" strokeLinecap="round"
          filter="url(#sahaGlow)" />

        {/* Hair — dark mass at top */}
        <ellipse cx="50" cy="22" rx="32" ry="24" fill="#0e0820" />
        <ellipse cx="50" cy="24" rx="28" ry="20" fill="#140d28" />
        {/* Hair detail lines */}
        <path d="M26 28 Q38 20 50 18 Q62 20 74 28" stroke="#00d4ff"
          strokeWidth="0.4" fill="none" strokeOpacity="0.2" />
        <path d="M30 32 Q40 24 50 22 Q60 24 70 32" stroke="#bd93f9"
          strokeWidth="0.3" fill="none" strokeOpacity="0.15" />

        {/* Forehead glow */}
        <ellipse cx="50" cy="40" rx="22" ry="5" fill="url(#sahaForehead)" />

        {/* Left eyebrow */}
        <path d="M28 50 Q35 46 43 49"
          stroke="#00d4ff" strokeWidth="1.1" fill="none"
          strokeOpacity="0.6" strokeLinecap="round" />

        {/* Right eyebrow */}
        <path d="M57 49 Q65 46 72 50"
          stroke="#bd93f9" strokeWidth="1.1" fill="none"
          strokeOpacity="0.6" strokeLinecap="round" />

        {/* Left eye */}
        <g filter="url(#sahaEyeGlow)" className="saha-blink-l">
          <circle cx="35" cy="57" r="6.5" fill="url(#sahaEyeL)" />
          <circle cx="35" cy="57" r="3.8" fill="#020b16" />
          <circle cx="35" cy="57" r="1.8" fill="#00d4ff" opacity="0.9" />
          <circle cx="36.5" cy="55.5" r="0.9" fill="white" opacity="0.95" />
        </g>

        {/* Right eye */}
        <g filter="url(#sahaEyeGlow)" className="saha-blink-r">
          <circle cx="65" cy="57" r="6.5" fill="url(#sahaEyeR)" />
          <circle cx="65" cy="57" r="3.8" fill="#0a0518" />
          <circle cx="65" cy="57" r="1.8" fill="#bd93f9" opacity="0.9" />
          <circle cx="66.5" cy="55.5" r="0.9" fill="white" opacity="0.95" />
        </g>

        {/* Nose bridge — subtle */}
        <path d="M50 65 L47.5 74 Q50 76 52.5 74 L50 65"
          stroke="rgba(0,212,255,0.22)" strokeWidth="0.9"
          fill="rgba(0,212,255,0.04)" strokeLinecap="round" strokeLinejoin="round" />

        {/* Lips */}
        <path d="M38 83 Q44 87 50 86 Q56 87 62 83"
          stroke="rgba(0,212,255,0.55)" strokeWidth="1.1"
          fill="rgba(0,212,255,0.07)" strokeLinecap="round" />
        <path d="M43 83 Q50 85 57 83"
          stroke="rgba(189,147,249,0.35)" strokeWidth="0.7"
          fill="none" strokeLinecap="round" />

        {/* Chin highlight */}
        <ellipse cx="50" cy="98" rx="10" ry="3" fill="rgba(0,212,255,0.09)" />

        {/* Horizontal scan lines clipped to face */}
        <g clipPath="url(#faceClip)" opacity="0.06">
          {Array.from({ length: 22 }, (_, i) => (
            <line key={i} x1="17" y1={18 + i * 4} x2="83" y2={18 + i * 4}
              stroke="#00d4ff" strokeWidth="0.4" />
          ))}
        </g>

        {/* Moving scan line */}
        <line x1="17" y1="18" x2="83" y2="18"
          stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.5"
          className="saha-scanline" />

        {/* Collar / neck base */}
        <path d="M34 106 Q50 110 66 106 L64 118 L36 118 Z"
          fill="#0d1628" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.4" />

        {/* Shoulder hint */}
        <path d="M20 118 Q32 108 50 110 Q68 108 80 118"
          stroke="#00d4ff" strokeWidth="0.6" fill="none" strokeOpacity="0.3" />

        {/* Status dot in face (chin area) */}
        <circle cx="50" cy="113" r="1.2" fill="#00d4ff" opacity={isActive ? 1 : 0.4}
          style={{ filter: 'drop-shadow(0 0 3px #00d4ff)' }} />
      </svg>
    </div>
  );
}

export default function AIAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: "Hey — I'm Saha, Harish's AI companion. Ask me anything about his skills, projects, or experience.",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized) scrollToBottom();
  }, [messages, isOpen, isMinimized, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages(prev => [...prev, { role: 'user', content: text, timestamp: new Date() }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'ai',
        content: getReply(text),
        timestamp: new Date(),
      }]);
    }, 700 + Math.random() * 400);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.94 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed right-[104px] bottom-4 w-[360px] max-w-[calc(100vw-120px)] z-50 flex flex-col"
            style={{
              height: 'min(520px, calc(100vh - 80px))',
              background: 'rgba(5,8,22,0.92)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(0,212,255,0.25)',
              borderRadius: '16px',
              boxShadow: '0 8px 48px rgba(0,212,255,0.15), inset 0 1px 0 rgba(0,212,255,0.1)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(0,212,255,0.15)]"
              style={{ background: 'rgba(0,212,255,0.05)' }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-8 flex-shrink-0">
                  <SAHAFace isActive={true} isHovered={false} />
                </div>
                <div>
                  <div className="font-mono font-bold text-white text-sm tracking-wider">SAHA</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_4px_#00d4ff]"
                      style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    <span className="text-[10px] text-[#00d4ff] font-mono tracking-widest">ONLINE</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 text-white/40 hover:text-white/80 transition-colors rounded"
                  data-interactive="true"
                  title="Minimize"
                >
                  <Minus size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-white/40 hover:text-red-400 transition-colors rounded"
                  data-interactive="true"
                  title="Close"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,212,255,0.2) transparent' }}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {msg.role === 'ai' && (
                    <div className="w-5 h-6 flex-shrink-0 mb-0.5">
                      <SAHAFace isActive={true} isHovered={false} />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] px-3 py-2.5 rounded-xl leading-relaxed ${
                      msg.role === 'user'
                        ? 'text-white rounded-br-sm'
                        : 'text-white/90 rounded-bl-sm border border-[rgba(0,212,255,0.15)]'
                    }`}
                    style={msg.role === 'user'
                      ? { background: 'linear-gradient(135deg, #0066ff, #7c3aed)' }
                      : { background: 'rgba(0,212,255,0.06)' }
                    }
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-5 h-6 flex-shrink-0">
                    <SAHAFace isActive={true} isHovered={false} />
                  </div>
                  <div className="px-3 py-2.5 rounded-xl rounded-bl-sm border border-[rgba(0,212,255,0.15)]"
                    style={{ background: 'rgba(0,212,255,0.06)' }}>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]"
                          style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts */}
            <div className="px-4 py-2 flex gap-2 flex-wrap border-t border-[rgba(0,212,255,0.1)]">
              {['Skills', 'Projects', 'Experience', 'Contact'].map(prompt => (
                <button
                  key={prompt}
                  onClick={() => {
                    setInput(prompt);
                    setTimeout(() => {
                      const ev = { preventDefault: () => {} } as React.FormEvent;
                      setMessages(prev => [...prev, { role: 'user', content: prompt, timestamp: new Date() }]);
                      setInput('');
                      setIsTyping(true);
                      setTimeout(() => {
                        setIsTyping(false);
                        setMessages(prev => [...prev, { role: 'ai', content: getReply(prompt.toLowerCase()), timestamp: new Date() }]);
                      }, 600);
                    }, 10);
                  }}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-[rgba(0,212,255,0.25)] text-[#00d4ff]/70 hover:text-[#00d4ff] hover:border-[rgba(0,212,255,0.6)] hover:bg-[rgba(0,212,255,0.06)] transition-all"
                  data-interactive="true"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-[rgba(0,212,255,0.15)]"
              style={{ background: 'rgba(0,212,255,0.03)' }}>
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask Saha anything..."
                  className="flex-1 bg-[rgba(0,212,255,0.06)] border border-[rgba(0,212,255,0.2)] focus:border-[rgba(0,212,255,0.6)] focus:outline-none px-3 py-2 rounded-lg text-white placeholder-white/30 text-sm transition-all"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
                  style={{ background: 'linear-gradient(135deg, #00d4ff, #0066ff)' }}
                  data-interactive="true"
                >
                  <Send size={15} color="white" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized bar */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed right-[104px] bottom-4 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full cursor-pointer"
            style={{
              background: 'rgba(5,8,22,0.92)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,212,255,0.3)',
              boxShadow: '0 4px 24px rgba(0,212,255,0.15)',
            }}
            onClick={() => setIsMinimized(false)}
            data-interactive="true"
          >
            <div className="w-5 h-6"><SAHAFace isActive={true} isHovered={false} /></div>
            <span className="text-xs font-mono text-[#00d4ff] tracking-wider">SAHA</span>
            <ChevronDown size={12} className="text-[#00d4ff]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SAHA Avatar Button — always visible */}
      <motion.div
        className="fixed right-4 bottom-4 z-50 flex flex-col items-center cursor-pointer select-none"
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        data-interactive="true"
      >
        {/* Glow rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.15], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeOut' }}
            className="absolute w-20 h-20 rounded-full border border-[#00d4ff]"
          />
          <motion.div
            animate={{ scale: [1, 1.25], opacity: [0.3, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.8, ease: 'easeOut' }}
            className="absolute w-20 h-20 rounded-full border border-[#bd93f9]"
          />
        </div>

        {/* Avatar container */}
        <div
          className="relative w-[72px] h-[86px] transition-all duration-300"
          style={{
            filter: isHovered
              ? 'drop-shadow(0 0 16px rgba(0,212,255,0.7))'
              : 'drop-shadow(0 0 8px rgba(0,212,255,0.4))',
            transform: isHovered ? 'scale(1.07)' : 'scale(1)',
          }}
        >
          <SAHAFace isActive={true} isHovered={isHovered} />
        </div>

        {/* Label */}
        <div className="mt-1 flex flex-col items-center">
          <span className="text-[9px] font-mono font-bold tracking-[0.2em]"
            style={{ color: '#00d4ff', textShadow: '0 0 8px #00d4ff' }}>
            SAHA
          </span>
          <span className="text-[7px] font-mono tracking-wider"
            style={{ color: 'rgba(0,212,255,0.5)' }}>
            {isOpen ? '[ CLOSE ]' : '[ TALK ]'}
          </span>
        </div>
      </motion.div>
    </>
  );
}
