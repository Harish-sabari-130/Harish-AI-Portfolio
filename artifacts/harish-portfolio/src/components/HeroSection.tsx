import { useEffect, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import CSSParticles from './CSSParticles';

const ROLES = [
  'AI / ML Student',
  'Full-Stack Developer',
  'Computer Vision Builder',
  'ServiceNow Developer',
  'AI Enthusiast',
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
      className="relative w-full max-w-[220px] sm:max-w-[300px] md:max-w-[380px] mx-auto"
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

        {/* Real photo with holographic treatment */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/harish.jpg"
            alt="Harish Sabari P V"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 15%' }}
          />
          {/* Cyan holographic colour wash */}
          <div className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0,102,255,0.18) 0%, rgba(0,212,255,0.08) 50%, rgba(124,58,237,0.18) 100%)',
              mixBlendMode: 'screen',
            }}
          />
          {/* Edge rim lighting — left cyan */}
          <div className="absolute inset-y-0 left-0 w-8"
            style={{
              background: 'linear-gradient(to right, rgba(0,212,255,0.35), transparent)',
            }}
          />
          {/* Edge rim lighting — right purple */}
          <div className="absolute inset-y-0 right-0 w-8"
            style={{
              background: 'linear-gradient(to left, rgba(124,58,237,0.35), transparent)',
            }}
          />
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
            AI/ML · COMPUTER VISION · SERVICENOW
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
        className="absolute top-6 -right-3 px-3 py-1.5 font-mono text-[10px] z-10 hidden sm:block"
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
        className="absolute bottom-20 -left-6 px-3 py-1.5 font-mono text-[10px] z-10 hidden sm:block"
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
        className="absolute top-1/2 -right-8 px-3 py-1.5 font-mono text-[10px] z-10 hidden sm:block"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* ── Left column ── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Tag line */}
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] mb-4 sm:mb-5 flex items-center gap-3"
            style={{ color: 'rgba(0,212,255,0.7)' }}>
            <motion.span
              animate={{ scaleX: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="inline-block w-6 h-[1px]"
              style={{ background: '#00d4ff' }}
            />
            AI/ML STUDENT &amp; FULL-STACK DEVELOPER
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 inline-block"
              style={{ background: '#00d4ff' }}
            />
          </div>

          {/* Name */}
          <h1 className="text-[2rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[5rem] font-black font-mono leading-none mb-1"
            style={{
              background: 'linear-gradient(135deg, #ffffff 20%, #00d4ff 55%, #7c3aed 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 24px rgba(0,212,255,0.35))',
            }}>
            HARISH SABARI
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-mono tracking-[0.35em] mb-5"
            style={{
              background: 'linear-gradient(135deg, #bd93f9 0%, #7c3aed 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 16px rgba(189,147,249,0.4))',
            }}>
            P V
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
          <p className="text-sm sm:text-base mb-8 md:mb-10 max-w-md leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Space Grotesk, sans-serif' }}>
            Building intelligent applications and real-world software solutions through AI, machine learning, and modern web technologies.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <motion.button
              className="relative px-5 sm:px-8 py-3 sm:py-3.5 font-mono font-bold text-xs sm:text-sm overflow-hidden group"
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

            <motion.a
              href="https://drive.google.com/file/d/1O_EFUsFNQaw5QUNAOYLXEgXuvTyWEC9M/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="relative px-5 sm:px-8 py-3 sm:py-3.5 font-mono font-bold text-xs sm:text-sm overflow-hidden group transition-all inline-block"
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
            </motion.a>
          </div>

          {/* Social mini-links */}
          <div className="flex items-center gap-5 mt-6 sm:mt-8">
            {[
              { label: 'GitHub',   href: 'https://github.com/Harish-sabari-130',          external: true },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/harish-sabari-130hssh/', external: true },
              { label: 'Email',    href: 'mailto:harish23alr@gmail.com',                   external: false },
            ].map(s => (
              <a key={s.label} href={s.href} {...(s.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="text-[10px] font-mono tracking-widest transition-colors hover:text-[#00d4ff]"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                data-interactive="true">
                {s.label}
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
