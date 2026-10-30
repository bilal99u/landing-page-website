"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Binary, CircuitBoard, Clock3, Gauge } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

const PCIE_GENERATIONS = [
  { name: "Gen 1", rate: 2.5, efficiency: 0.8 },
  { name: "Gen 2", rate: 5, efficiency: 0.8 },
  { name: "Gen 3", rate: 8, efficiency: 128 / 130 },
  { name: "Gen 4", rate: 16, efficiency: 128 / 130 },
  { name: "Gen 5", rate: 32, efficiency: 128 / 130 },
];

function numberFrom(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function format(value: number, digits = 3) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: digits }).format(value);
}

function ToolCard({ children, icon, title, description }: { children: ReactNode; icon: ReactNode; title: string; description: string }) {
  return (
    <section className="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-xl shadow-black/10">
      <div className="mb-5 flex items-start gap-4">
        <div className="rounded-xl border border-cyan-900/70 bg-cyan-950/60 p-3 text-cyan-300">{icon}</div>
        <div>
          <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function NumberField({ label, value, onChange, min, max, step = "any", suffix }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  step?: string;
  max?: string;
  suffix?: string;
}) {
  return (
    <label className="block text-sm font-medium text-slate-300">
      {label}
      <span className="mt-2 flex items-center rounded-lg border border-slate-700 bg-slate-950/70 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-900/60">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-slate-100 outline-none"
        />
        {suffix && <span className="pr-3 text-xs text-slate-500">{suffix}</span>}
      </span>
    </label>
  );
}

export default function ToolsPage() {
  const [generation, setGeneration] = useState("Gen 3");
  const [lanes, setLanes] = useState("4");
  const [utilization, setUtilization] = useState("85");
  const [period, setPeriod] = useState("10");
  const [pathDelay, setPathDelay] = useState("7.5");
  const [hexValue, setHexValue] = useState("C0FFEE");

  const pcie = PCIE_GENERATIONS.find((item) => item.name === generation) ?? PCIE_GENERATIONS[2];
  const laneCount = numberFrom(lanes);
  const utilizationRatio = numberFrom(utilization) / 100;
  const validLaneCount = Number.isInteger(laneCount) && laneCount >= 1 && laneCount <= 16;
  const validUtilization = numberFrom(utilization) >= 0 && numberFrom(utilization) <= 100;
  const pcieRawGbps = pcie.rate * laneCount * pcie.efficiency;
  const pcieRawGbpsPerLane = pcie.rate * pcie.efficiency;
  const estimatedPayloadGBps = pcieRawGbps * utilizationRatio / 8;

  const periodNs = numberFrom(period);
  const pathDelayNs = numberFrom(pathDelay);
  const targetMHz = periodNs > 0 ? 1000 / periodNs : 0;
  const slackNs = periodNs - pathDelayNs;
  const pathFmaxMHz = pathDelayNs > 0 ? 1000 / pathDelayNs : 0;

  const parsedHex = useMemo(() => {
    const normalized = hexValue.trim().replace(/^0x/i, "");
    if (!normalized || normalized.length > 64 || !/^[\da-f]+$/i.test(normalized)) return null;
    return BigInt(`0x${normalized}`);
  }, [hexValue]);
  const binaryValue = parsedHex === null ? "" : parsedHex.toString(2);
  const groupedBinary = binaryValue.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
  const byteCount = parsedHex === null ? 0 : Math.max(1, Math.ceil(binaryValue.length / 8));

  return (
    <main className="tools-theme min-h-screen px-5 pb-20 text-slate-100">
      <SiteHeader />

      <div className="mx-auto max-w-6xl pt-14 sm:pt-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Workbench / 001</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">FPGA design tools</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
          Quick estimates for link bandwidth, timing budgets, and RTL-level number conversions. These are engineering aids, not a replacement for vendor tools or protocol specifications.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <ToolCard
            icon={<Gauge size={21} />}
            title="PCIe bandwidth estimator"
            description="Estimate encoded link capacity and a configurable payload-rate scenario."
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block text-sm font-medium text-slate-300">
                PCIe generation
                <select value={generation} onChange={(event) => setGeneration(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none focus:border-cyan-500">
                  {PCIE_GENERATIONS.map((item) => <option key={item.name}>{item.name}</option>)}
                </select>
              </label>
              <NumberField label="Lane count" value={lanes} onChange={setLanes} min="1" max="16" step="1" />
              <NumberField label="Payload estimate" value={utilization} onChange={setUtilization} min="0" max="100" suffix="%" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Encoded capacity</p>
                <p className="mt-2 text-2xl font-semibold text-cyan-300">{validLaneCount ? `${format(pcieRawGbps)} Gbit/s` : "—"}</p>
                <p className="mt-1 text-xs text-slate-500">{format(pcieRawGbpsPerLane)} Gbit/s per lane</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Payload scenario</p>
                <p className="mt-2 text-2xl font-semibold text-cyan-300">{validLaneCount && validUtilization ? `${format(estimatedPayloadGBps)} GB/s` : "—"}</p>
                <p className="mt-1 text-xs text-slate-500">At {format(numberFrom(utilization))}% utilization</p>
              </div>
            </div>
            {(!validLaneCount || !validUtilization) && <p role="status" className="mt-3 text-xs text-rose-300">Use 1–16 lanes and a payload estimate from 0% to 100%.</p>}
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Uses {pcie.rate} GT/s per lane and {pcie.name === "Gen 1" || pcie.name === "Gen 2" ? "8b/10b" : "128b/130b"} encoding. Payload is a user-adjustable estimate after encoding; packet, flow-control, and platform overhead are not modeled.
            </p>
          </ToolCard>

          <ToolCard
            icon={<Clock3 size={21} />}
            title="Clock & timing helper"
            description="Convert a target clock period to frequency and check a simple path-delay budget."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField label="Target period" value={period} onChange={setPeriod} min="0" suffix="ns" />
              <NumberField label="Combinational path delay" value={pathDelay} onChange={setPathDelay} min="0" suffix="ns" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Target frequency</p>
                <p className="mt-2 text-2xl font-semibold text-cyan-300">{targetMHz > 0 ? `${format(targetMHz)} MHz` : "—"}</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Idealized slack</p>
                <p className={`mt-2 text-2xl font-semibold ${slackNs >= 0 ? "text-emerald-300" : "text-rose-300"}`}>{periodNs > 0 ? `${slackNs >= 0 ? "+" : ""}${format(slackNs)} ns` : "—"}</p>
                <p className="mt-1 text-xs text-slate-500">Path-only Fmax: {pathFmaxMHz > 0 ? `${format(pathFmaxMHz)} MHz` : "—"}</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">This simplified estimate excludes clock uncertainty, input/output delays, setup time, skew, and routing. Use your static timing analyzer for sign-off.</p>
          </ToolCard>

          <ToolCard
            icon={<Binary size={21} />}
            title="Hex / binary converter"
            description="Inspect a hexadecimal value as an unsigned integer, grouped binary, and byte count."
          >
            <label className="block text-sm font-medium text-slate-300">
              Hexadecimal value
              <span className="mt-2 flex items-center rounded-lg border border-slate-700 bg-slate-950/70 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-900/60">
                <span className="pl-3 font-mono text-slate-500">0x</span>
                <input value={hexValue} maxLength={66} onChange={(event) => setHexValue(event.target.value)} spellCheck={false} className="min-w-0 flex-1 bg-transparent px-2 py-2.5 font-mono text-slate-100 outline-none" aria-label="Hexadecimal value" />
              </span>
            </label>
            {parsedHex === null ? (
              <p role="status" className="mt-4 text-sm text-rose-300">Enter up to 64 hexadecimal digits (0–9, A–F).</p>
            ) : (
              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Unsigned decimal</p>
                  <p className="mt-2 break-all font-mono text-lg text-cyan-300">{parsedHex.toString(10)}</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Binary · {byteCount} byte{byteCount === 1 ? "" : "s"}</p>
                  <p className="mt-2 break-all font-mono text-sm leading-relaxed text-slate-200">{groupedBinary}</p>
                </div>
              </div>
            )}
          </ToolCard>

          <section className="flex flex-col justify-between rounded-2xl border border-cyan-900/60 bg-gradient-to-br from-cyan-950/70 via-slate-900 to-slate-900 p-6">
            <div>
              <div className="mb-5 inline-flex rounded-xl border border-cyan-900/70 bg-slate-950/50 p-3 text-cyan-300"><CircuitBoard size={21} /></div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">Next in the workbench</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-100">Keep the useful bits close.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">Collect vendor references in the Engineering Library, or jot down bring-up observations in the local lab notebook.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/library" className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Open library <ArrowUpRight size={15} /></Link>
              <Link href="/notes" className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-700 hover:text-cyan-200">Open lab notes</Link>
            </div>
          </section>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
