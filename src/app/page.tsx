"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, X } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Ahmad Bilal Irfan</h1>
          <div className="space-x-6 text-sm font-medium">
            <a href="#about" className={active === 'about' ? 'text-blue-600 font-semibold' : 'hover:text-blue-600 transition-colors'}>About</a>
            <a href="#projects" className={active === 'projects' ? 'text-blue-600 font-semibold' : 'hover:text-blue-600 transition-colors'}>Projects</a>
            <a href="#links" className={active === 'links' ? 'text-blue-600 font-semibold' : 'hover:text-blue-600 transition-colors'}>Links</a>
            <a href="#contact" className={active === 'contact' ? 'text-blue-600 font-semibold' : 'hover:text-blue-600 transition-colors'}>Contact</a>
          </div>
        </div>
        <div className="h-0.5 bg-blue-100 w-full"></div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row justify-center items-center h-screen text-center md:text-left px-6 md:px-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://cdn.builtin.com/sites/www.builtin.com/files/2024-04/FPGA%201200x635.jpg')" }}
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
              SystemVerilog &bull; UVM &bull; RTL Design &bull; CAN-Bus &bull; RISC-V &bull; MEng ECE @ University of Waterloo
            </motion.p>
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
          QuestaSim, Xilinx Vivado, and Intel Quartus. I am actively targeting hardware verification, ASIC design,
          and embedded firmware roles.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-white py-24 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-8">Projects</h3>

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

      {/* Links Section */}
      <section id="links" className="max-w-4xl mx-auto px-4 py-24 text-center scroll-mt-24">
        <h3 className="text-2xl font-semibold mb-8">Links</h3>
        <div className="flex justify-center space-x-8">
          <a href="https://github.com/bilal99u" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors"><Github size={28} /></a>
          <a href="https://www.linkedin.com/in/ahmad-bilal-irfan-2324b7149/" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors"><Linkedin size={28} /></a>
          <a href="mailto:abirfan@uwaterloo.ca" className="text-gray-700 hover:text-blue-600 transition-colors"><Mail size={28} /></a>
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
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{modal.details}</p>
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