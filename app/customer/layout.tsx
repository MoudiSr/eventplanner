import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { href: "/customer/", label: "Events" },
  { href: "/customer/createEvent", label: "Create Event" },
];

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#05060a] via-[#0b1220] to-[#0a1a2f] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(180,107,255,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(134,242,211,0.06),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(122,162,255,0.08),transparent_40%)]" />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-12 pt-16">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">Customer workspace</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Plan, track, and celebrate beautifully</h1>
          <p className="max-w-3xl text-white/70">
            Navigate your events with the same polished experience as our services hub. Quick access
            to your events and creation tools keeps everything flowing.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
          <aside className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/30 backdrop-blur-xl">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/60">Navigate</p>
              <div className="mt-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between rounded-xl border border-transparent px-4 py-3 text-sm font-medium transition hover:border-white/20 hover:bg-white/10"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden className="text-white/50">→</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[#86f2d3]/30 bg-[#86f2d3]/10 p-4 text-sm text-white/80">
              <p className="text-xs uppercase tracking-[0.18em] text-[#86f2d3]">Tip</p>
              <p className="mt-2">
                Keep your timelines updated to mirror the curated feel of our services page. Guests and
                vendors appreciate the clarity.
              </p>
            </div>
          </aside>

          <main className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/30 backdrop-blur-xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
