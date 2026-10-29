"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, Plus, Search, Share2, Trash2 } from "lucide-react";

type LabNote = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

const STORAGE_KEY = "ahmad-fpga-lab-notes";

export default function NotesPage() {
  const [notes, setNotes] = useState<LabNote[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (
          !Array.isArray(parsed)
          || !parsed.every((note) => (
            typeof note === "object"
            && note !== null
            && "id" in note && typeof note.id === "string"
            && "title" in note && typeof note.title === "string"
            && "body" in note && typeof note.body === "string"
            && "createdAt" in note && typeof note.createdAt === "string"
          ))
        ) {
          throw new Error("Saved notes have an unexpected format.");
        }
        setNotes(parsed);
      }
    } catch (error) {
      setStatus(error instanceof Error ? `Could not load notes: ${error.message}` : "Could not load notes.");
    } finally {
      setReady(true);
    }
  }, []);

  const filteredNotes = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return notes;
    return notes.filter((note) => `${note.title} ${note.body}`.toLowerCase().includes(search));
  }, [notes, query]);

  function persistNotes(nextNotes: LabNote[]) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextNotes));
      setNotes(nextNotes);
      setStatus("Notes saved in this browser.");
      return true;
    } catch (error) {
      setStatus(error instanceof Error ? `Could not save notes: ${error.message}` : "Could not save notes.");
      return false;
    }
  }

  function addNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (!trimmedTitle || !trimmedBody) return;

    const nextNotes = [{
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: trimmedTitle,
      body: trimmedBody,
      createdAt: new Date().toISOString(),
    }, ...notes];

    if (persistNotes(nextNotes)) {
      setTitle("");
      setBody("");
    }
  }

  function deleteNote(id: string) {
    persistNotes(notes.filter((note) => note.id !== id));
  }

  async function shareNote(note: LabNote) {
    try {
      const text = `${note.title}\n\n${note.body}`;
      if (navigator.share) {
        await navigator.share({ title: note.title, text });
      } else {
        await navigator.clipboard.writeText(text);
      }
      setStatus(navigator.share ? "Note shared." : "Note copied to clipboard.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setStatus("Sharing cancelled.");
      } else {
        setStatus(error instanceof Error ? `Could not share note: ${error.message}` : "Could not share note.");
      }
    }
  }

  return (
    <main className="notes-theme min-h-screen px-5 pb-20 text-slate-100">
      <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-slate-800 py-4">
        <Link href="/" className="font-semibold tracking-tight text-slate-100">Ahmad Bilal Irfan</Link>
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300">
          <ArrowLeft size={16} /> Portfolio
        </Link>
      </header>

      <div className="mx-auto max-w-6xl pt-14 sm:pt-20">
        <section className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Personal lab notebook</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Capture the next useful detail.</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-400">Save bring-up observations, timing questions, and ideas to revisit. Notes stay in this browser unless you choose to share or copy one.</p>
        </section>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <form onSubmit={addNote} className="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-xl shadow-black/10">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl border border-cyan-900/70 bg-cyan-950/60 p-3 text-cyan-300"><BookOpen size={20} /></div>
              <div>
                <h2 className="font-semibold text-slate-100">New note</h2>
                <p className="text-sm text-slate-500">Saved only on this device.</p>
              </div>
            </div>
            <label className="block text-sm font-medium text-slate-300">
              Title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={100}
                required
                placeholder="e.g. PCIe link bring-up checklist"
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-900/60"
              />
            </label>
            <label className="mt-4 block text-sm font-medium text-slate-300">
              Note
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                maxLength={5000}
                required
                rows={7}
                placeholder="Capture what you tried, what you observed, and what to check next..."
                className="mt-2 w-full resize-y rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2.5 leading-relaxed text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-900/60"
              />
            </label>
            <button type="submit" disabled={!ready} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50">
              <Plus size={16} /> Save note
            </button>
          </form>

          <section aria-label="Saved lab notes">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-100">Your notes <span className="text-sm font-normal text-slate-500">({ready ? notes.length : "…" })</span></h2>
                <p className="mt-1 text-sm text-slate-500">Stored in this browser&apos;s local storage.</p>
              </div>
              <label className="relative block sm:w-56">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes" aria-label="Search notes" className="w-full rounded-lg border border-slate-700 bg-slate-950/70 py-2.5 pl-9 pr-3 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan-500" />
              </label>
            </div>

            <div className="mt-5 space-y-4">
              {filteredNotes.map((note) => (
                <article key={note.id} className="rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-800 to-slate-900 p-5 shadow-lg shadow-black/10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">{new Date(note.createdAt).toLocaleString()}</p>
                      <h3 className="mt-2 break-words text-lg font-semibold text-slate-100">{note.title}</h3>
                    </div>
                    <button type="button" onClick={() => deleteNote(note.id)} aria-label={`Delete ${note.title}`} className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-950/50 hover:text-rose-300">
                      <Trash2 size={17} />
                    </button>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-300">{note.body}</p>
                  <button type="button" onClick={() => void shareNote(note)} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200">
                    <Share2 size={15} /> Share or copy note
                  </button>
                </article>
              ))}

              {filteredNotes.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-12 text-center">
                  <p className="font-medium text-slate-200">{query ? "No notes match that search." : "Your notebook is ready."}</p>
                  <p className="mt-2 text-sm text-slate-500">{query ? "Try another search phrase." : "Write your first observation in the form."}</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/tools" className="inline-flex items-center gap-2 text-slate-400 transition hover:text-cyan-300">FPGA tools <ArrowUpRight size={14} /></Link>
          <Link href="/library" className="inline-flex items-center gap-2 text-slate-400 transition hover:text-cyan-300">Engineering library <ArrowUpRight size={14} /></Link>
        </div>
        <p role="status" aria-live="polite" className="mt-4 min-h-5 text-sm text-slate-400">{status}</p>
      </div>
    </main>
  );
}
