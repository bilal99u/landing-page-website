"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Bookmark, Check, Copy, Search, Share2 } from "lucide-react";

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
};

const RESOURCES: Resource[] = [
  {
    id: "serial-lite-iii",
    title: "Serial Lite III IP Core User Guide",
    description: "Intel documentation for configuring Serial Lite III links, including IP features and design considerations.",
    category: "Serial links",
    href: "https://www.intel.com/content/www/us/en/products/details/fpga/intellectual-property/interface-protocols/serial-lite.html",
  },
  {
    id: "intel-pcie",
    title: "Intel FPGA PCI Express IP",
    description: "Product and IP information for building PCI Express interfaces with Intel FPGAs.",
    category: "PCIe",
    href: "https://www.intel.com/content/www/us/en/products/details/fpga/intellectual-property/interface-protocols/pci-express.html",
  },
  {
    id: "pcie-overview",
    title: "PCI-SIG: PCI Express",
    description: "The PCI-SIG overview of the PCI Express standard, ecosystem, and specifications.",
    category: "PCIe",
    href: "https://pcisig.com/",
  },
  {
    id: "amd-pcie",
    title: "AMD UltraScale+ Integrated Block for PCI Express",
    description: "AMD product guide covering PCIe IP integration, configuration, and implementation details.",
    category: "PCIe",
    href: "https://docs.amd.com/r/en-US/pg213-pcie4-ultrascale-plus",
  },
  {
    id: "intel-transceivers",
    title: "Intel L- and H-Tile Transceiver PHY User Guide",
    description: "Reference for transceiver PHY configuration, clocks, resets, and bring-up on Intel FPGA devices.",
    category: "Transceivers",
    href: "https://docs.altera.com/r/docs/683621/current/l-and-h-tile-transceiver-phy-user-guide",
  },
  {
    id: "cdc",
    title: "Clock Domain Crossing Design & Verification Techniques",
    description: "A practical paper on safe clock-domain crossings and verification strategies for digital designs.",
    category: "Verification",
    href: "https://www.sunburst-design.com/papers/CummingsSNUG2008Boston_CDC.pdf",
  },
  {
    id: "timing-constraints",
    title: "Intel FPGA Timing Analyzer",
    description: "Official documentation for timing constraints, timing analysis, and design closure.",
    category: "FPGA design",
    href: "https://www.intel.com/content/www/us/en/docs/programmable/683243/current/introduction-to-the-timing-analyzer.html",
  },
  {
    id: "prbs",
    title: "AMD GT Transceiver Debugging",
    description: "Guidance on using transceiver features such as PRBS generators and checkers during link debugging.",
    category: "Transceivers",
    href: "https://docs.amd.com/r/en-US/ug576-ultrascale-gth-transceivers",
  },
];

const STORAGE_KEY = "ahmad-engineering-library-saved";
const CATEGORIES = ["All", ...new Set(RESOURCES.map((resource) => resource.category))];

export default function LibraryPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (!Array.isArray(parsed) || !parsed.every((id): id is string => typeof id === "string")) {
          throw new Error("Saved resource data has an unexpected format.");
        }
        setSavedIds(parsed.filter((id) => RESOURCES.some((resource) => resource.id === id)));
      }
    } catch (error) {
      setStatus(error instanceof Error ? `Could not load saved resources: ${error.message}` : "Could not load saved resources.");
    } finally {
      setReady(true);
    }
  }, []);

  const visibleResources = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return RESOURCES.filter((resource) => {
      const matchesCategory = activeCategory === "All" || resource.category === activeCategory;
      const matchesSaved = !showSaved || savedIds.includes(resource.id);
      const matchesQuery = !normalizedQuery
        || `${resource.title} ${resource.description} ${resource.category}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSaved && matchesQuery;
    });
  }, [activeCategory, query, savedIds, showSaved]);

  function toggleSaved(id: string) {
    const nextSaved = savedIds.includes(id)
      ? savedIds.filter((savedId) => savedId !== id)
      : [...savedIds, id];

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSaved));
      setSavedIds(nextSaved);
      setStatus(nextSaved.includes(id) ? "Resource saved on this device." : "Resource removed from saved items.");
    } catch (error) {
      setStatus(error instanceof Error ? `Could not update saved resources: ${error.message}` : "Could not update saved resources.");
    }
  }

  async function shareResource(resource: Resource) {
    const url = `${window.location.origin}/library#${resource.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: resource.title, text: resource.description, url });
        setStatus("Resource shared.");
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus("Resource link copied.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setStatus("Sharing cancelled.");
      } else {
        setStatus(error instanceof Error ? `Could not share resource: ${error.message}` : "Could not share resource.");
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="/" className="font-semibold tracking-tight">Ahmad Bilal Irfan</a>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-700">
            <ArrowLeft size={16} /> Back to portfolio
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:pt-20">
        <section className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Engineering library</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">A shelf for things worth keeping.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            FPGA references, high-speed interface documentation, and verification notes I find useful.
            Share a resource with a teammate or save it here for later.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6" aria-label="About saved resources">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-slate-900">Your saved list stays on this device</p>
              <p className="mt-1 text-sm text-slate-600">Saved resources are stored in this browser and are not uploaded or shared with others.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowSaved((current) => !current)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-medium text-blue-800 transition hover:bg-blue-100"
            >
              <Bookmark size={16} /> {showSaved ? "Show all resources" : `Saved resources (${ready ? savedIds.length : "…" })`}
            </button>
          </div>
        </section>

        <section className="mt-10" aria-label="Browse resources">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search resources"
                aria-label="Search resources"
                className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Filter by category">
              {CATEGORIES.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`rounded-full px-3.5 py-2 text-sm transition ${activeCategory === category ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {visibleResources.map((resource) => {
              const isSaved = savedIds.includes(resource.id);
              return (
                <article id={resource.id} key={resource.id} className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">{resource.category}</span>
                    <a href={resource.href} target="_blank" rel="noreferrer" aria-label={`Open ${resource.title}`} className="text-slate-400 transition hover:text-blue-700">
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight">{resource.title}</h2>
                  <p className="mt-2 min-h-12 text-sm leading-relaxed text-slate-600">{resource.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                    <a href={resource.href} target="_blank" rel="noreferrer" className="mr-auto text-sm font-medium text-blue-700 hover:underline">
                      Open reference <ArrowUpRight size={14} className="ml-1 inline" />
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleSaved(resource.id)}
                      disabled={!ready}
                      aria-pressed={isSaved}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                      {isSaved ? <Check size={15} /> : <Bookmark size={15} />}
                      {isSaved ? "Saved" : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => void shareResource(resource)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      {typeof navigator !== "undefined" && "share" in navigator ? <Share2 size={15} /> : <Copy size={15} />}
                      Share
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {visibleResources.length === 0 && (
            <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <p className="font-medium text-slate-800">{showSaved ? "Nothing saved here yet." : "No matching resources."}</p>
              <p className="mt-2 text-sm text-slate-500">{showSaved ? "Save a reference to find it here next time." : "Try another search or category."}</p>
            </div>
          )}
        </section>
        <p role="status" aria-live="polite" className="mt-6 min-h-5 text-sm text-slate-600">{status}</p>
      </div>
    </main>
  );
}
