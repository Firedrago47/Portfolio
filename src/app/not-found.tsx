import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030b1a] px-6 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.2),transparent_30%),radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),transparent_26%)]" />
      <div className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative max-w-2xl">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-sky-200">
          <span className="border-b border-sky-400/60 pb-1">route lost</span>
          <span className="border-b border-blue-400/50 pb-1 text-blue-200">galaxy map off</span>
        </div>

        <div className="mb-5 flex items-end gap-3">
          <span className="text-6xl font-black tracking-[-0.08em] text-transparent md:text-8xl bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 bg-clip-text">
            404
          </span>
          <span className="mb-2 text-sm uppercase tracking-[0.32em] text-slate-300">
            lost in space
          </span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
          This route escaped the portfolio.
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
          The page you were hunting for is either missing, moved, or currently taking
          a very dramatic detour through the cosmic void.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:brightness-110"
          >
            back home
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full border border-sky-400/40 bg-sky-400/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-sky-100 transition hover:bg-sky-400/15"
          >
            contact me
          </Link>
        </div>
      </div>
    </main>
  );
}
