import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CircuitBoard, Cpu, Radio, ShieldCheck } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Projects | Ahmad Bilal Irfan",
  description: "Selected FPGA, ASIC, RTL verification, embedded systems, and machine learning projects.",
};

const highlights = [
  {
    icon: <Cpu size={20} />,
    category: "Processor design",
    title: "Cycle-Accurate 5-Stage Pipelined RISC-V Processor",
    description: "RV32I pipeline in SystemVerilog with forwarding, hazard detection, branch prediction, and assertion-based verification.",
    tags: ["SystemVerilog", "SVA", "CRV"],
    href: "https://github.com/bilal99u/RISC-V-Verilog-Implementation-",
    metric: "5 pipeline stages",
  },
  {
    icon: <CircuitBoard size={20} />,
    category: "FPGA architecture",
    title: "2048-bit High-Performance Adder",
    description: "Kogge–Stone parallel-prefix architecture targeting Intel Agilex 5, with register retiming and automated QoR exploration.",
    tags: ["Verilog", "Intel Quartus", "Python"],
    href: "",
    metric: "825 MHz reported",
  },
  {
    icon: <ShieldCheck size={20} />,
    category: "Verification",
    title: "CAN-Bus Fault Injection & Verification Framework",
    description: "Hybrid C++/Python framework for protocol-level fault injection, coverage-driven testing, and failure-log analysis.",
    tags: ["C++", "Python", "pybind11"],
    href: "",
    metric: "Coverage-driven",
  },
  {
    icon: <Radio size={20} />,
    category: "Embedded systems",
    title: "Verilog RTL CAN-Bus Receiver/Decoder",
    description: "Receiver with dynamic bit-rate and frame-length detection, message filtering, and FPGA validation.",
    tags: ["Verilog", "FPGA", "CAN"],
    href: "",
    metric: "FPGA validated",
  },
];

const categories = [
  { title: "FPGA & high-speed links", description: "Serial Lite III and PCI Express design focus areas, including link bring-up, clocking, framing, and data integrity." },
  { title: "Power electronics & RF", description: "MPPT conversion, regulated power, and FM transceiver work spanning circuit design through board validation." },
  { title: "Machine learning", description: "Hands-on experiments in computer vision, generative models, reinforcement learning, and applied classification." },
];

export default function ProjectsPage() {
  return (
    <div className="portfolio-theme min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-5 pb-14 pt-16 sm:pb-20 sm:pt-24">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-200"><ArrowLeft size={15} /> All portfolio sections</Link>
          <div className="mt-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Selected work</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Hardware ideas, made testable.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">A selection of digital design, verification, FPGA, embedded, and applied ML work. Some interface entries describe active design focus areas rather than completed implementations.</p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">RTL design</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">Verification</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">FPGA</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">Embedded</span>
          </div>
        </section>

        <section className="border-y border-slate-800/80 bg-slate-900/35">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Featured projects</p><h2 className="mt-2 text-3xl font-semibold">Selected engineering work</h2></div>
              <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">Open design tools <ArrowUpRight size={15} /></Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {highlights.map((project, index) => (
                <article key={project.title} className="flex flex-col rounded-3xl border border-slate-800 bg-slate-950/70 p-6 transition hover:-translate-y-1 hover:border-cyan-900/80 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex rounded-xl border border-cyan-900/70 bg-cyan-950/50 p-3 text-cyan-300">{project.icon}</span>
                    <span className="font-mono text-xs text-slate-600">0{index + 1}</span>
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{project.category}</p>
                  <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-slate-400">{project.description}</p>
                  <p className="mt-5 text-sm font-medium text-slate-200">{project.metric}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">{project.tags.map((tag) => <li key={tag} className="rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-400">{tag}</li>)}</ul>
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">View project <ArrowUpRight size={15} /></a>
                  ) : (
                    <p className="mt-6 text-xs text-slate-500">Project details available on request</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">More areas of exploration</p>
          <h2 className="mt-3 text-3xl font-semibold">Beyond the featured work.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {categories.map((category) => (
              <article key={category.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{category.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/library" className="rounded-lg border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-cyan-800 hover:text-cyan-200">Browse engineering library</Link>
            <Link href="/contact" className="rounded-lg bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Discuss a project</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
