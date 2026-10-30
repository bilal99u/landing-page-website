import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Code2, Cpu, Layers3, Microscope } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "About | Ahmad Bilal Irfan",
  description: "Learn about Ahmad Bilal Irfan's work in FPGA and ASIC design, RTL verification, and embedded systems.",
};

const disciplines = [
  {
    icon: <Cpu size={21} />,
    title: "Digital design",
    description: "RTL architecture, FPGA implementation, processor pipelines, and high-speed interfaces.",
  },
  {
    icon: <Layers3 size={21} />,
    title: "Verification",
    description: "SystemVerilog, assertions, constrained-random stimulus, coverage, and hardware validation.",
  },
  {
    icon: <Code2 size={21} />,
    title: "Engineering software",
    description: "Python, C/C++, and automation for testbenches, design exploration, and result analysis.",
  },
  {
    icon: <Microscope size={21} />,
    title: "Applied research",
    description: "Safety-critical real-time systems, embedded hardware, and practical design trade-offs.",
  },
];

const skills = [
  ["RTL & hardware", "SystemVerilog", "Verilog", "FPGA", "ASIC", "RISC-V"],
  ["Verification", "UVM", "SVA", "Constrained-random", "Functional coverage", "Simulation"],
  ["Tools & software", "QuestaSim", "Vivado", "Quartus", "Python", "C/C++"],
];

export default function AboutPage() {
  return (
    <div className="portfolio-theme min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:pb-24 sm:pt-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">A little about me</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">I build dependable hardware, from RTL to real systems.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                I’m Ahmad, a Master of Engineering candidate in Electrical and Computer Engineering at the University of Waterloo. I enjoy turning complex hardware problems into designs that are measurable, testable, and ready to work in the real world.
              </p>
            </div>
            <div className="rounded-3xl border border-cyan-900/60 bg-gradient-to-br from-cyan-950/60 to-slate-900 p-7">
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">Current focus</p>
              <p className="mt-4 text-2xl font-semibold">FPGA architecture · RTL verification · embedded systems</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">MEng ECE at the University of Waterloo · GPA 3.8/4.0</p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-800/80 bg-slate-900/40">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">How I work</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Curiosity is useful. Evidence is better.</h2>
              <p className="mt-4 leading-7 text-slate-400">I like to understand the constraints first, make a design easy to inspect, and verify assumptions at every stage—from simulation through board-level testing.</p>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {disciplines.map((item) => (
                <article key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                  <div className="text-cyan-300">{item.icon}</div>
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Technical toolkit</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Tools I reach for.</h2>
              <p className="mt-4 leading-7 text-slate-400">A practical mix of design, verification, and analysis skills for moving between concept and implementation.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {skills.map(([category, ...items]) => (
                <article key={category} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <h3 className="font-semibold text-slate-200">{category}</h3>
                  <ul className="mt-4 space-y-3">
                    {items.map((item) => <li key={item} className="text-sm text-slate-400">{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20">
          <div className="flex flex-col gap-5 rounded-3xl border border-slate-800 bg-slate-900/70 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="text-2xl font-semibold">Want to see the work?</h2>
              <p className="mt-2 text-slate-400">Explore project write-ups, design tools, and engineering references.</p>
            </div>
            <Link href="/projects" className="inline-flex w-fit items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Browse projects <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
