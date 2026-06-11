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
    "Hey! I'm Saha — Harish Sabari's AI companion. What would you like to know about him?",
    "Hello! Saha here. I can walk you through Harish Sabari's work, skills, and experience. What are you curious about?",
    "Hi there! Think of me as Harish Sabari's digital side — happy to answer anything. Where would you like to start?",
  ],
  skills: [
    "Harish Sabari codes in Java, Python, and C. On the ML side he works with TensorFlow, Scikit-Learn, OpenCV, NumPy, and Pandas. For the web he uses React, Node.js, Express.js, MongoDB, and MySQL.",
    "His stack: Languages — Java, Python, C. ML/AI — TensorFlow, Scikit-Learn, OpenCV, NumPy, Pandas. Full Stack — React, Node.js, Express.js, MongoDB, MySQL. Tools — Git, Jupyter Notebook, ServiceNow.",
    "Core strengths are AI/ML and full-stack development. Python is his go-to for machine learning and computer vision work; React + Node.js for the web layer. He also knows ServiceNow from his internship.",
  ],
  projects: [
    "Four key projects: Safina (women safety app with real-time location + emergency alerts), Live Vision (YOLO-based real-time object detection), Nomad Visa Hub (ServiceNow visa management portal), and an AI Expense Tracker. Scroll to Projects for links.",
    "His most technical project is Live Vision — real-time YOLO object detection on live video streams. Safina is the most impactful — emergency safety platform with GPS tracking and escalation logic.",
    "Safina and Live Vision are on GitHub. Nomad Visa Hub was built on ServiceNow during his internship. The Expense Tracker uses AI-based workflows for automated financial analysis.",
  ],
  experience: [
    "Harish Sabari did a ServiceNow internship from January to April 2026 — covering ITSM, Flow Designer, App Engine Studio, and AI-powered workflow automation. He also freelanced, delivering a live client website (firstinalltime.in).",
    "Two roles: ServiceNow Intern (Jan–Apr 2026) where he built low-code apps and automation workflows, and freelance web development where he handled the full project lifecycle for a client.",
  ],
  contact: [
    "Best way to reach Harish Sabari: harish23alr@gmail.com. Also active on LinkedIn (harish-sabari-130hssh) and GitHub (Harish-sabari-130). Contact form is at the bottom of this page.",
    "Drop him a message using the Contact form below, or email harish23alr@gmail.com directly. He's also on LinkedIn.",
  ],
  hire: [
    "Yes — Harish Sabari is open to roles in AI/ML engineering and full-stack development. He's particularly interested in AI-first products and real-world problem solving.",
    "Absolutely open to the right opportunity. He's currently pursuing B.Tech AIML and building his skills across ML, computer vision, and full-stack dev. Reach out via the Contact section.",
  ],
  certifications: [
    "Two Oracle certifications: Java SE 17 Developer and Oracle APEX Cloud Developer. Both verified — you can click the cards in the Certifications section to view them on Google Drive.",
    "Harish Sabari holds Oracle Java SE 17 Developer and Oracle APEX Cloud Developer certifications. The Certifications section has direct links to view them.",
  ],
  about: [
    "Harish Sabari P V — B.Tech AI & Machine Learning student at Kongu Engineering College (2023–2027). He builds practical AI applications, computer vision systems, and full-stack web apps.",
    "AI/ML student and developer from Tamil Nadu, India. He's worked on women safety apps, real-time object detection, ServiceNow automation, and freelance web projects. Driven by real-world impact.",
    "He's passionate about applying AI to solve real problems — from computer vision pipelines to workflow automation. Kongu Engineering College, AIML specialization, currently building and learning.",
  ],
  ai: [
    "AI/ML is his main focus — specifically computer vision (YOLO, OpenCV), machine learning (TensorFlow, Scikit-Learn), and intelligent workflow automation via ServiceNow. He built Live Vision as a real-world computer vision project.",
    "He works with TensorFlow, Scikit-Learn, OpenCV, NumPy, and Pandas for ML/AI work. His computer vision project (Live Vision) uses YOLO for real-time object detection on live video streams.",
  ],
  resume: [
    "You can download Harish Sabari's resume using the '[ DOWNLOAD CV ]' button in the hero section at the top of the page.",
    "His resume is available via the Download CV button at the top. It opens directly from Google Drive.",
  ],
  default: [
    "Good question. I can tell you about Harish Sabari's skills, projects, experience, certifications, or how to get in touch. What interests you?",
    "Try asking about his tech stack, projects, or experience — or just say hi. I'll give you the real picture.",
    "Happy to help. Ask me about his AI work, full-stack dev, ServiceNow internship, or anything else on the portfolio.",
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

/* ── SAHA pixel-art avatar ── */
function SAHAFace({ isActive, isHovered, size = 'md' }: {
  isActive: boolean;
  isHovered: boolean;
  size?: 'sm' | 'md';
}) {
  const d = size === 'sm' ? 24 : 76;

  return (
    <div
      className="relative rounded-full saha-breathe flex-shrink-0 overflow-hidden"
      style={{
        width: d,
        height: d,
        background: '#05111e',
        boxShadow: isHovered
          ? '0 0 0 2px #00d4ff, 0 0 24px rgba(0,212,255,0.8), 0 0 48px rgba(0,212,255,0.3)'
          : `0 0 0 1.5px rgba(0,212,255,${isActive ? '0.8' : '0.4'}), 0 0 14px rgba(0,212,255,0.25)`,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Pixel-art character — fills circle, head at top */}
      <img
        src="/saha-pixel.png"
        alt="SAHA"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 5%',
          imageRendering: 'pixelated',
        }}
      />

      {/* Holographic cyan wash */}
      <div className="absolute inset-0 rounded-full pointer-events-none" style={{
        background: 'linear-gradient(160deg, rgba(0,180,255,0.15) 0%, rgba(0,80,200,0.08) 50%, rgba(100,40,220,0.12) 100%)',
        mixBlendMode: 'screen',
      }} />

      {/* Left edge glow */}
      <div className="absolute inset-y-0 left-0 w-[18%] pointer-events-none" style={{
        background: 'linear-gradient(to right, rgba(0,212,255,0.35), transparent)',
      }} />

      {/* Right edge glow */}
      <div className="absolute inset-y-0 right-0 w-[18%] pointer-events-none" style={{
        background: 'linear-gradient(to left, rgba(124,58,237,0.3), transparent)',
      }} />

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-[22%] rounded-b-full pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(5,8,22,0.75), transparent)',
      }} />

      {/* Scan-line overlay */}
      <div className="absolute inset-0 rounded-full pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.04) 2px, rgba(0,212,255,0.04) 3px)',
        backgroundSize: '100% 4px',
      }} />

      {/* Sweep line */}
      <div className="absolute left-0 right-0 h-[1.5px] saha-scanline pointer-events-none" style={{
        background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)',
      }} />

      {/* Dashed outer ring */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none"
          stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.4"
          strokeDasharray="5 3"/>
      </svg>

      {/* Status dot */}
      {size === 'md' && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full pointer-events-none" style={{
          background: '#00d4ff',
          boxShadow: '0 0 6px #00d4ff',
          opacity: isActive ? 1 : 0.4,
        }} />
      )}
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
      content: "Hey — I'm Saha, Harish Sabari's AI companion. Ask me anything about his skills, projects, or experience.",
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
                <div className="flex-shrink-0">
                  <SAHAFace isActive={true} isHovered={false} size="sm" />
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
                    <div className="flex-shrink-0 mb-0.5">
                      <SAHAFace isActive={true} isHovered={false} size="sm" />
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
                  <div className="flex-shrink-0">
                    <SAHAFace isActive={true} isHovered={false} size="sm" />
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
            <div className="flex-shrink-0"><SAHAFace isActive={true} isHovered={false} size="sm" /></div>
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
