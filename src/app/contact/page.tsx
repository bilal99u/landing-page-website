import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Contact | Ahmad Bilal Irfan",
  description: "Get in touch with Ahmad Bilal Irfan about hardware design, verification, embedded systems, or collaboration.",
};

const contactOptions = [
  {
    icon: <Mail size={21} />,
    title: "Email",
    description: "For collaboration, technical conversations, or opportunities.",
    label: "abirfan@uwaterloo.ca",
    href: "mailto:abirfan@uwaterloo.ca",
  },
  {
    icon: <Linkedin size={21} />,
    title: "LinkedIn",
    description: "Connect and follow along with my professional work.",
    label: "View LinkedIn profile",
    href: "https://www.linkedin.com/in/ahmad-bilal-irfan-2324b7149/",
  },
  {
    icon: <Github size={21} />,
    title: "GitHub",
    description: "Explore code, experiments, and selected project repositories.",
    label: "Browse repositories",
    href: "https://github.com/bilal99u",
  },
];

export default function ContactPage() {
  return (
    <div className="portfolio-theme min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-900/60 bg-gradient-to-br from-cyan-950/70 via-slate-900 to-slate-950 px-6 py-12 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Get in touch</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Good engineering starts with a good conversation.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Interested in FPGA and ASIC design, verification, embedded systems, or a project I’ve shared? Choose whichever channel works best.</p>
            <a href="mailto:abirfan@uwaterloo.ca" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">Send an email <ArrowRight size={17} /></a>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3" aria-label="Ways to connect">
          {contactOptions.map((option) => (
            <article key={option.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="inline-flex rounded-xl border border-cyan-900/60 bg-cyan-950/50 p-3 text-cyan-300">{option.icon}</div>
              <h2 className="mt-5 text-xl font-semibold">{option.title}</h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{option.description}</p>
              <a href={option.href} target={option.href.startsWith("mailto:") ? undefined : "_blank"} rel={option.href.startsWith("mailto:") ? undefined : "noreferrer"} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">
                {option.label} <ArrowRight size={15} />
              </a>
            </article>
          ))}
        </section>

        <section className="mt-14 border-t border-slate-800 pt-10">
          <p className="text-sm text-slate-500">Not sure where to start?</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/projects" className="text-sm font-medium text-slate-300 transition hover:text-cyan-200">See selected projects</Link>
            <Link href="/experience" className="text-sm font-medium text-slate-300 transition hover:text-cyan-200">Read about my experience</Link>
            <Link href="/library" className="text-sm font-medium text-slate-300 transition hover:text-cyan-200">Explore engineering references</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
