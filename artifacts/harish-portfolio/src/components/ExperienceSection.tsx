import { motion } from 'framer-motion';

const experiences = [
  {
    role: "ServiceNow Intern",
    company: "ServiceNow",
    period: "Jan 2026 – Apr 2026",
    type: "work",
    points: [
      "Completed hands-on training across ServiceNow platform fundamentals, ITSM, Flow Designer, App Engine Studio, UI Builder, and workflow automation.",
      "Built knowledge in scripting, AI-powered workflows, and low-code application development using ServiceNow tools and best practices.",
      "Developed solutions leveraging App Engine Studio, Flow Designer, and Service Portal."
    ]
  },
  {
    role: "Freelance Web Developer",
    company: "Independent",
    period: "2025 – Present",
    type: "work",
    points: [
      "Delivered a client-based website solution with full-cycle development: requirement gathering, UI development, and deployment.",
      "Handled direct client communication and delivered a production-ready business website.",
      "Live project: firstinalltime.in"
    ],
    link: "https://firstinalltime.in/"
  },
  {
    role: "B.Tech – AI & Machine Learning",
    company: "Kongu Engineering College",
    period: "2023 – 2027",
    type: "education",
    points: [
      "Specialization in Artificial Intelligence and Machine Learning.",
      "CGPA: 6.0 | Location: Erode, Tamil Nadu.",
      "Relevant coursework: Machine Learning, Deep Learning, Computer Vision, Data Structures."
    ]
  },
  {
    role: "Higher Secondary (HSC)",
    company: "AKV Matric Hr Sec School",
    period: "2022 – 2023",
    type: "education",
    points: [
      "Percentage: 86% | Location: Namakkal, Tamil Nadu."
    ]
  },
  {
    role: "Secondary School (SSLC)",
    company: "AKV Matric Hr Sec School",
    period: "2020 – 2021",
    type: "education",
    points: [
      "Result: Pass | Location: Namakkal, Tamil Nadu."
    ]
  }
];

export default function ExperienceSection() {
  const work = experiences.filter(e => e.type === 'work');
  const edu  = experiences.filter(e => e.type === 'education');

  const TimelineList = ({ items }: { items: typeof experiences }) => (
    <div className="relative border-l border-primary/30 ml-3 md:ml-6 space-y-10">
      {items.map((exp, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          className="relative pl-8 md:pl-12"
        >
          <div className="absolute left-[-5px] top-1.5 w-[9px] h-[9px] rounded-full bg-primary shadow-[0_0_10px_#00d4ff] ring-4 ring-background" />

          <div className="bg-card/40 border border-border backdrop-blur p-5 hover:border-primary/50 transition-colors group">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
              <h3 className="text-lg font-mono font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {exp.role}
              </h3>
              <span className="text-xs font-mono text-accent bg-accent/10 px-3 py-1 border border-accent/20 shrink-0">
                {exp.period}
              </span>
            </div>
            <div className="text-muted-foreground font-medium text-sm mb-3">
              @ {exp.company}
            </div>
            <ul className="space-y-1.5 text-muted-foreground text-sm">
              {exp.points.map((point, j) => (
                <li key={j} className="flex gap-2">
                  <span className="text-primary mt-0.5 shrink-0">▹</span>
                  <span>
                    {exp.link && point.includes('firstinalltime') ? (
                      <a href={exp.link} target="_blank" rel="noreferrer"
                        className="text-primary hover:underline" data-interactive="true">
                        {point}
                      </a>
                    ) : point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section id="experience" className="py-24 relative bg-[#0b1020]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-mono font-bold text-foreground mb-16 glitch-text"
        >
          <span className="text-primary mr-2">&gt;</span>EXPERIENCE.LOG
        </motion.h2>

        {/* Work experience */}
        <div className="mb-16">
          <h3 className="text-xs font-mono tracking-[0.3em] mb-8"
            style={{ color: 'rgba(0,212,255,0.5)' }}>
            ◈ WORK EXPERIENCE
          </h3>
          <TimelineList items={work} />
        </div>

        {/* Education */}
        <div>
          <h3 className="text-xs font-mono tracking-[0.3em] mb-8"
            style={{ color: 'rgba(189,147,249,0.5)' }}>
            ◈ EDUCATION
          </h3>
          <TimelineList items={edu} />
        </div>
      </div>
    </section>
  );
}
