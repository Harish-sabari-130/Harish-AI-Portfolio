import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#050816]">
      {/* Background lines */}
      <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,212,255,0.1)_10px,rgba(0,212,255,0.1)_11px)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-mono font-bold text-foreground mb-16 glitch-text"
        >
          <span className="text-primary mr-2">&gt;</span>CONNECT.PROTOCOL
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            <p className="text-muted-foreground text-lg mb-8">
              System standing by for new connections. Whether it's a project discussion, job opportunity, or just a technical chat, my inbox is open.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "harish@example.com", href: "mailto:harish@example.com", testId: "contact-email" },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/harish-dev", href: "#", testId: "contact-linkedin" },
                { icon: Github, label: "GitHub", value: "github.com/harish-dev", href: "#", testId: "contact-github" },
                { icon: MapPin, label: "Location", value: "India", href: null, testId: "contact-location" }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href || undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className={`flex items-center gap-4 p-4 bg-card/50 border border-border backdrop-blur-sm group ${item.href ? 'hover:border-primary cursor-pointer' : ''} transition-colors`}
                  data-testid={item.testId}
                  data-interactive={!!item.href}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-background border border-border group-hover:border-primary group-hover:text-primary transition-colors text-muted-foreground">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">{item.label}</div>
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="bg-card/40 border border-primary/20 p-8 backdrop-blur shadow-[0_0_30px_rgba(0,212,255,0.05)]">
              <h3 className="text-xl font-mono font-bold mb-6 text-foreground border-b border-border pb-4">
                INITIALIZE_TRANSMISSION
              </h3>
              
              {status === 'success' ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-green-500 text-green-500 flex items-center justify-center mb-4">
                    <Send size={32} />
                  </div>
                  <h4 className="text-xl font-mono font-bold text-green-500 mb-2">TRANSMISSION SUCCESSFUL</h4>
                  <p className="text-muted-foreground">The data packets have been delivered. I will respond shortly.</p>
                  <button 
                    type="button" 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-mono text-primary hover:underline"
                    data-interactive="true"
                  >
                    SEND ANOTHER PACKET
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2 relative">
                    <label className="text-xs font-mono text-muted-foreground">SENDER_NAME</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full bg-transparent border-0 border-b-2 border-border focus:border-primary outline-none py-2 text-foreground font-sans transition-colors peer placeholder:text-muted-foreground/30"
                      placeholder="John Doe"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 peer-focus:w-full" />
                  </div>
                  
                  <div className="space-y-2 relative">
                    <label className="text-xs font-mono text-muted-foreground">SENDER_EMAIL</label>
                    <input 
                      required 
                      type="email" 
                      className="w-full bg-transparent border-0 border-b-2 border-border focus:border-primary outline-none py-2 text-foreground font-sans transition-colors peer placeholder:text-muted-foreground/30"
                      placeholder="john@example.com"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 peer-focus:w-full" />
                  </div>
                  
                  <div className="space-y-2 relative">
                    <label className="text-xs font-mono text-muted-foreground">PAYLOAD_DATA</label>
                    <textarea 
                      required 
                      rows={4}
                      className="w-full bg-transparent border-0 border-b-2 border-border focus:border-primary outline-none py-2 text-foreground font-sans transition-colors peer resize-none placeholder:text-muted-foreground/30"
                      placeholder="Enter your message here..."
                    />
                    <div className="absolute bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 peer-focus:w-full" />
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    data-testid="form-contact-submit"
                    data-interactive="true"
                    className="w-full py-4 bg-primary text-background font-mono font-bold relative overflow-hidden group disabled:opacity-70 mt-4"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {status === 'loading' ? (
                        <>PROCESSING... <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" /></>
                      ) : (
                        <>[ TRANSMIT ]</>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
