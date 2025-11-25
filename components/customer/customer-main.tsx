'use client';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

export type Event = {
    id: string;
    title: string;
    description: string;
    date: Date | string;
    type: string;
    status: string;
    customerId: string;
    customer?: {
        id: string;
        username: string;
    };
};

const badgeColor = (status?: string) => {
    const value = status?.toLowerCase();
    if (value === "completed") return "bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-400/30";
    if (value === "cancelled") return "bg-rose-500/15 text-rose-100 ring-1 ring-rose-400/30";
    return "bg-indigo-500/15 text-indigo-100 ring-1 ring-indigo-400/30";
};

const formatDate = (date: Date | string) => {
    try {
        return new Date(date).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    } catch (error) {
        return "";
    }
};

const CustomerMain = ({ events }: { events: Event[]; }) => {
    const totalEvents = events.length;
    const upcomingEvents = useMemo(() => events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= new Date();
    }).length, [events]);

    const completedEvents = useMemo(() => events.filter((event) => event.status?.toLowerCase() === "completed").length, [events]
    );

    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

            intro
                .from(".customer-badge", { y: 12, opacity: 0, duration: 0.55 })
                .from(".customer-title", { y: 22, opacity: 0, duration: 0.8 }, "-=0.2")
                .from(".customer-subtitle", { y: 14, opacity: 0, duration: 0.65 }, "-=0.3")
                .from(".customer-cta", { y: 14, opacity: 0, duration: 0.6 }, "-=0.25");

            gsap.from(".customer-stat", {
                y: 22,
                opacity: 0,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.08,
                delay: 0.1,
            });

            gsap.utils.toArray<HTMLElement>(".customer-card").forEach((card) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 30,
                    duration: 0.75,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="space-y-10 text-white">
            <header className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/5 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <p className="customer-badge text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Customer space</p>
                        <h1 className="customer-title text-3xl font-bold text-white">Plan experiences with confidence</h1>
                        <p className="customer-subtitle text-sm text-white/70">
                            Track every celebration, follow progress, and jump back in when you are ready to create the next memorable moment.
                        </p>
                    </div>
                    <Link
                        href="/customer/createEvent"
                        className="customer-cta inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-700/40 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    >
                        + Create event
                    </Link>
                </div>
            </header>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="customer-stat flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-indigo-900/30 backdrop-blur">
                    <div className="flex items-center gap-3 text-white/70">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg">📅</span>
                        <p className="text-sm font-medium">Total events</p>
                    </div>
                    <p className="text-3xl font-semibold text-white">{totalEvents}</p>
                    <p className="text-xs text-white/60">Everything you have planned so far.</p>
                </div>
                <div className="customer-stat flex flex-col gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5 shadow-xl shadow-emerald-900/30 backdrop-blur">
                    <div className="flex items-center gap-3 text-white/80">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-lg">⏱️</span>
                        <p className="text-sm font-medium">Upcoming</p>
                    </div>
                    <p className="text-3xl font-semibold text-emerald-100">{upcomingEvents}</p>
                    <p className="text-xs text-emerald-100/80">Future dates still on your calendar.</p>
                </div>
                <div className="customer-stat flex flex-col gap-2 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-5 shadow-xl shadow-indigo-900/30 backdrop-blur">
                    <div className="flex items-center gap-3 text-white/80">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-lg">✨</span>
                        <p className="text-sm font-medium">Completed</p>
                    </div>
                    <p className="text-3xl font-semibold text-indigo-100">{completedEvents}</p>
                    <p className="text-xs text-indigo-100/80">Wrapped up and marked as done.</p>
                </div>
            </div>

            {events.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/5 px-8 py-14 text-center shadow-2xl shadow-indigo-900/30 backdrop-blur">
                    <div className="rounded-full bg-white/10 p-3 text-indigo-100">🎉</div>
                    <h2 className="mt-5 text-xl font-semibold text-white">You haven't added any events yet</h2>
                    <p className="mt-3 max-w-2xl text-sm text-white/70">
                        Start planning your first celebration to see it appear here. Keep track of progress, services, and updates all in one place.
                    </p>
                    <Link
                        href="/customer/createEvent"
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-800/40 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    >
                        Create your first event
                    </Link>
                </div>
            ) : (
                <div className="grid gap-5 lg:grid-cols-2">
                    {events.map((event) => (
                        <Link
                            key={event.id}
                            href={`/customer/events/${event.id}`}
                            className="customer-card group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-indigo-900/30 ring-1 ring-white/5 transition hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-2xl hover:shadow-indigo-900/40"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-2">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">{event.type}</p>
                                    <h2 className="text-xl font-semibold text-white transition group-hover:text-indigo-100">{event.title}</h2>
                                    <p className="line-clamp-2 text-sm text-white/70">{event.description}</p>
                                </div>
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeColor(event.status)}`}>
                                    {event.status || "Pending"}
                                </span>
                            </div>
                            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/70">
                                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80">
                                    <span className="text-white/60">📆</span>
                                    <span>{formatDate(event.date)}</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80">
                                    <span className="text-white/60">🧾</span>
                                    <span className="capitalize">{event.type}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomerMain;
