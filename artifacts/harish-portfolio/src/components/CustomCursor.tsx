import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only enable on desktop
    if (window.innerWidth < 768) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animateRing);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'button' || 
          target.tagName.toLowerCase() === 'a' || 
          target.closest('button') || 
          target.closest('a') ||
          target.closest('[data-interactive="true"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    let animationFrame = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] shadow-[0_0_8px_#00d4ff]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 border rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out flex items-center justify-center ${
          isHovering 
            ? 'w-16 h-16 border-accent bg-accent/10 backdrop-blur-[2px]' 
            : 'w-10 h-10 border-primary/50'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {isHovering && <div className="w-full h-full rounded-full animate-ping opacity-20 bg-accent absolute" />}
      </div>
    </>
  );
}
