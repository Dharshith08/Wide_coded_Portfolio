"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-base px-6 text-text">
      <div className="soft-card max-w-lg rounded-2xl p-8">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-rose-300">Runtime Error</p>
        <h1 className="mt-3 font-display text-2xl">Something went wrong.</h1>
        <p className="mt-3 text-sm text-muted">{error.message || "Unexpected application error."}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-slate-950"
        >
          Retry
        </button>
      </div>
    </main>
  );
}
