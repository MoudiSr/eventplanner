import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { href: "/provider/", label: "Services" },
  { href: "/provider/createService", label: "Create Service" },
  { href: "/provider/customerReservations", label: "Reservations" },
];

export default function ProviderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#05060a] via-[#0b1220] to-[#0a1a2f] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_25%,rgba(122,162,255,0.1),transparent_42%),radial-gradient(circle_at_80%_30%,rgba(180,107,255,0.08),transparent_38%),radial-gradient(circle_at_60%_80%,rgba(134,242,211,0.08),transparent_40%)]" />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-12 pt-16">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">Provider workspace</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Showcase and manage with polish</h1>
          <p className="max-w-3xl text-white/70">
            A cohesive layout aligned with our home and services pages—tailored to spotlight your
            offerings, pricing, and customer requests.
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
            <div className="rounded-2xl border border-[#7aa2ff]/30 bg-[#7aa2ff]/10 p-4 text-sm text-white/80">
              <p className="text-xs uppercase tracking-[0.18em] text-[#7aa2ff]">Reminder</p>
              <p className="mt-2">
                Keep your service cards and reservation details as detailed as our services page for a
                consistent, premium feel.
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
