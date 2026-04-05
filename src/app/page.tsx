"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";

const SKILLS = [
  {
    category: "HDL / Verification",
    items:
      "SystemVerilog (OOP, UVM, SVA), Verilog, VHDL — RTL design, constrained-random verification, functional coverage, CDC analysis",
  },
  {
    category: "Programming",
    items: "C/C++, Python (ML / automation), TCL, MATLAB, ARM/MIPS assembly",
  },
  {
    category: "EDA / Tools",
    items:
      "ModelSim / QuestaSim, Verilator, Xilinx Vivado (ILA/ChipScope), Intel Quartus, VTR, Git, Linux",
  },
  {
    category: "Protocols & HW",
    items:
      "CAN-Bus, AXI4/AXI-Lite, SPI, I2C, UART; FPGA prototyping, logic analyzers, oscilloscopes",
  },
];

const EXPERIENCE = [
  {
    role: "Research Assistant – RTL Design & Verification",
    org: "Safety-Critical Real-Time Systems Lab, University of Waterloo",
    location: "Waterloo, Canada",
    period: "May 2025 – Dec 2025",
    bullets: [
      "Designed and verified a Verilog RTL CAN-Bus receiver/decoder on FPGA with dynamic bit-rate and frame-length detection; developed comprehensive simulation testbenches validating edge-case protocol behavior.",
      "Implemented hardware-level ID-match trigger logic for autonomous CAN message filtering; validated functional correctness via directed and pseudo-random simulation followed by on-board hardware testing.",
    ],
  },
  {
    role: "ASIC Design & Verification Engineer (Intern)",
    org: "IC Design Lab, National Institute of Electronics",
    location: "Islamabad, Pakistan",
    period: "June 2020 – Oct 2020",
    bullets: [
      "Developed Verilog RTL blocks and wrote directed testbenches; performed functional simulation in ModelSim and validated designs on FPGA prototypes prior to tape-out.",
      "Contributed to design and verification of a custom solar-tracking IC, achieving 82% accuracy improvement through iterative simulation-driven RTL refinement.",
    ],
  },
];

const HW_PROJECTS = [
  {
    title: "Cycle-Accurate 5-Stage Pipelined RISC-V Processor",
    desc: "RV32I SystemVerilog pipeline with data forwarding, hazard detection, and branch prediction; verified against RISC-V compliance suite. Self-checking testbench with SVA assertions and constrained-random instruction stimulus.",
    link: "https://github.com/bilal99u/RISC-V-Verilog-Implementation-",
    tags: ["SystemVerilog", "SVA", "CRV", "FPGA"],
  },
  {
    title: "2048-bit High-Performance Adder – Intel Agilex 5 FPGA",
    desc: "Kogge-Stone parallel prefix adder hitting 825 MHz — 37% speed improvement; register retiming cut latency from 230 to 11 cycles. Python-automated QoR sweep achieved 41% better MHz/ALM efficiency over ripple-carry baseline.",
    link: "#",
    tags: ["RTL", "Intel Quartus", "Python", "DSP"],
  },
  {
    title: "Coverage-Driven CAN-Bus Fault Injection & Verification Framework",
    desc: "Hybrid C++/Python (pybind11) framework for protocol-level fault injection into an RTL CAN-Bus model. Functional coverage bins + CRV targeting error frames, bit-stuffing violations, and arbitration edge cases.",
    link: "#",
    tags: ["C++", "Python", "pybind11", "UVM-style"],
  },
  {
    title: "FPGA Architecture Exploration: 1D Systolic DSP Arrays",
    desc: "Benchmarked systolic cascade vs. routing-fabric across 72 VTR configurations — 91% frequency improvement, 47% wirelength reduction for convolution/DSP. Python-automated architecture generation and QoR extraction.",
    link: "#",
    tags: ["VTR", "Python", "DSP", "Architecture"],
  },
  {
    title: "Verilog RTL CAN-Bus Receiver / Decoder",
    desc: "CAN-Bus receiver with dynamic bit-rate and frame-length detection, verified on FPGA with simulation and hardware timing analysis.",
    link: "https://github.com/bilal99u/landing-page-website",
    tags: ["Verilog", "FPGA", "CAN-Bus"],
  },
  {
    title: "ASIC for Control Flow of Hashing Algorithm",
    desc: "Digital ASIC control module implementing control flow for a custom hashing algorithm, focusing on low-latency finite-state logic.",
    link: "#",
    tags: ["ASIC", "FSM", "RTL"],
  },
  {
    title: "RISC-V Instruction Memory & Program Counter",
    desc: "Memory-mapped instruction module and PC logic in Verilog, integrated with RISC-V pipeline stages for simulation and testing.",
    link: "https://github.com/bilal99u/RISC-V-instruction-memory-and-program-counter-implementation-",
    tags: ["Verilog", "RISC-V"],
  },
  {
    title: "8051 MCU-Based Home Security System",
    desc: "8051 microcontroller-based home alarm system with motion sensors, buzzer alerts, and password-protected keypad control.",
    link: "#",
    tags: ["8051", "Embedded C", "MCU"],
  },
  {
    title: "Rate Monotonic Scheduler",
    desc: "Real-time scheduling algorithm in Python to analyze and simulate CPU task scheduling behavior.",
    link: "https://github.com/bilal99u/Rate_Monotonic_Scheduler",
    tags: ["Python", "RTOS", "Scheduling"],
  },
];

const ML_PROJECTS = [
  {
    title: "CNN LeNet",
    desc: "Convolutional neural network (LeNet) for image classification in PyTorch.",
    link: "https://github.com/bilal99u/CNN_LeNET",
    tags: ["PyTorch", "CNN"],
  },
  {
    title: "Variational Autoencoder – Anime Image Generator",
    desc: "VAE model generating anime-style images using PyTorch and latent variable sampling.",
    link: "https://github.com/bilal99u/Variational-Autoencoder-Anime-Image-Generator",
    tags: ["PyTorch", "VAE", "Generative"],
  },
  {
    title: "Multi-Armed Bandit ML Project",
    desc: "Exploration-exploitation strategies for the multi-armed bandit problem, visualized.",
    link: "https://github.com/bilal99u/Multi_armed_bundit_ML_project",
    tags: ["RL", "Python"],
  },
  {
    title: "Stroke Prediction",
    desc: "KNN, Logistic Regression, and XGBoost on healthcare data to predict stroke risk.",
    link: "https://github.com/bilal99u/Stroke_prediction",
    tags: ["XGBoost", "Sklearn"],
  },
  {
    title: "PCA – Penguins Dataset",
    desc: "Principal Component Analysis for dimensionality reduction and data visualization.",
    link: "https://github.com/bilal99u/PCA_penguins_dataset",
    tags: ["PCA", "Python"],
  },
  {
    title: "K-Means Clustering",
    desc: "K-Means clustering implemented from scratch in Python with visualization.",
    link: "https://github.com/bilal99u/k_means-initial",
    tags: ["Clustering", "Python"],
  },
  {
    title: "Wine Model",
    desc: "Classification model for the wine dataset with performance tuning and visualization.",
    link: "https://github.com/bilal99u/wine_model",
    tags: ["Classification", "Python"],
  },
];

const NAV = ["about", "education", "skills", "experience", "projects", "contact"];

export default function Portfolio() {
  const [active, setActive] = useState("");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.25 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen text-gray-900"
      style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace", background: "#f5f3ee" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=Syne:wght@400;600;700;800&display=swap');
        :root {
          --bg: #f5f3ee;
          --ink: #1a1814;
          --accent: #c0392b;
          --accent2: #e8dcc8;
          --card: #ffffff;
          --muted: #6b6560;
          --border: #ddd9d2;
          --tag-bg: #1a1814;
          --tag-text: #f5f3ee;
        }
        .syne { font-family: 'Syne', sans-serif; }
        .nav-link { position: relative; letter-spacing: 0.08em; font-size: 0.7rem; text-transform: uppercase; color: var(--muted); transition: color 0.2s; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: var(--accent); transition: width 0.25s; }
        .nav-link:hover, .nav-link.nav-active { color: var(--accent); }
        .nav-link:hover::after, .nav-link.nav-active::after { width: 100%; }
        .tag { display: inline-block; background: var(--tag-bg); color: var(--tag-text); font-size: 0.6rem; padding: 2px 7px; letter-spacing: 0.1em; text-transform: uppercase; }
        .card { background: var(--card); border: 1px solid var(--border); transition: border-color 0.2s, box-shadow 0.2s; }
        .card:hover { border-color: var(--accent); box-shadow: 4px 4px 0 var(--accent); }
        .section-label { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.25rem; }
        .rule { height: 1px; background: var(--border); }
        .exp-card { border-left: 3px solid var(--accent); padding-left: 1.25rem; }
        .hero-tag { border: 1px solid rgba(255,255,255,0.4); font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; color: rgba(255,255,255,0.85); }
        .skill-row { border-bottom: 1px solid var(--border); padding: 1rem 0; display: grid; grid-template-columns: 200px 1fr; gap: 1rem; align-items: start; }
        @media (max-width: 640px) { .skill-row { grid-template-columns: 1fr; } }
        .org-pill { border: 1px solid var(--border); padding: 0.75rem 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
        .bullet-dot::before { content: '→'; margin-right: 0.5rem; color: var(--accent); }
      `}</style>

      {/* Navigation */}
      <nav
        style={{ background: "rgba(245,243,238,0.95)", borderBottom: "1px solid var(--border)" }}
        className="fixed top-0 w-full z-50 backdrop-blur-sm"
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="syne font-bold text-sm tracking-tight" style={{ color: "var(--ink)" }}>
            Ahmad Bilal Irfan
          </span>
          <div className="flex gap-6">
            {NAV.map((id) => (
              <a key={id} href={`#${id}`} className={`nav-link${active === id ? " nav-active" : ""}`}>
                {id}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative flex items-end justify-start overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://cdn.builtin.com/sites/www.builtin.com/files/2024-04/FPGA%201200x635.jpg')",
            filter: "grayscale(30%) contrast(1.1)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(20,16,10,0.88) 0%, rgba(20,16,10,0.6) 60%, rgba(20,16,10,0.4) 100%)" }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-2 mb-5 flex-wrap"
            >
              {["FPGA / ASIC", "Embedded Systems", "RTL Verification", "MEng ECE"].map((t) => (
                <span key={t} className="hero-tag">{t}</span>
              ))}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="syne text-5xl md:text-7xl font-extrabold text-white leading-none tracking-tight mb-4"
            >
              Ahmad<br />
              <span style={{ color: "var(--accent)" }}>Bilal</span> Irfan
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-sm tracking-widest uppercase mb-8"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              University of Waterloo — GPA 3.8 / 4.0
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex gap-4"
            >
              <a
                href="https://github.com/bilal99u"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-medium transition-all"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ahmad-bilal-irfan-2324b7149/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-medium border transition-all hover:bg-white hover:text-gray-900"
                style={{ border: "1px solid rgba(255,255,255,0.4)", color: "#fff" }}
              >
                <Linkedin size={14} /> LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex-shrink-0"
            style={{ width: 180, height: 180, border: "3px solid var(--accent)", overflow: "hidden" }}
          >
            <img src="/CV.jpg" alt="Ahmad Bilal Irfan" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        <a
          href="#about"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white opacity-50 animate-bounce"
        >
          <ChevronDown size={22} />
        </a>
      </section>

      {/* About */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-28 scroll-mt-24">
        <p className="section-label">01 — About</p>
        <div className="rule mb-8" />
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="syne text-3xl font-bold mb-5" style={{ color: "var(--ink)" }}>
              Building reliable<br />hardware from first principles.
            </h2>
          </div>
          <div style={{ color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.85 }}>
            <p>
              I'm a Master of Engineering candidate in Electrical and Computer Engineering at the
              University of Waterloo (GPA 3.8/4.0), specializing in digital systems, FPGA/ASIC
              design, and hardware verification. My work focuses on building efficient, reliable
              hardware systems — from cycle-accurate RTL pipelines to coverage-driven verification
              frameworks.
            </p>
            <p className="mt-4">
              I'm currently a Research Assistant at the Safety-Critical Real-Time Systems Lab and
              a member of UWASIC's control path design team. My background spans constrained-random
              verification, UVM methodology, embedded firmware, and ML-accelerator architecture
              exploration.
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} className="py-24 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-label">02 — Education</p>
          <div className="rule mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                degree: "M.Eng. Electrical & Computer Engineering",
                school: "University of Waterloo",
                location: "Waterloo, Canada",
                gpa: "GPA 3.8 / 4.0",
                period: "May 2025 – May 2027",
                note: "Current",
              },
              {
                degree: "B.Eng. Electrical Engineering (Electronics)",
                school: "Bahria University",
                location: "Islamabad, Pakistan",
                gpa: "GPA 3.92 / 4.0",
                period: "Sept 2017 – Aug 2021",
                note: "Summa Cum Laude",
              },
            ].map((e) => (
              <div key={e.school} className="card p-6">
                <span
                  className="text-xs font-medium uppercase tracking-widest mb-3 inline-block"
                  style={{ color: "var(--accent)" }}
                >
                  {e.note}
                </span>
                <h3 className="syne font-bold text-lg mb-1" style={{ color: "var(--ink)" }}>
                  {e.degree}
                </h3>
                <p className="font-medium text-sm mb-1">{e.school}</p>
                <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>
                  {e.location} · {e.period}
                </p>
                <span
                  className="text-xs font-bold tracking-wider px-3 py-1 inline-block"
                  style={{ background: "var(--ink)", color: "var(--bg)" }}
                >
                  {e.gpa}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-4xl mx-auto px-6 py-28 scroll-mt-24">
        <p className="section-label">03 — Skills</p>
        <div className="rule mb-2" />
        {SKILLS.map((s) => (
          <div key={s.category} className="skill-row">
            <span className="font-medium text-xs uppercase tracking-widest" style={{ color: "var(--ink)" }}>
              {s.category}
            </span>
            <span className="text-sm" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              {s.items}
            </span>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section id="experience" style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} className="py-24 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-label">04 — Experience</p>
          <div className="rule mb-10" />
          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((e) => (
              <div key={e.role} className="exp-card">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="syne font-bold text-lg" style={{ color: "var(--ink)" }}>
                      {e.role}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      {e.org} · {e.location}
                    </p>
                  </div>
                  <span className="tag">{e.period}</span>
                </div>
                <ul className="flex flex-col gap-2 mt-3">
                  {e.bullets.map((b) => (
                    <li key={b} className="bullet-dot text-sm" style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="section-label">05 — Projects</p>
          <div className="rule mb-12" />

          {/* Hardware */}
          <div className="flex items-center gap-4 mb-8">
            <h3 className="syne font-bold text-xl" style={{ color: "var(--ink)" }}>Hardware & Embedded Systems</h3>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {HW_PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="card p-5 flex flex-col"
              >
                <h4 className="syne font-semibold text-sm mb-2" style={{ color: "var(--ink)", lineHeight: 1.4 }}>
                  {p.title}
                </h4>
                <p className="text-xs flex-1 mb-4" style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                {p.link !== "#" && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs uppercase tracking-widest font-medium transition-colors"
                    style={{ color: "var(--accent)" }}
                  >
                    GitHub →
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          {/* ML */}
          <div className="flex items-center gap-4 mb-8">
            <h3 className="syne font-bold text-xl" style={{ color: "var(--ink)" }}>Machine Learning & AI</h3>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {ML_PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="card p-5 flex flex-col"
              >
                <h4 className="syne font-semibold text-sm mb-2" style={{ color: "var(--ink)", lineHeight: 1.4 }}>
                  {p.title}
                </h4>
                <p className="text-xs flex-1 mb-4" style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs uppercase tracking-widest font-medium transition-colors"
                  style={{ color: "var(--accent)" }}
                >
                  GitHub →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizations */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} className="py-20 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-label">06 — Organizations</p>
          <div className="rule mb-8" />
          <div className="flex flex-wrap gap-4">
            {[
              { name: "UWASIC – Control Path Design & Verification", sub: "University of Waterloo", period: "May 2025 – Present" },
              { name: "Institute of Electrical and Electronics Engineers (IEEE)", sub: "Member", period: "Aug 2019 – Aug 2021" },
            ].map((o) => (
              <div key={o.name} className="org-pill card flex-1" style={{ minWidth: 260 }}>
                <div
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-xs font-bold"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  {o.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>{o.name}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>{o.sub} · {o.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-28 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-label">07 — Contact</p>
          <div className="rule mb-12" />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="syne text-4xl font-extrabold mb-4" style={{ color: "var(--ink)", lineHeight: 1.15 }}>
                Let's build<br />
                <span style={{ color: "var(--accent)" }}>something fast.</span>
              </h2>
              <p className="text-sm mb-8" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
                Open to hardware verification, ASIC/FPGA design, embedded firmware, and research
                collaboration roles. Reach out anytime.
              </p>
              <div className="flex gap-4">
                {[
                  { href: "https://github.com/bilal99u", icon: <Github size={16} />, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/ahmad-bilal-irfan-2324b7149/", icon: <Linkedin size={16} />, label: "LinkedIn" },
                  { href: "mailto:abirfan@uwaterloo.ca", icon: <Mail size={16} />, label: "Email" },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-widest font-medium border transition-all hover:border-red-600 hover:text-red-600"
                    style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
                  >
                    {l.icon} {l.label}
                  </a>
                ))}
              </div>
            </div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:abirfan@uwaterloo.ca"
              className="flex flex-col justify-center items-start p-10 transition-all"
              style={{
                background: "var(--ink)",
                color: "#fff",
                height: 200,
                textDecoration: "none",
              }}
            >
              <span className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
                abirfan@uwaterloo.ca
              </span>
              <span className="syne text-2xl font-bold">Send a message →</span>
            </motion.a>
          </div>
        </div>
      </section>

      <footer
        className="text-center py-6 text-xs uppercase tracking-widest"
        style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}
      >
        © {new Date().getFullYear()} Ahmad Bilal Irfan — All rights reserved
      </footer>
    </div>
  );
}