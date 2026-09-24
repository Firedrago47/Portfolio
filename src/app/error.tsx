"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030b1a] px-6 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),transparent_28%)]" />
      <div className="absolute left-8 top-16 h-28 w-28 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-36 w-36 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative max-w-2xl">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-sky-200">
          <span className="border-b border-sky-400/60 pb-1">system error</span>
          <span className="border-b border-blue-400/50 pb-1 text-blue-200">status: chaos</span>
        </div>

        <div className="mb-5 flex items-end gap-3">
          <span className="text-6xl font-black tracking-[-0.08em] text-transparent md:text-8xl bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 bg-clip-text">
            500
          </span>
          <span className="mb-2 text-sm uppercase tracking-[0.32em] text-slate-300">
            meltdown
          </span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
          The portfolio just tripped over itself.
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
          Something unexpected happened in the matrix. The code is still alive,
          but this page decided to take a dramatic detour.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:brightness-110"
          >
            retry launch
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-sky-400/40 bg-sky-400/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-sky-100 transition hover:bg-sky-400/15"
          >
            back home
          </Link>
        </div>
      </div>
    </main>
  );
}
