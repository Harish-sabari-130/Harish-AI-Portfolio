import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { name: 'HOME',       id: 'hero' },
  { name: 'ABOUT',      id: 'about' },
  { name: 'SKILLS',     id: 'skills' },
  { name: 'PROJECTS',   id: 'projects' },
  { name: 'EXPERIENCE', id: 'experience' },
  { name: 'CONTACT',    id: 'contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen]       = useState(false);
  const activeRef = useRef('hero');

  /* ── scroll-based background ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Intersection Observer — fires when section centre crosses viewport centre ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            activeRef.current = id;
            setActiveSection(id);
          }
        },
        {
          rootMargin: '-48% 0px -48% 0px',
          threshold: 0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(5,8,22,0.88)] backdrop-blur-xl border-b border-[rgba(0,212,255,0.15)] shadow-[0_4px_30px_rgba(0,212,255,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="text-xl font-mono font-black tracking-widest glitch-text"
          style={{
            color: '#00d4ff',
            textShadow: '0 0 12px rgba(0,212,255,0.7)',
          }}
          data-interactive="true"
        >
          H.AI
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative px-3 py-2 text-[11px] font-mono tracking-[0.18em] transition-colors duration-200"
                style={{
                  color: isActive ? '#00d4ff' : 'rgba(255,255,255,0.5)',
                  textShadow: isActive ? '0 0 8px rgba(0,212,255,0.6)' : 'none',
                }}
                data-interactive="true"
              >
                {link.name}

                {/* Active underline with layoutId for smooth slide */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-bar"
                    className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
                      boxShadow: '0 0 8px #00d4ff',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}

                {/* Hover background */}
                <span
                  className="absolute inset-0 rounded opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ background: 'rgba(0,212,255,0.05)' }}
                />
              </button>
            );
          })}

          {/* CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className="ml-4 px-4 py-2 text-[11px] font-mono tracking-widest border transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]"
            style={{
              color: '#00d4ff',
              borderColor: 'rgba(0,212,255,0.4)',
              background: 'rgba(0,212,255,0.06)',
            }}
            data-interactive="true"
          >
            HIRE ME
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(o => !o)}
          data-interactive="true"
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={mobileOpen
                ? i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 9 } : { rotate: -45, y: -9 }
                : { rotate: 0, y: 0, opacity: 1 }
              }
              className="block w-5 h-0.5"
              style={{ background: '#00d4ff' }}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden px-6 pb-6 flex flex-col gap-3 border-t border-[rgba(0,212,255,0.15)]"
          style={{ background: 'rgba(5,8,22,0.97)', backdropFilter: 'blur(20px)' }}
        >
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left py-2 text-sm font-mono tracking-widest transition-colors"
              style={{
                color: activeSection === link.id ? '#00d4ff' : 'rgba(255,255,255,0.6)',
                textShadow: activeSection === link.id ? '0 0 8px rgba(0,212,255,0.5)' : 'none',
              }}
              data-interactive="true"
            >
              {link.name}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
