import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "NeuralChat AI",
    desc: "Multi-model AI chat with context memory built using LangChain, React, and FastAPI.",
    tags: ["AI", "Python", "React", "LangChain"],
    link: "#",
    github: "#"
  },
  {
    title: "CodeVision",
    desc: "AI code reviewer using GPT-4 that detects bugs and suggests improvements in real-time.",
    tags: ["AI", "OpenAI", "Next.js", "TypeScript"],
    link: "#",
    github: "#"
  },
  {
    title: "DeepSight Vision",
    desc: "Real-time object detection and tracking pipeline utilizing YOLO and OpenCV.",
    tags: ["Computer Vision", "Python", "OpenCV", "YOLO"],
    link: "#",
    github: "#"
  },
  {
    title: "DataNexus Dashboard",
    desc: "Full-stack analytics dashboard featuring real-time data visualization and processing.",
    tags: ["React", "Node.js", "PostgreSQL", "D3.js"],
    link: "#",
    github: "#"
  },
  {
    title: "AutoAgent",
    desc: "Autonomous AI agent framework capable of executing complex task automations.",
    tags: ["LangChain", "Python", "Agents", "AI"],
    link: "#",
    github: "#"
  },
  {
    title: "PixelForge",
    desc: "AI image generation platform integrated with Stable Diffusion models.",
    tags: ["Python", "Stable Diffusion", "React", "AI"],
    link: "#",
    github: "#"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-mono font-bold text-foreground mb-16 glitch-text"
        >
          <span className="text-primary mr-2">&gt;</span>PROJECT.ARCHIVE
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[1000px]">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateX: 20, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative h-full bg-card/40 border border-primary/20 backdrop-blur-sm overflow-hidden hover:border-primary transition-all duration-300 transform-gpu hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,212,255,0.15)] flex flex-col"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              
              {/* Scanline Sweep on Hover */}
              <div className="absolute inset-0 bg-primary/10 -translate-y-full group-hover:animate-[scanline_2s_linear_infinite] pointer-events-none" />

              <div className="p-6 flex-grow flex flex-col relative z-10">
                <h3 className="text-xl font-mono font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 flex-grow">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs font-mono px-2 py-1 bg-background/50 border border-border text-foreground/80">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-border group-hover:border-primary/30 transition-colors">
                  <a href={project.link} className="flex items-center gap-2 text-sm font-mono text-primary hover:text-accent transition-colors" data-interactive="true">
                    <ExternalLink size={16} /> VIEW
                  </a>
                  <a href={project.github} className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors" data-interactive="true">
                    <Github size={16} /> CODE
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
