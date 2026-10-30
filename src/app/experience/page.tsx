import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BriefcaseBusiness, GraduationCap, Users } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Experience | Ahmad Bilal Irfan",
  description: "Education, research, and ASIC design experience in FPGA, RTL verification, and embedded hardware.",
};

const experiences = [
  {
    icon: <BriefcaseBusiness size={20} />,
    kind: "Research",
    title: "Research Assistant",
    organization: "Safety-Critical Real-Time Systems Lab",
    summary: "Designing and verifying RTL CAN-Bus modules on FPGA, with a focus on predictable behavior and thorough validation.",
    points: ["RTL design and simulation", "CAN protocol behavior", "FPGA-based validation"],
  },
  {
    icon: <Users size={20} />,
    kind: "Design team",
    title: "Control Path Design Team Member",
    organization: "UWASIC",
    summary: "Contributing to control-path design work as part of the University of Waterloo ASIC community.",
    points: ["Digital control logic", "ASIC design collaboration", "Design and verification"],
  },
  {
    icon: <BriefcaseBusiness size={20} />,
    kind: "Industry experience",
    title: "ASIC Design and Verification Engineer Intern",
    organization: "National Institute of Electronics",
    summary: "Contributed to a custom solar-tracking IC, applying simulation-driven RTL refinement to improve system accuracy.",
    points: ["ASIC design and verification", "Simulation-driven refinement", "Solar-tracking control logic"],
  },
];

export default function ExperiencePage() {
  return (
    <div className="portfolio-theme min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-20">
        <section className="max-w-3xl pb-12 pt-16 sm:pb-16 sm:pt-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Experience & education</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Learning by building, testing, and iterating.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">A growing path through graduate study, safety-critical systems research, and ASIC design.</p>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <article className="h-fit rounded-3xl border border-cyan-900/60 bg-gradient-to-br from-cyan-950/60 to-slate-900 p-7">
            <div className="inline-flex rounded-xl border border-cyan-900/70 bg-slate-950/50 p-3 text-cyan-300"><GraduationCap size={22} /></div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-cyan-300">Graduate education</p>
            <h2 className="mt-3 text-2xl font-semibold">Master of Engineering</h2>
            <p className="mt-2 text-slate-300">Electrical and Computer Engineering</p>
            <p className="mt-1 text-slate-400">University of Waterloo</p>
            <p className="mt-5 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">GPA · 3.8 / 4.0</p>
            <p className="mt-4 text-sm leading-6 text-slate-400">Focus areas include FPGA/ASIC systems, RTL design, verification, and embedded hardware.</p>
          </article>

          <div className="space-y-5">
            {experiences.map((item) => (
              <article key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex rounded-lg border border-cyan-900/60 bg-cyan-950/50 p-2.5 text-cyan-300">{item.icon}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{item.kind}</span>
                </div>
                <h2 className="mt-5 text-xl font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-400">{item.organization}</p>
                <p className="mt-4 leading-7 text-slate-300">{item.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.points.map((point) => <li key={point} className="rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-400">{point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-slate-800 bg-slate-900/50 p-7 sm:p-10">
          <div className="grid gap-6 sm:grid-cols-3">
            <div><p className="text-3xl font-semibold text-cyan-300">RTL</p><p className="mt-2 text-sm text-slate-400">From architecture through simulation and implementation.</p></div>
            <div><p className="text-3xl font-semibold text-cyan-300">Verify</p><p className="mt-2 text-sm text-slate-400">Assertions, coverage, directed tests, and randomized stimulus.</p></div>
            <div><p className="text-3xl font-semibold text-cyan-300">Measure</p><p className="mt-2 text-sm text-slate-400">Use timing, resource, and test results to guide iteration.</p></div>
          </div>
          <Link href="/projects" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">See related projects <ArrowRight size={16} /></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
