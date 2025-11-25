'use client';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";

export type Service = {
    id: string;
    title: string;
    type: string;
    price: number;
    providerId: string;
    createdAt: Date;
    provider: {
        id: string;
        username: string;
    };
};

const ProviderMain = ({ services }: { services: Service[]; }) => {
    const totalServices = services.length;
    const premiumServices = services.filter((service) => service.price > 500).length;
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

            intro
                .from(".provider-badge", { y: 12, opacity: 0, duration: 0.5 })
                .from(".provider-title", { y: 22, opacity: 0, duration: 0.75 }, "-=0.2")
                .from(".provider-subtitle", { y: 14, opacity: 0, duration: 0.6 }, "-=0.3")
                .from(".provider-cta", { y: 14, opacity: 0, duration: 0.55 }, "-=0.25");

            gsap.from(".provider-stat", {
                y: 24,
                opacity: 0,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.08,
                delay: 0.1,
            });

            gsap.utils.toArray<HTMLElement>(".provider-card").forEach((card) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 28,
                    duration: 0.75,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 86%",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="space-y-8 text-white">
            <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/5 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="provider-badge text-sm font-semibold uppercase tracking-widest text-white/60">Provider Hub</p>
                    <h1 className="provider-title text-3xl font-bold text-white">Your Services</h1>
                    <p className="provider-subtitle mt-1 text-sm text-white/70">Showcase your offerings and keep track of what clients can book.</p>
                </div>
                <Link
                    href="/provider/createService"
                    className="provider-cta inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-800/40 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                    + Create Service
                </Link>
            </header>

            <div className="grid gap-4 sm:grid-cols-3">
                <div className="provider-stat rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-indigo-900/30 backdrop-blur">
                    <p className="text-sm font-medium text-white/70">Total Services</p>
                    <p className="mt-2 text-3xl font-bold text-white">{totalServices}</p>
                    <p className="text-xs text-white/60">Active services available to customers.</p>
                </div>
                <div className="provider-stat rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5 shadow-xl shadow-emerald-900/30 backdrop-blur">
                    <p className="text-sm font-medium text-emerald-100/90">Premium Offers</p>
                    <p className="mt-2 text-3xl font-bold text-emerald-100">{premiumServices}</p>
                    <p className="text-xs text-emerald-100/80">Services priced above $500.</p>
                </div>
                <div className="provider-stat rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-5 shadow-xl shadow-indigo-900/30 backdrop-blur">
                    <p className="text-sm font-medium text-indigo-100/90">Average Price</p>
                    <p className="mt-2 text-3xl font-bold text-indigo-100">
                        {totalServices === 0 ? "$0" : `$${(services.reduce((sum, service) => sum + service.price, 0) / totalServices).toFixed(0)}`}
                    </p>
                    <p className="text-xs text-indigo-100/80">Snapshot of your pricing strategy.</p>
                </div>
            </div>

            {services.length === 0 ? (
                <div className="provider-card flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-12 text-center shadow-2xl shadow-indigo-900/30 backdrop-blur">
                    <div className="rounded-full bg-white/10 p-3 text-indigo-100">🛠️</div>
                    <h2 className="mt-4 text-lg font-semibold text-white">No services published</h2>
                    <p className="mt-2 max-w-md text-sm text-white/70">
                        Add your first service to start receiving reservations from customers.
                    </p>
                    <Link
                        href="/provider/createService"
                        className="mt-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-800/40 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    >
                        Publish a service
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                    {services.map((service) => (
                        <Link
                            key={service.id}
                            href={`/provider/manageService/${service.id}`}
                            className="provider-card group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-indigo-900/30 transition hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-2xl hover:shadow-indigo-900/40"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-white/60">{service.type}</p>
                                    <h2 className="mt-1 text-xl font-semibold text-white transition group-hover:text-indigo-100">{service.title}</h2>
                                    <p className="mt-2 line-clamp-2 text-sm text-white/70">Offered by {service.provider.username}</p>
                                </div>
                                <span className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-100 ring-1 ring-emerald-400/30">
                                    ${service.price.toFixed(2)}
                                </span>
                            </div>
                            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
                                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80">
                                    <span className="text-white/60">📅</span>
                                    <span>{new Date(service.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80">
                                    <span className="text-white/60">🧰</span>
                                    <span>{service.type}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProviderMain;
