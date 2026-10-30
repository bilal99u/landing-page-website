"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, X } from 'lucide-react';

type Project = {
  title: string;
  desc: string;
  details: string;
  tags?: string[];
  link?: string;
};

const HW_PROJECTS: Project[] = [
  {
    title: 'Cycle-Accurate 5-Stage Pipelined RISC-V Processor',
    desc: 'RV32I pipeline in SystemVerilog with data forwarding, hazard detection, branch prediction, and SVA assertion-based verification.',
    details: `RTL implementation of a full RV32I 5-stage pipeline (IF, ID, EX, MEM, WB) in SystemVerilog. Features data forwarding paths, hazard detection unit, and static branch prediction. Verified against the RISC-V compliance suite using a self-checking testbench with SVA assertion-based checking and constrained-random instruction stimulus. Models a simplified AI/ML inference accelerator control path.`,
    tags: ['SystemVerilog', 'SVA', 'CRV', 'FPGA'],
    link: 'https://github.com/bilal99u/RISC-V-Verilog-Implementation-',
  },
  {
    title: '2048-bit High-Performance Adder – Intel Agilex 5 FPGA',
    desc: 'Kogge-Stone parallel prefix adder achieving 825 MHz and 37% speed improvement; register retiming cut latency from 230 to 11 cycles.',
    details: `Designed a 2048-bit Kogge-Stone parallel prefix adder in Verilog targeting the Intel Agilex 5 FPGA. Achieved 825 MHz after register retiming, reducing latency from 230 to 11 cycles (37% speed improvement). Swept FPGA architectural parameters across configurations and automated QoR extraction in Python, achieving 41% better MHz/ALM efficiency over a ripple-carry baseline. Critical arithmetic block for AI silicon and DSP datapaths.`,
    tags: ['Verilog', 'Intel Quartus', 'Python', 'DSP'],
  },
  {
    title: 'Coverage-Driven CAN-Bus Fault Injection & Verification Framework',
    desc: 'Hybrid C++/Python (pybind11) framework for protocol-level fault injection into an RTL CAN-Bus model with UVM-style CRV methodology.',
    details: `Built a hybrid C++/Python verification framework using pybind11 for protocol-level fault injection into an RTL CAN-Bus model. Automated fail-log collection and root-cause clustering aligned with UVM-style constrained-random verification methodology. Implemented functional coverage bins targeting error frames, bit-stuffing violations, and arbitration edge cases to drive testbench completeness.`,
    tags: ['C++', 'Python', 'pybind11', 'UVM-style', 'CAN-Bus'],
  },
  {
    title: 'FPGA Architecture Exploration: 1D Systolic DSP Arrays',
    desc: 'Benchmarked systolic cascade vs. routing-fabric across 72 VTR configurations -- 91% frequency improvement, 47% wirelength reduction.',
    details: `Benchmarked systolic cascade vs. routing-fabric FPGA architectures across 72 VTR configurations, demonstrating 91% frequency improvement and 47% wirelength reduction for convolution/DSP workloads. Automated architecture generation and QoR extraction via Python across all test configurations. Analysis directly informs AI silicon and signal-processing FPGA design trade-offs.`,
    tags: ['VTR', 'Python', 'DSP', 'Architecture'],
  },
  {
    title: 'Verilog RTL CAN-Bus Receiver/Decoder',
    desc: 'CAN-Bus receiver with dynamic bit-rate and frame-length detection, verified on FPGA with simulation and hardware timing analysis.',
    details: `Designed a CAN-Bus receiver/decoder in Verilog RTL with dynamic bit-rate and frame-length detection. Implemented hardware-level ID-match trigger logic for autonomous CAN message filtering. Developed comprehensive simulation testbenches validating edge-case protocol behavior, then validated functional correctness on-board via directed and pseudo-random simulation followed by hardware timing analysis.`,
    tags: ['Verilog', 'FPGA', 'CAN-Bus'],
    link: 'https://github.com/bilal99u/landing-page-website',
  },
  {
    title: 'ASIC for Control Flow of Hashing Algorithm',
    desc: 'Digital ASIC control module implementing control flow for a custom hashing algorithm, focusing on low-latency FSM logic.',
    details: `Designed and verified a digital ASIC control module implementing the control flow for a custom hashing algorithm. Emphasizes low-latency finite-state machine (FSM) logic with clean state encoding and minimal critical path delay. Verified using directed testbenches in ModelSim with functional simulation prior to synthesis.`,
    tags: ['ASIC', 'FSM', 'ModelSim', 'RTL'],
  },
  {
    title: 'RISC-V Instruction Memory & Program Counter',
    desc: 'Memory-mapped instruction module and PC logic in Verilog, integrated with RISC-V pipeline stages.',
    details: `Developed a memory-mapped instruction memory module and program counter logic in Verilog. Designed to integrate cleanly with RISC-V pipeline stages, supporting sequential and branch-target addressing. Verified via simulation with directed test programs.`,
    tags: ['Verilog', 'RISC-V'],
    link: 'https://github.com/bilal99u/RISC-V-instruction-memory-and-program-counter-implementation-',
  },
  {
    title: '8051 MCU-Based Home Security System',
    desc: 'Microcontroller-based home alarm system with motion sensors, buzzer alerts, and password-protected keypad control.',
    details: `Developed an 8051 microcontroller-based home security system in embedded C. Features PIR motion sensor integration, active buzzer alert triggering, and a 4x4 keypad with password-protected arming/disarming logic. LCD display provides real-time system status feedback.`,
    tags: ['8051', 'Embedded C', 'MCU'],
  },
  {
    title: 'Rate Monotonic Scheduler',
    desc: 'Real-time scheduling algorithm in Python simulating CPU task scheduling with schedulability analysis.',
    details: `Implemented a Rate Monotonic Scheduling (RMS) algorithm in Python. Performs schedulability analysis using the Liu and Layland utilization bound, simulates CPU task execution on a timeline, and visualizes Gantt charts for task sets. Useful for validating real-time system designs before hardware implementation.`,
    tags: ['Python', 'RTOS', 'Scheduling'],
    link: 'https://github.com/bilal99u/Rate_Monotonic_Scheduler',
  },
];

const FPGA_FOCUS: Project[] = [
  {
    title: 'Serial Lite III FPGA Link',
    desc: 'Design focus: FPGA-to-FPGA streaming over high-speed transceivers, with attention to link bring-up, clocking, framing, and data integrity.',
    details: `A high-speed serial design focus around Intel FPGA Serial Lite III IP and transceiver-based links. Key engineering topics include lane and clock planning, link initialization, framing, throughput and latency trade-offs, reset sequencing, and end-to-end data-integrity checks. A complete implementation should document the target FPGA, lane rate, IP configuration, test setup, and measured results.`,
    tags: ['FPGA', 'Serial Lite III', 'Transceivers', 'Link bring-up'],
  },
  {
    title: 'PCI Express Gen3 FPGA Endpoint',
    desc: 'Design focus: a PCIe Gen3 endpoint architecture spanning transceiver configuration, link training, packet handling, and host-side validation.',
    details: `A PCI Express Gen3 FPGA design focus built around an endpoint and its high-speed transceiver interface. The architecture spans the 8.0 GT/s-per-lane physical link, PCIe link training and status, transaction-layer packet handling, DMA data movement, clock-domain boundaries, and host-side validation. A complete implementation should include the target device and IP configuration, software or driver setup, throughput measurements, and error-recovery results.`,
    tags: ['FPGA', 'PCIe Gen3', '8.0 GT/s', 'DMA', 'Transceivers'],
  },
];

const POWER_PROJECTS: Project[] = [
  {
    title: 'MPPT Solar Charge Controller & 12V DC Regulated Power Supply',
    desc: 'Buck converter-based MPPT circuit for a solar cooling system achieving ~78% tracking efficiency and ~30% reduction in power loss over direct-connect baseline.',
    details: `Designed and tested a DC-DC buck converter-based Maximum Power Point Tracking (MPPT) circuit for a solar-powered cooling system. Identified and resolved component-level failure modes during bring-up, achieving approximately 78% tracking efficiency and a 30% reduction in power loss compared to a direct-connect baseline.\n\nAlso built and validated a 220V AC to 12V DC regulated PCB power supply comprising a step-down transformer, bridge rectifier, and 7812 linear regulator. Performed load regulation and ripple testing, confirming under 50mV output ripple at full load, with results documented against design specification.`,
    tags: ['Power Electronics', 'DC-DC Converter', 'MPPT', 'PCB Design', 'Proteus'],
  },
  {
    title: 'FM Transceiver -- RF Circuit Design, Fault Diagnosis, and PCB Validation',
    desc: 'FM transmitter and receiver designed in Proteus from schematic to etched PCB; stable operation across 88-108 MHz with ~30m reception range and <3% THD.',
    details: `Designed FM transmitter and receiver circuits in Proteus, taking the design from schematic capture through to a fully etched PCB. Diagnosed and resolved inter-stage interference and impedance mismatch faults that emerged during bring-up, restoring stable operation across the full 88-108 MHz FM band.\n\nValidated end-to-end RF link performance with approximately 30m reception range and less than 3% Total Harmonic Distortion (THD) on the demodulated audio output. Documented all failure observations and layout corrections in a structured engineering report.`,
    tags: ['RF Design', 'PCB Layout', 'Proteus', 'Fault Diagnosis', 'Impedance Matching'],
  },
];

const ML_PROJECTS: Project[] = [
  {
    title: 'CNN LeNet',
    desc: 'Convolutional neural network (LeNet) for image classification tasks in PyTorch.',
    details: `Implemented the classic LeNet-5 convolutional neural network architecture from scratch in PyTorch. Trained and evaluated on standard image classification benchmarks, with experiments on learning rate schedules and batch normalization variants.`,
    tags: ['PyTorch', 'CNN'],
    link: 'https://github.com/bilal99u/CNN_LeNET',
  },
  {
    title: 'Variational Autoencoder - Anime Image Generator',
    desc: 'VAE model to generate anime-style images using PyTorch and latent variable sampling.',
    details: `Built a Variational Autoencoder (VAE) in PyTorch trained on an anime faces dataset. Implements the reparameterization trick for backpropagation through stochastic nodes. Explored latent space interpolation and random sampling to generate novel anime-style face images.`,
    tags: ['PyTorch', 'VAE', 'Generative'],
    link: 'https://github.com/bilal99u/Variational-Autoencoder-Anime-Image-Generator',
  },
  {
    title: 'Multi-Armed Bandit ML Project',
    desc: 'Exploration-exploitation strategies for the multi-armed bandit problem, with comparative visualization.',
    details: `Implemented and compared multiple exploration-exploitation strategies for the multi-armed bandit problem: epsilon-greedy, UCB1, and Thompson Sampling. Visualized cumulative regret and reward curves across strategies to highlight trade-offs in exploration efficiency.`,
    tags: ['RL', 'Python'],
    link: 'https://github.com/bilal99u/Multi_armed_bundit_ML_project',
  },
  {
    title: 'Stroke Prediction',
    desc: 'KNN, Logistic Regression, and XGBoost models on healthcare data to predict stroke risk.',
    details: `Trained and compared KNN, Logistic Regression, and XGBoost classifiers on a healthcare stroke dataset. Addressed class imbalance using SMOTE oversampling. Evaluated models using ROC-AUC, precision-recall, and confusion matrix metrics.`,
    tags: ['XGBoost', 'Sklearn', 'Healthcare'],
    link: 'https://github.com/bilal99u/Stroke_prediction',
  },
  {
    title: 'PCA - Penguins Dataset',
    desc: 'Principal Component Analysis for dimensionality reduction and species cluster visualization.',
    details: `Applied PCA to the Palmer Penguins dataset to reduce dimensionality from 4 features to 2 principal components. Visualized species separation in the reduced space, demonstrating clear cluster boundaries and variance explained by each component.`,
    tags: ['PCA', 'Python', 'Visualization'],
    link: 'https://github.com/bilal99u/PCA_penguins_dataset',
  },
  {
    title: 'K-Means Clustering',
    desc: 'K-Means clustering implemented from scratch in Python with convergence visualization.',
    details: `Implemented K-Means clustering from scratch in Python without sklearn. Includes centroid initialization (random and k-means++), iterative assignment/update steps, and animated convergence visualization. Compared clustering quality across different k values using the elbow method.`,
    tags: ['Clustering', 'Python'],
    link: 'https://github.com/bilal99u/k_means-initial',
  },
  {
    title: 'Wine Model',
    desc: 'Classification model for the wine dataset with hyperparameter tuning and performance visualization.',
    details: `Built and tuned a classification pipeline on the UCI Wine dataset. Compared Decision Tree, Random Forest, and SVM classifiers. Applied grid search cross-validation for hyperparameter optimization and visualized feature importances and decision boundaries.`,
    tags: ['Classification', 'Python', 'Sklearn'],
    link: 'https://github.com/bilal99u/wine_model',
  },
];

export default function Portfolio() {
  const [active, setActive] = useState('');
  const [modal, setModal] = useState<Project | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  return (
    <div className="portfolio-theme min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-6">
          <Link href="/" className="text-lg font-semibold">Ahmad Bilal Irfan</Link>
          <div className="flex min-w-0 items-center gap-3 overflow-x-auto whitespace-nowrap text-sm font-medium sm:gap-5">
            <a href="#about" className={`${active === 'about' ? 'text-blue-600 font-semibold' : 'hover:text-blue-600 transition-colors'}`}>About</a>
            <a href="#experience" className="hover:text-blue-600 transition-colors">Experience</a>
            <a href="#projects" className={active === 'projects' ? 'text-blue-600 font-semibold' : 'hover:text-blue-600 transition-colors'}>Projects</a>
            <Link href="/projects" className="hover:text-blue-600 transition-colors">All work</Link>
            <Link href="/library" className="hover:text-blue-600 transition-colors">Library</Link>
            <Link href="/tools" className="hover:text-blue-600 transition-colors">Tools</Link>
            <Link href="/notes" className="hover:text-blue-600 transition-colors">Notes</Link>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
        <div className="h-0.5 bg-blue-100 w-full"></div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row justify-center items-center h-screen text-center md:text-left px-6 md:px-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/fpga-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="max-w-xl bg-black/40 p-6 rounded-2xl backdrop-blur-sm">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
            >
              FPGA / ASIC &amp; Embedded Systems Engineer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-2xl text-gray-100 font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
            >
              FPGA architecture &bull; SystemVerilog &bull; RTL verification &bull; High-speed serial links &bull; MEng ECE @ University of Waterloo
            </motion.p>
            <a href="#projects" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Explore projects <ArrowRight size={16} />
            </a>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-full border-4 border-white shadow-xl overflow-hidden w-40 h-40 md:w-56 md:h-56 flex-shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/CV.jpg" alt="Ahmad Bilal Irfan" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section aria-label="Portfolio highlights" className="border-b border-slate-800 bg-slate-950 px-5 py-7">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
          <div><p className="text-2xl font-semibold text-cyan-300">2048-bit</p><p className="mt-1 text-xs text-slate-400 sm:text-sm">Adder architecture</p></div>
          <div><p className="text-2xl font-semibold text-cyan-300">825 MHz</p><p className="mt-1 text-xs text-slate-400 sm:text-sm">Reported FPGA result</p></div>
          <div><p className="text-2xl font-semibold text-cyan-300">72</p><p className="mt-1 text-xs text-slate-400 sm:text-sm">Architecture configurations</p></div>
          <div><p className="text-2xl font-semibold text-cyan-300">3.8 / 4.0</p><p className="mt-1 text-xs text-slate-400 sm:text-sm">Graduate GPA</p></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto px-4 py-24 scroll-mt-24">
        <h3 className="text-2xl font-semibold mb-4">About</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          I am a Master of Engineering candidate in Electrical and Computer Engineering at the University of Waterloo (GPA 3.8/4.0),
          specializing in RTL design, FPGA/ASIC verification, and embedded hardware. My focus is on building efficient,
          reliable hardware systems -- from cycle-accurate processor pipelines to coverage-driven verification frameworks.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I am currently a Research Assistant at the Safety-Critical Real-Time Systems Lab, where I design and verify
          RTL CAN-Bus modules on FPGA, and a member of the UWASIC control path design team. Previously, I interned as
          an ASIC Design and Verification Engineer at the National Institute of Electronics, contributing to a custom
          solar-tracking IC that achieved an 82% accuracy improvement through simulation-driven RTL refinement.
        </p>
        <p className="text-gray-700 leading-relaxed">
          My skill set spans SystemVerilog (UVM, SVA, CRV), Verilog, C/C++, Python, and industry EDA tools including
          QuestaSim, Xilinx Vivado, and Intel Quartus. I am especially interested in FPGA architecture, high-speed
          transceiver-based interfaces, hardware verification, and embedded systems.
        </p>
      </section>

      <section id="experience" className="scroll-mt-24 border-y border-slate-800 bg-slate-950/70 px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Experience & education</p>
              <h3 className="mt-3 text-3xl font-semibold text-slate-100">Hardware built with a research mindset.</h3>
            </div>
            <Link href="/experience" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">Full experience <ArrowRight size={16} /></Link>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Graduate study</p>
              <h4 className="mt-3 font-semibold text-slate-100">University of Waterloo</h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">MEng in Electrical and Computer Engineering, focused on RTL, FPGA/ASIC, and embedded hardware.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Research</p>
              <h4 className="mt-3 font-semibold text-slate-100">Safety-Critical Real-Time Systems Lab</h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">Research Assistant designing and verifying RTL CAN-Bus modules on FPGA.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Industry</p>
              <h4 className="mt-3 font-semibold text-slate-100">ASIC design & verification</h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">Contributed to a custom solar-tracking IC through simulation-driven RTL refinement.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="expertise" className="scroll-mt-24 max-w-5xl mx-auto px-4 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Areas of expertise</p>
        <h3 className="mt-3 text-3xl font-semibold">From first principles to verified RTL.</h3>
        <p className="mt-4 max-w-2xl leading-7 text-slate-400">A cross-disciplinary toolkit for designing, testing, and improving real-time digital systems.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'RTL & architecture', items: 'SystemVerilog · Verilog · RISC-V · FPGA/ASIC' },
            { title: 'Verification', items: 'UVM · SVA · constrained-random · functional coverage' },
            { title: 'High-speed systems', items: 'PCIe · transceivers · clocking · link bring-up' },
            { title: 'Engineering tools', items: 'QuestaSim · Quartus · Vivado · Python · C/C++' },
          ].map((area) => (
            <article key={area.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <h4 className="font-semibold text-slate-100">{area.title}</h4>
              <p className="mt-3 text-sm leading-6 text-slate-400">{area.items}</p>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">More about my approach <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-white py-24 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-8">Projects</h3>

          <h4 className="text-xl font-semibold mb-2 text-blue-600">FPGA &amp; High-Speed Interfaces</h4>
          <p className="text-sm text-gray-600 mb-4">Current design focus areas — implementation details and measured results will be added as projects are completed.</p>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {FPGA_FOCUS.map((p) => (
              <article key={p.title} className="rounded-xl border border-blue-100 bg-blue-50/50 p-6 shadow-sm">
                <h5 className="text-base font-semibold mb-2">{p.title}</h5>
                <p className="text-sm text-gray-600 mb-4">{p.desc}</p>
                {p.tags && (
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs bg-white text-blue-700 border border-blue-100 px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          <h4 className="text-xl font-semibold mb-4 text-blue-600">Hardware &amp; Embedded Systems</h4>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {HW_PROJECTS.map((p) => (
              <motion.div
                key={p.title}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: 'spring', stiffness: 150 }}
                className="p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-lg bg-gray-50 transition-transform flex flex-col"
              >
                <h4 className="text-base font-semibold mb-2">{p.title}</h4>
                <p className="text-sm text-gray-600 mb-3 flex-1">{p.desc}</p>
                {p.tags && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setModal(p)}
                  className="text-blue-600 text-sm font-medium hover:underline text-left"
                >
                  View Details &rarr;
                </button>
              </motion.div>
            ))}
          </div>

          <h4 className="text-xl font-semibold mb-4 text-blue-600">Power Electronics &amp; RF</h4>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {POWER_PROJECTS.map((p) => (
              <motion.div
                key={p.title}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: 'spring', stiffness: 150 }}
                className="p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-lg bg-gray-50 transition-transform flex flex-col"
              >
                <h4 className="text-base font-semibold mb-2">{p.title}</h4>
                <p className="text-sm text-gray-600 mb-3 flex-1">{p.desc}</p>
                {p.tags && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setModal(p)}
                  className="text-blue-600 text-sm font-medium hover:underline text-left"
                >
                  View Details &rarr;
                </button>
              </motion.div>
            ))}
          </div>

          <h4 className="text-xl font-semibold mb-4 text-blue-600">Machine Learning &amp; AI</h4>
          <div className="grid md:grid-cols-3 gap-8">
            {ML_PROJECTS.map((p) => (
              <motion.div
                key={p.title}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: 'spring', stiffness: 150 }}
                className="p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-lg bg-gray-50 transition-transform flex flex-col"
              >
                <h4 className="text-base font-semibold mb-2">{p.title}</h4>
                <p className="text-sm text-gray-600 mb-3 flex-1">{p.desc}</p>
                {p.tags && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setModal(p)}
                  className="text-blue-600 text-sm font-medium hover:underline text-left"
                >
                  View Details &rarr;
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className="scroll-mt-24 border-y border-slate-800 bg-slate-950/70 px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">My engineering loop</p>
          <h3 className="mt-3 text-3xl font-semibold">Make progress observable.</h3>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { number: '01', title: 'Understand the constraints', text: 'Start with the timing, interface, and system requirements that shape the design.' },
              { number: '02', title: 'Build for verification', text: 'Keep behavior explicit and create tests that exercise important paths and edge cases.' },
              { number: '03', title: 'Measure and refine', text: 'Use simulation, timing analysis, and hardware results to guide the next iteration.' },
            ].map((step) => (
              <article key={step.number} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <p className="font-mono text-sm text-cyan-300">{step.number}</p>
                <h4 className="mt-4 text-lg font-semibold text-slate-100">{step.title}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-400">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section id="links" className="max-w-4xl mx-auto px-4 py-24 text-center scroll-mt-24">
        <h3 className="text-2xl font-semibold mb-8">Links</h3>
        <p className="text-gray-600 mb-6">Browse my FPGA notes, references, and saved resources in the <Link href="/library" className="font-medium text-blue-600 hover:underline">Engineering Library</Link>.</p>
        <div className="flex justify-center space-x-8">
          <a href="https://github.com/bilal99u" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors"><Github size={28} /></a>
          <a href="https://www.linkedin.com/in/ahmad-bilal-irfan-2324b7149/" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors"><Linkedin size={28} /></a>
          <a href="mailto:abirfan@uwaterloo.ca" className="text-gray-700 hover:text-blue-600 transition-colors"><Mail size={28} /></a>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 max-w-4xl mx-auto px-5 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Quick answers</p>
        <h3 className="mt-3 text-3xl font-semibold">A few things people ask.</h3>
        <div className="mt-7 space-y-3">
          {[
            { question: 'What kind of engineering work do you focus on?', answer: 'My primary interests are FPGA and ASIC design, RTL verification, processor architecture, high-speed interfaces, and embedded systems.' },
            { question: 'Are the high-speed interface projects completed implementations?', answer: 'The Serial Lite III and PCI Express entries are identified as design focus areas. The project page distinguishes these from completed projects.' },
            { question: 'Where can I find practical FPGA references and utilities?', answer: 'The Engineering Library collects shareable public references, while the FPGA Tools page includes bandwidth, timing, and number-conversion helpers.' },
          ].map((item) => (
            <details key={item.question} className="group rounded-xl border border-slate-800 bg-slate-900/50 px-5 py-4">
              <summary className="cursor-pointer list-none font-medium text-slate-200 marker:hidden">{item.question}</summary>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-100 py-24 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-4">Contact</h3>
          <p className="text-gray-600 mb-6">Interested in collaborating or discussing hardware design, AI, or embedded systems? Feel free to reach out.</p>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:abirfan@uwaterloo.ca"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Get in Touch
          </motion.a>
          <Link href="/contact" className="ml-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline">
            More ways to connect <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <footer className="text-center text-gray-500 text-sm py-6 border-t">
        &copy; {new Date().getFullYear()} Ahmad Bilal Irfan
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setModal(null)}
            />
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 z-10"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            >
              <button
                onClick={() => setModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <h3 className="text-lg font-bold text-gray-900 mb-3 pr-6">{modal.title}</h3>
              {modal.tags && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {modal.tags.map((t) => (
                    <span key={t} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
              )}
              <div className="text-gray-600 text-sm leading-relaxed mb-5 flex flex-col gap-3">
                {modal.details.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="flex gap-3">
                {modal.link && modal.link !== '#' && (
                  <a
                    href={modal.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                  >
                    <Github size={14} /> View on GitHub
                  </a>
                )}
                <button
                  onClick={() => setModal(null)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}