"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Portfolio() {
  const [active, setActive] = useState('');

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

{/* Hero Section with High Contrast Text */}
<section className="relative flex flex-col md:flex-row justify-center items-center h-screen text-center md:text-left px-6 md:px-16 overflow-hidden">
  {/* Background */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-50"
    style={{
      backgroundImage:
        "url('https://cdn.builtin.com/sites/www.builtin.com/files/2024-04/FPGA%201200x635.jpg')",
    }}
  ></div>

  {/* Darker Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
    {/* Text with Darker Styling */}
    <div className="max-w-xl bg-black/40 p-6 rounded-2xl backdrop-blur-sm">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
      >
        FPGA / ASIC & Embedded Systems Engineer
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-2xl text-gray-100 font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
      >
        AI | Real-Time Systems | RISC-V | Verilog RTL | MEng ECE @ University of Waterloo
      </motion.p>
    </div>

    {/* Profile Photo */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="rounded-full border-4 border-white shadow-xl overflow-hidden w-40 h-40 md:w-56 md:h-56 flex-shrink-0"
    >
      <img
        src="/CV.jpg"
        alt="Ahmad Bilal Irfan"
        className="w-full h-full object-cover"
      />
    </motion.div>
  </div>
</section>



      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto px-4 py-24 scroll-mt-24">
        <h3 className="text-2xl font-semibold mb-4">About</h3>
        <p className="text-gray-700 leading-relaxed">
          I’m a Master of Engineering candidate in Electrical and Computer Engineering at the University of Waterloo, specializing in digital systems, FPGA/ASIC design, and embedded hardware. My focus is on building efficient, reliable hardware systems that bridge the gap between high-level design and real-world implementation.
        </p>
      </section>

      {/* Projects Section */}
<section id="projects" className="bg-white py-24 scroll-mt-24">
  <div className="max-w-5xl mx-auto px-4">
    <h3 className="text-2xl font-semibold mb-8">Projects</h3>

    {/* Hardware & Embedded Systems */}
    <h4 className="text-xl font-semibold mb-4 text-blue-600">Hardware & Embedded Systems</h4>
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {[
        {
          title: 'Cycle-Accurate 5-Stage Pipelined RISC-V Processor',
          desc: 'Built a 5-stage RISC-V RV32I processor with data-forwarding, hazard detection, and branch prediction, verified via FPGA testbenches.',
          link: 'https://github.com/bilal99u/RISC-V-Verilog-Implementation-',
        },
        {
          title: 'RISC-V Instruction Memory & Program Counter',
          desc: 'Developed memory-mapped instruction module and PC logic in Verilog, integrated with RISC-V pipeline stages for simulation and testing.',
          link: 'https://github.com/bilal99u/RISC-V-instruction-memory-and-program-counter-implementation-',
        },
        {
          title: 'Verilog RTL CAN-Bus Receiver/Decoder',
          desc: 'Designed a CAN-Bus receiver with dynamic bit-rate and frame-length detection, verified on FPGA with simulation and hardware timing analysis.',
          link: 'https://github.com/bilal99u/landing-page-website',
        },
        {
          title: 'ASIC for Control Flow of Hashing Algorithm',
          desc: 'Designed and verified a digital ASIC control module implementing control flow for a custom hashing algorithm, focusing on low-latency finite-state logic.',
          link: '#',
        },
        {
          title: '8051 MCU-Based Home Security System',
          desc: 'Developed an 8051 microcontroller-based home alarm system featuring motion sensors, buzzer alerts, and password-protected keypad control.',
          link: '#',
        },
        {
          title: 'Rate Monotonic Scheduler',
          desc: 'Implemented a real-time scheduling algorithm in Python to analyze and simulate CPU task scheduling behavior.',
          link: 'https://github.com/bilal99u/Rate_Monotonic_Scheduler',
        },
      ].map((p) => (
        <motion.div
          key={p.title}
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: 'spring', stiffness: 150 }}
          className="p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-lg bg-gray-50 transition-transform"
        >
          <h4 className="text-lg font-semibold mb-2">{p.title}</h4>
          <p className="text-sm text-gray-600 mb-3">{p.desc}</p>
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            View on GitHub →
          </a>
        </motion.div>
      ))}
    </div>

    {/* AI & ML Projects */}
    <h4 className="text-xl font-semibold mb-4 text-blue-600">Machine Learning & AI</h4>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          title: 'CNN LeNet',
          desc: 'Implemented a convolutional neural network (LeNet) for image classification tasks in PyTorch.',
          link: 'https://github.com/bilal99u/CNN_LeNET',
        },
        {
          title: 'Variational Autoencoder – Anime Image Generator',
          desc: 'Built a VAE model to generate anime-style images using PyTorch and latent variable sampling.',
          link: 'https://github.com/bilal99u/Variational-Autoencoder-Anime-Image-Generator',
        },
        {
          title: 'Multi-Armed Bandit ML Project',
          desc: 'Implemented and visualized exploration–exploitation strategies for the multi-armed bandit problem.',
          link: 'https://github.com/bilal99u/Multi_armed_bundit_ML_project',
        },
        {
          title: 'Stroke Prediction',
          desc: 'Trained multiple ML models (KNN, Logistic Regression, XGBoost) on healthcare data to predict stroke risk.',
          link: 'https://github.com/bilal99u/Stroke_prediction',
        },
        {
          title: 'PCA – Penguins Dataset',
          desc: 'Performed Principal Component Analysis (PCA) for dimensionality reduction and data visualization.',
          link: 'https://github.com/bilal99u/PCA_penguins_dataset',
        },
        {
          title: 'K-Means Clustering',
          desc: 'Built a simple K-Means clustering implementation from scratch in Python and visualized results.',
          link: 'https://github.com/bilal99u/k_means-initial',
        },
        {
          title: 'Wine Model',
          desc: 'Created a classification model for wine dataset with performance tuning and visualization.',
          link: 'https://github.com/bilal99u/wine_model',
        },
      ].map((p) => (
        <motion.div
          key={p.title}
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: 'spring', stiffness: 150 }}
          className="p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-lg bg-gray-50 transition-transform"
        >
          <h4 className="text-lg font-semibold mb-2">{p.title}</h4>
          <p className="text-sm text-gray-600 mb-3">{p.desc}</p>
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            View on GitHub →
          </a>
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

      <footer className="text-center text-gray-500 text-sm py-6 border-t">© {new Date().getFullYear()} Ahmad Bilal Irfan</footer>
    </div>
  );
}