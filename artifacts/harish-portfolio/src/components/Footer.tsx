export default function Footer() {
  return (
    <footer className="bg-[#030510] py-8 border-t border-primary/20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
          <span className="text-primary font-mono text-sm tracking-wider">
            HARISH OS // ALL SYSTEMS OPERATIONAL
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#hero" className="text-muted-foreground hover:text-primary text-sm font-mono transition-colors">HOME</a>
          <a href="#projects" className="text-muted-foreground hover:text-primary text-sm font-mono transition-colors">PROJECTS</a>
          <a href="#contact" className="text-muted-foreground hover:text-primary text-sm font-mono transition-colors">CONTACT</a>
        </div>

        <div className="text-muted-foreground text-sm font-sans">
          &copy; {new Date().getFullYear()} Harish. Crafted with AI.
        </div>
      </div>
    </footer>
  );
}
