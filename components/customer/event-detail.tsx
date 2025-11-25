'use client';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export type ReservationDisplay = {
    id: string;
    status: string;
    service: {
        title: string;
        type: string;
        price: number;
        provider: { username: string };
    };
};

export type EventDisplay = {
    id: string;
    title: string;
    description: string;
    date: string;
    type: string;
    status: string;
    customer: { username: string };
};

const EventDetail = ({ event, reservations }: { event: EventDisplay; reservations: ReservationDisplay[] }) => {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

            intro
                .from(".event-badge", { y: 12, opacity: 0, duration: 0.55 })
                .from(".event-title", { y: 22, opacity: 0, duration: 0.8 }, "-=0.2")
                .from(".event-subtitle", { y: 14, opacity: 0, duration: 0.65 }, "-=0.3")
                .from(".event-tags", { y: 14, opacity: 0, duration: 0.55 }, "-=0.25");

            gsap.from(".event-stat", {
                y: 24,
                opacity: 0,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.08,
                delay: 0.1,
            });

            gsap.utils.toArray<HTMLElement>(".reservation-card").forEach((card) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 24,
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
        <div ref={pageRef} className="space-y-8 text-white">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/5 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                        <p className="event-badge text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Event details</p>
                        <h1 className="event-title text-3xl font-bold text-white">{event.title}</h1>
                        <p className="event-subtitle text-sm text-white/70">{event.description}</p>
                    </div>
                    <div className="event-tags flex flex-wrap items-center gap-3 text-sm font-semibold">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-indigo-100 ring-1 ring-white/20">{event.type}</span>
                        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-100 ring-1 ring-emerald-400/30">{event.status}</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="event-stat rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-indigo-900/30 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Date</p>
                    <p className="mt-2 text-lg font-semibold text-white">{new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-sm text-white/60">Scheduled event date</p>
                </div>
                <div className="event-stat rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-indigo-900/30 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Customer</p>
                    <p className="mt-2 text-lg font-semibold text-white">{event.customer.username}</p>
                    <p className="text-sm text-white/60">Owner of this event</p>
                </div>
                <div className="event-stat rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-indigo-900/30 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Status</p>
                    <p className="mt-2 text-lg font-semibold text-white capitalize">{event.status.toLowerCase()}</p>
                    <p className="text-sm text-white/60">Current progress</p>
                </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/30 backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Reservations</p>
                        <h2 className="text-lg font-semibold text-white">Services reserved</h2>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">{reservations.length} total</span>
                </div>
                {reservations.length > 0 ? (
                    <ul className="mt-5 grid gap-4">
                        {reservations.map((res) => (
                            <li key={res.id} className="reservation-card flex flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 shadow-inner shadow-black/10 sm:flex-row sm:items-center">
                                <div className="space-y-1">
                                    <p className="text-base font-semibold text-white">{res.service.title}</p>
                                    <p className="text-xs uppercase tracking-[0.15em] text-white/60">{res.service.type}</p>
                                    <p className="text-xs text-white/60">Provider: {res.service.provider.username}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15">${res.service.price.toFixed(2)}</span>
                                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-100 ring-1 ring-emerald-400/30">{res.status}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="mt-5 flex flex-col items-start gap-3 rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-6 text-white/70 shadow-inner shadow-black/10">
                        <p className="text-sm font-semibold text-white">No services reserved for this event yet.</p>
                        <p className="text-sm">Use the services catalog to invite providers and track confirmations here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetail;
