import { useEffect, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import CSSParticles from './CSSParticles';

const ROLES = [
  'Full Stack Developer',
  'AI / ML Engineer',
  'React Specialist',
  'Python Developer',
  'Open Source Builder',
];

/* ── holographic portrait panel ── */
function HolographicPortrait({ mousePos }: { mousePos: { x: number; y: number } }) {
  const tiltX = mousePos.y * -12;
  const tiltY = mousePos.x * 12;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, rotateY: 15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="relative w-full max-w-[380px] mx-auto hidden md:block"
      style={{ perspective: '900px' }}
    >
      {/* Outer glow halo */}
      <div className="absolute -inset-6 rounded-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,212,255,0.1), transparent 70%)',
        }}
      />

      {/* Portrait card */}
      <motion.div
        className="relative rounded-xl overflow-hidden"
        style={{
          aspectRatio: '3/4',
          background: 'linear-gradient(160deg, #0d1f3c 0%, #080f1e 60%, #0a0518 100%)',
          border: '1px solid rgba(0,212,255,0.3)',
          boxShadow: '0 0 60px rgba(0,212,255,0.15), inset 0 0 40px rgba(0,212,255,0.04)',
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.12s ease-out',
        }}
      >
        {/* Corner brackets */}
        {[
          'top-0 left-0 border-t-2 border-l-2',
          'top-0 right-0 border-t-2 border-r-2',
          'bottom-0 left-0 border-b-2 border-l-2',
          'bottom-0 right-0 border-b-2 border-r-2',
        ].map((cls, i) => (
          <div key={i} className={`absolute w-7 h-7 ${cls} border-[#00d4ff]`} />
        ))}

        {/* Portrait area — replace with <img> when photo is available */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Silhouette SVG — artistic placeholder until real photo is added */}
          <svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" className="w-[70%] h-auto opacity-90">
            <defs>
              <radialGradient id="portBg" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#0d2a4a" />
                <stop offset="100%" stopColor="#050816" />
              </radialGradient>
              <radialGradient id="skinGrad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#1e3a5a" />
                <stop offset="60%" stopColor="#0d2035" />
                <stop offset="100%" stopColor="#060e1c" />
              </radialGradient>
              <radialGradient id="eyeGlow" cx="40%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#003366" stopOpacity="0" />
              </radialGradient>
              <filter id="portGlow">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0a1628" />
                <stop offset="100%" stopColor="#050e1e" />
              </linearGradient>
            </defs>

            {/* Body / torso */}
            <path d="M20 280 L20 185 Q30 160 100 155 Q170 160 180 185 L180 280 Z"
              fill="url(#bodyGrad)" />
            {/* Collar glow */}
            <path d="M70 160 Q100 155 130 160 L125 175 Q100 170 75 175 Z"
              fill="rgba(0,212,255,0.12)" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.5" />
            {/* Shoulders edge lighting */}
            <path d="M20 200 Q25 170 60 162"
              stroke="#00d4ff" strokeWidth="1" fill="none" strokeOpacity="0.4" />
            <path d="M180 200 Q175 170 140 162"
              stroke="#bd93f9" strokeWidth="1" fill="none" strokeOpacity="0.4" />

            {/* Neck */}
            <rect x="82" y="140" width="36" height="24" rx="4"
              fill="url(#skinGrad)" />

            {/* Face oval */}
            <ellipse cx="100" cy="100" rx="52" ry="62"
              fill="url(#skinGrad)"
              stroke="#00d4ff" strokeWidth="0.6" strokeOpacity="0.45" />

            {/* Edge lighting left */}
            <path d="M49 55 Q46 100 50 140"
              stroke="#00d4ff" strokeWidth="2" fill="none"
              strokeOpacity="0.55" filter="url(#portGlow)" />
            {/* Edge lighting right */}
            <path d="M151 55 Q154 100 150 140"
              stroke="#bd93f9" strokeWidth="2" fill="none"
              strokeOpacity="0.55" filter="url(#portGlow)" />

            {/* Hair */}
            <ellipse cx="100" cy="47" rx="50" ry="36" fill="#0d0a20" />
            <ellipse cx="100" cy="50" rx="44" ry="30" fill="#140d28" />
            <path d="M54 60 Q70 40 100 36 Q130 40 146 60"
              stroke="#00d4ff" strokeWidth="0.5" fill="none" strokeOpacity="0.25" />

            {/* Forehead highlight */}
            <ellipse cx="100" cy="68" rx="30" ry="7" fill="rgba(0,212,255,0.1)" />

            {/* Left eyebrow */}
            <path d="M65 83 Q76 78 88 81"
              stroke="#00d4ff" strokeWidth="1.8" fill="none" strokeOpacity="0.55" strokeLinecap="round" />
            {/* Right eyebrow */}
            <path d="M112 81 Q124 78 135 83"
              stroke="#bd93f9" strokeWidth="1.8" fill="none" strokeOpacity="0.55" strokeLinecap="round" />

            {/* Left eye */}
            <g filter="url(#portGlow)">
              <ellipse cx="77" cy="97" rx="11" ry="8" fill="url(#eyeGlow)" />
              <ellipse cx="77" cy="97" rx="6.5" ry="6" fill="#030b18" />
              <circle cx="77" cy="97" r="3" fill="#00d4ff" opacity="0.9" />
              <circle cx="79" cy="95" r="1.4" fill="white" opacity="0.95" />
            </g>

            {/* Right eye */}
            <g filter="url(#portGlow)">
              <ellipse cx="123" cy="97" rx="11" ry="8">
                <animate attributeName="fill" values="rgba(189,147,249,0.9);rgba(189,147,249,0.7);rgba(189,147,249,0.9)" dur="3s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="123" cy="97" rx="11" ry="8" fill="rgba(189,147,249,0.85)" />
              <ellipse cx="123" cy="97" rx="6.5" ry="6" fill="#0a0518" />
              <circle cx="123" cy="97" r="3" fill="#bd93f9" opacity="0.9" />
              <circle cx="125" cy="95" r="1.4" fill="white" opacity="0.95" />
            </g>

            {/* Nose */}
            <path d="M100 107 L96 122 Q100 126 104 122 L100 107"
              stroke="rgba(0,212,255,0.2)" strokeWidth="1.2"
              fill="rgba(0,212,255,0.05)" strokeLinecap="round" />

            {/* Lips */}
            <path d="M80 133 Q90 139 100 138 Q110 139 120 133"
              stroke="rgba(0,212,255,0.6)" strokeWidth="1.8"
              fill="rgba(0,212,255,0.1)" strokeLinecap="round" />
            <path d="M86 133 Q100 136 114 133"
              stroke="rgba(189,147,249,0.35)" strokeWidth="1"
              fill="none" strokeLinecap="round" />

            {/* Chin highlight */}
            <ellipse cx="100" cy="150" rx="16" ry="5" fill="rgba(0,212,255,0.1)" />

            {/* Scan lines across face */}
            {Array.from({ length: 14 }, (_, i) => (
              <line key={i} x1="48" y1={42 + i * 8} x2="152" y2={42 + i * 8}
                stroke="#00d4ff" strokeWidth="0.25" strokeOpacity="0.1" />
            ))}
          </svg>
        </div>

        {/* Scan line sweep */}
        <div className="absolute left-0 right-0 h-[2px] animate-scanline pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)',
            boxShadow: '0 0 8px #00d4ff',
          }}
        />

        {/* Holographic grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(5,8,22,0.6) 100%)',
          }}
        />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(5,8,22,0.9), transparent)',
          }}
        />

        {/* Identity label */}
        <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1">
          <div className="text-xs font-mono tracking-[0.3em]"
            style={{ color: '#00d4ff', textShadow: '0 0 10px #00d4ff' }}>
            HARISH SABARI P V
          </div>
          <div className="text-[9px] font-mono tracking-widest"
            style={{ color: 'rgba(189,147,249,0.7)' }}>
            AI · FULL STACK · VISIONARY
          </div>
        </div>

        {/* Expanding rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [0.7, 1.1], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeOut' }}
            className="absolute w-28 h-28 rounded-full border border-[#00d4ff]"
          />
          <motion.div
            animate={{ scale: [0.7, 1.1], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1.2, ease: 'easeOut' }}
            className="absolute w-28 h-28 rounded-full border border-[#bd93f9]"
          />
        </div>
      </motion.div>

      {/* HUD chips */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-6 -right-3 px-3 py-1.5 font-mono text-[10px] z-10"
        style={{
          background: 'rgba(5,8,22,0.85)',
          border: '1px solid rgba(0,212,255,0.5)',
          color: '#00d4ff',
          boxShadow: '0 0 10px rgba(0,212,255,0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        ◉ STATUS: ONLINE
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5, delay: 1 }}
        className="absolute bottom-20 -left-6 px-3 py-1.5 font-mono text-[10px] z-10"
        style={{
          background: 'rgba(5,8,22,0.85)',
          border: '1px solid rgba(77,148,255,0.5)',
          color: '#4d94ff',
          boxShadow: '0 0 10px rgba(77,148,255,0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        ◈ SKILLS: 20+
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
        className="absolute top-1/2 -right-8 px-3 py-1.5 font-mono text-[10px] z-10"
        style={{
          background: 'rgba(5,8,22,0.85)',
          border: '1px solid rgba(189,147,249,0.5)',
          color: '#bd93f9',
          boxShadow: '0 0 10px rgba(189,147,249,0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        ◈ PROJECTS: 15+
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const [typeIndex, setTypeIndex]   = useState(0);
  const [charIndex, setCharIndex]   = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos]     = useState({ x: 0, y: 0 });

  useEffect(() => {
    const current = ROLES[typeIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setTypedText(current.substring(0, charIndex - 1));
          setCharIndex(c => c - 1);
        }, 45);
      } else {
        setIsDeleting(false);
        setTypeIndex(i => (i + 1) % ROLES.length);
      }
    } else {
      if (charIndex < current.length) {
        timer = setTimeout(() => {
          setTypedText(current.substring(0, charIndex + 1));
          setCharIndex(c => c + 1);
        }, 90);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2200);
      }
    }
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, typeIndex]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    setMousePos({
      x: (e.clientX / window.innerWidth) - 0.5,
      y: (e.clientY / window.innerHeight) - 0.5,
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <CSSParticles />
      </div>

      {/* Ambient depth gradients */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 70% 50%, rgba(0,102,255,0.06), transparent 70%), radial-gradient(ellipse 40% 50% at 20% 30%, rgba(189,147,249,0.05), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* ── Left column ── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Tag line */}
          <div className="font-mono text-[11px] tracking-[0.3em] mb-5 flex items-center gap-3"
            style={{ color: 'rgba(0,212,255,0.7)' }}>
            <motion.span
              animate={{ scaleX: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="inline-block w-6 h-[1px]"
              style={{ background: '#00d4ff' }}
            />
            AI &amp; FULL STACK DEVELOPER
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 inline-block"
              style={{ background: '#00d4ff' }}
            />
          </div>

          {/* Name */}
          <h1 className="text-[4.5rem] md:text-[6rem] font-black font-mono leading-none mb-2"
            style={{
              background: 'linear-gradient(135deg, #ffffff 20%, #00d4ff 55%, #7c3aed 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 24px rgba(0,212,255,0.35))',
            }}>
            HARISH
          </h1>
          <h2 className="text-lg md:text-xl font-mono tracking-[0.25em] mb-5"
            style={{ color: 'rgba(189,147,249,0.8)' }}>
            SABARI P V
          </h2>

          {/* Typewriter */}
          <div className="h-9 mb-7">
            <span className="text-xl md:text-2xl font-medium"
              style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Space Grotesk, sans-serif' }}>
              {typedText}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.7 }}
              className="inline-block w-0.5 h-6 ml-0.5 align-middle"
              style={{ background: '#00d4ff' }}
            />
          </div>

          {/* Description */}
          <p className="text-base mb-10 max-w-md leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Space Grotesk, sans-serif' }}>
            Building intelligence that feels human — at the intersection of scalable AI systems and cinematic user experiences.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              className="relative px-8 py-3.5 font-mono font-bold text-sm overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #0066ff)',
                color: '#050816',
                transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
                boxShadow: '0 0 30px rgba(0,212,255,0.3)',
                letterSpacing: '0.15em',
              }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ boxShadow: '0 0 50px rgba(0,212,255,0.5)' }}
              data-interactive="true"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">[ VIEW PROJECTS ]</span>
            </motion.button>

            <motion.button
              className="relative px-8 py-3.5 font-mono font-bold text-sm overflow-hidden group transition-all"
              style={{
                color: '#00d4ff',
                border: '1px solid rgba(0,212,255,0.4)',
                background: 'rgba(0,212,255,0.06)',
                transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`,
                letterSpacing: '0.15em',
              }}
              whileHover={{
                borderColor: 'rgba(0,212,255,0.9)',
                background: 'rgba(0,212,255,0.1)',
                boxShadow: '0 0 20px rgba(0,212,255,0.25)',
              }}
              data-interactive="true"
            >
              <span className="relative z-10">[ DOWNLOAD CV ]</span>
            </motion.button>
          </div>

          {/* Social mini-links */}
          <div className="flex items-center gap-6 mt-8">
            {['GitHub', 'LinkedIn', 'Twitter'].map(s => (
              <a key={s} href="#"
                className="text-[10px] font-mono tracking-widest transition-colors hover:text-[#00d4ff]"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                data-interactive="true">
                {s}
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Right column — holographic portrait ── */}
        <HolographicPortrait mousePos={mousePos} />
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-mono tracking-[0.3em]"
          style={{ color: 'rgba(0,212,255,0.4)' }}>SCROLL</span>
        <div className="w-[1px] h-8" style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.5), transparent)' }} />
      </motion.div>
    </section>
  );
}
