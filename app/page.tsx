'use client';
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const highlights = [
  {
    title: "Boutique venues",
    description: "Curated spaces with mood boards, capacity insights, and on-site support.",
  },
  {
    title: "Full-service vendors",
    description: "Catering, decor, and entertainment sourced from trusted local partners.",
  },
  {
    title: "Concierge planning",
    description: "Personalized roadmaps, reminders, and budget snapshots in one place.",
  },
];

const flows = [
  {
    label: "Discover",
    detail: "Tell us the vibe, guest count, and date—see options instantly.",
  },
  {
    label: "Design",
    detail: "Style your event with live previews, playlists, and decor pairings.",
  },
  {
    label: "Delight",
    detail: "Track confirmations, arrivals, and schedule cues in real-time.",
  },
];

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .from(".nav-bar", { y: -24, opacity: 0, duration: 0.8 })
        .from(
          ".hero-badge",
          { y: 16, opacity: 0, duration: 0.6 },
          "-=0.2",
        )
        .from(
          ".hero-title",
          { y: 28, opacity: 0, duration: 0.9, skewY: 2 },
          "-=0.1",
        )
        .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(
          ".cta-group",
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 },
          "-=0.35",
        )
        .from(
          ".stat",
          { y: 14, opacity: 0, duration: 0.6, stagger: 0.12 },
          "-=0.3",
        );

      gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".flow-step").forEach((step, index) => {
        gsap.from(step, {
          opacity: 0,
          scale: 0.95,
          filter: "blur(6px)",
          duration: 0.8,
          delay: index * 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-b from-[#05060a] via-[#0b1220] to-[#0a1a2f] text-white"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-20 pt-8 md:pt-12">
        <header className="nav-bar sticky top-4 z-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#86f2d3] via-[#7aa2ff] to-[#b46bff] text-black shadow-lg shadow-indigo-500/30">
                EP
              </span>
              <span className="hidden text-sm uppercase tracking-[0.16em] text-white/70 sm:block">
                Event Planner
              </span>
            </div>
            <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
              <Link href="#services" className="transition hover:text-white">
                Services
              </Link>
              <Link href="#stories" className="transition hover:text-white">
                Stories
              </Link>
              <Link href="#workflow" className="transition hover:text-white">
                Workflow
              </Link>
              <Link href="#contact" className="transition hover:text-white">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="hidden border border-white/15 text-white hover:border-white/30 hover:bg-white/10 sm:inline-flex">
                Sign in
              </Button>
              <Button className="bg-gradient-to-r from-[#7aa2ff] via-[#86f2d3] to-[#b46bff] text-black shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-400/40">
                Book a planner
              </Button>
            </div>
          </div>
        </header>

        <main className="flex flex-col gap-16">
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-indigo-900/30 backdrop-blur-xl md:p-12">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(134,242,211,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(122,162,255,0.15),transparent_40%)]" />
            <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl space-y-6">
                <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
                  <span className="h-2 w-2 rounded-full bg-[#86f2d3]" />
                  Seamless celebrations start here
                </div>
                <h1 className="hero-title text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                  Every Moment Matters—<span className="text-[#86f2d3]">Plan It Beautifully</span>
                </h1>
                <p className="hero-subtitle text-lg text-white/70 sm:text-xl">
                  Discover spaces, vendors, and day-of coordination crafted for unforgettable weddings, farewells, and every milestone worth celebrating.
                </p>
                <div className="cta-group flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="/services">
                    <Button className="h-11 rounded-full bg-[#86f2d3] px-6 text-black shadow-lg shadow-emerald-400/30 transition hover:shadow-emerald-300/40">
                      Explore services
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="h-11 rounded-full border-white/20 bg-white/5 px-6 text-white hover:border-white/30 hover:bg-white/10"
                  >
                    Watch demo
                  </Button>
                </div>
                <div className="hero-stats grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="stat rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-3xl font-semibold text-white">4.9★</p>
                    <p className="text-sm text-white/60">Average guest satisfaction</p>
                  </div>
                  <div className="stat rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-3xl font-semibold text-white">+250</p>
                    <p className="text-sm text-white/60">Events crafted last year</p>
                  </div>
                  <div className="stat rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-3xl font-semibold text-white">72 hrs</p>
                    <p className="text-sm text-white/60">From idea to proposal</p>
                  </div>
                </div>
              </div>
              <div className="relative isolate w-full max-w-sm self-stretch overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-indigo-900/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(180,107,255,0.18),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(134,242,211,0.2),transparent_35%)]" />
                <div className="relative flex flex-col gap-4 text-sm text-white/80">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/50">Event</p>
                      <p className="text-lg font-semibold">Garden Soirée</p>
                    </div>
                    <span className="rounded-full bg-[#7aa2ff] px-3 py-1 text-xs font-semibold text-black">
                      In progress
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Guests", value: "120" },
                      { label: "Budget", value: "$24,500" },
                      { label: "Catering", value: "La Mesa" },
                      { label: "Music", value: "Midnight Trio" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-white/10 bg-white/5 p-3"
                      >
                        <p className="text-xs uppercase tracking-[0.14em] text-white/50">
                          {item.label}
                        </p>
                        <p className="mt-1 text-base font-semibold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/50">Timeline</p>
                    <div className="mt-3 space-y-3">
                      {["Design review", "Vendor confirmations", "Rehearsal walkthrough"].map(
                        (step) => (
                          <div key={step} className="flex items-center gap-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#86f2d3] shadow-[0_0_0_6px_rgba(134,242,211,0.15)]" />
                            <p className="text-sm text-white">{step}</p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#86f2d3]">Curated for you</p>
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">Signature services</h2>
                <p className="mt-2 max-w-2xl text-base text-white/65">
                  We orchestrate every layer—from scouting and styling to day-of logistics—so you can stay present with your guests.
                </p>
              </div>
              <Link href="/services">
                <Button variant="outline" className="hidden border-white/20 text-white hover:border-white/30 hover:bg-white/10 sm:inline-flex">
                  View all
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="feature-card relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-indigo-900/20"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(122,162,255,0.12),transparent_40%)]" />
                  <div className="relative space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7aa2ff] to-[#b46bff] text-lg font-semibold text-black shadow-lg shadow-indigo-500/30">
                      ✦
                    </div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-white/65">{item.description}</p>
                    <button className="mt-2 text-sm font-semibold text-[#86f2d3] underline-offset-4 hover:underline">
                      Learn more
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="workflow" className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-indigo-900/30">
            <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#86f2d3]">How it flows</p>
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">Your event in three moves</h2>
                <p className="mt-2 max-w-2xl text-base text-white/65">
                  Guided planning with live updates keeps you confident from the first idea to the final toast.
                </p>
              </div>
              <Button className="self-start rounded-full bg-gradient-to-r from-[#86f2d3] via-[#7aa2ff] to-[#b46bff] px-6 text-black shadow-lg shadow-indigo-500/30">
                Start planning
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {flows.map((flow, index) => (
                <div
                  key={flow.label}
                  className="flow-step relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(134,242,211,0.12),transparent_40%)]" />
                  <div className="relative space-y-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-semibold text-white/70">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{flow.label}</h3>
                    <p className="text-sm text-white/65">{flow.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#0f192d] via-[#111d36] to-[#0b1324] p-8 shadow-2xl shadow-indigo-900/30">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#86f2d3]">Let&apos;s talk</p>
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">Bring your next event to life</h2>
                <p className="mt-2 max-w-2xl text-base text-white/65">
                  Share your date and vision—we&apos;ll pair you with a planner within 24 hours and craft a tailored experience for your guests.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-full bg-[#86f2d3] px-6 text-black shadow-lg shadow-emerald-400/30">
                  Request a consult
                </Button>
                <Button variant="outline" className="rounded-full border-white/20 text-white hover:border-white/30 hover:bg-white/10">
                  Download brochure
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
