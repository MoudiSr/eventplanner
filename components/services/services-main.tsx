'use client';
import { useMemo } from "react";

import { useCart } from "../context/cart-context";
import { Service } from "../provider/provider-main";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type CategorizedServices = {
    [type: string]: Service[];
};

const ServicesMain = ({ services }: { services: Service[] }) => {
    const { addToCart } = useCart();

    const categorized = useMemo(() => {
        return services.reduce((acc, service) => {
            if (!acc[service.type]) acc[service.type] = [];
            acc[service.type].push(service);
            return acc;
        }, {} as CategorizedServices);
    }, [services]);

    const totalProviders = useMemo(() => {
        const uniqueProviders = new Set(services.map((service) => service.provider.username));
        return uniqueProviders.size;
    }, [services]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#05060a] via-[#0b1220] to-[#0a1a2f] text-white">
            <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-16 pt-20">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(134,242,211,0.16),transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(122,162,255,0.14),transparent_45%)]" />

                <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-indigo-900/30 backdrop-blur-xl md:p-12">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(180,107,255,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(134,242,211,0.18),transparent_40%)]" />
                    <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                        <div className="max-w-2xl space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
                                <span className="h-2 w-2 rounded-full bg-[#86f2d3]" />
                                Services crafted for every milestone
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                                    Curated support for <span className="text-[#86f2d3]">seamless celebrations</span>
                                </h1>
                                <p className="text-lg text-white/70">
                                    Explore vetted partners, transparent pricing, and concierge guidance that mirrors the elevated experience from our home page.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button className="h-11 rounded-full bg-[#86f2d3] px-6 text-black shadow-lg shadow-emerald-400/30 transition hover:shadow-emerald-300/40" asChild>
                                    <a href="#services-grid">Browse services</a>
                                </Button>
                                <Button variant="outline" className="h-11 rounded-full border-white/20 bg-white/5 px-6 text-white hover:border-white/30 hover:bg-white/10">
                                    Talk with a planner
                                </Button>
                            </div>
                        </div>
                        <div className="grid w-full max-w-sm gap-4 md:max-w-xs">
                            {[{
                                label: "Total services",
                                value: services.length,
                                hint: "Curated with transparent pricing",
                            }, {
                                label: "Trusted providers",
                                value: totalProviders,
                                hint: "Dedicated partners in our network",
                            }, {
                                label: "Service categories",
                                value: Object.keys(categorized).length,
                                hint: "From decor to logistics",
                            }].map((stat) => (
                                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-indigo-900/30">
                                    <p className="text-xs uppercase tracking-[0.16em] text-white/60">{stat.label}</p>
                                    <p className="mt-2 text-3xl font-semibold text-white">{stat.value || 0}</p>
                                    <p className="text-sm text-white/60">{stat.hint}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="space-y-6" id="services-grid">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-2">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#86f2d3]">What we offer</p>
                            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Browse signature services</h2>
                            <p className="max-w-2xl text-base text-white/65">
                                Choose the experience that fits your event. Each listing is vetted and ready to add to your plan with a single click.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(categorized).map(([category, items]) => (
                                <div key={category} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                                    {category} · {items.length}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator className="border-white/10" />

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {services.map((service) => (
                            <article
                                key={service.id}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-indigo-900/25 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(134,242,211,0.12),transparent_40%)] opacity-0 transition group-hover:opacity-100" />
                                <div className="relative flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                                            {service.type}
                                        </div>
                                        <p className="text-sm text-white/60">{service.provider.username}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                                        <p className="text-sm text-white/65">Transparent pricing and coordinated delivery for your event timeline.</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-2xl font-semibold text-white">${service.price.toFixed(2)}</p>
                                        <Button
                                            className="rounded-full bg-[#86f2d3] px-4 text-black shadow-md shadow-emerald-400/30 transition group-hover:shadow-emerald-300/40"
                                            onClick={() => addToCart(service)}
                                        >
                                            Add to plan
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ServicesMain;
