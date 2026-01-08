'use client';
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createService } from "@/actions/services";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import { useSession } from "next-auth/react";

const ProviderCreateService = () => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState(0);
    const { data: session } = useSession();
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

            intro
                .from(".service-badge", { y: 12, opacity: 0, duration: 0.55 })
                .from(".service-title", { y: 22, opacity: 0, duration: 0.75 }, "-=0.2")
                .from(".service-subtitle", { y: 14, opacity: 0, duration: 0.65 }, "-=0.3");

            gsap.from(".service-field", {
                opacity: 0,
                y: 24,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.08,
                delay: 0.1,
            });

            gsap.from(".service-actions", {
                opacity: 0,
                y: 18,
                duration: 0.65,
                ease: "power2.out",
                delay: 0.2,
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async () => {
        if (!title || !type || price <= 0) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const service = await createService(title, type, price, String(session?.user.id));
        if ('error' in service) {
            alert(service.error);
        } else {
            alert(service.message);
            setTitle("");
            setType("");
            setPrice(0);
        }
    };

    return (
        <div ref={pageRef} className="space-y-8 text-white">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/5 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
                <p className="service-badge text-xs font-semibold uppercase tracking-[0.2em] text-white/60">New service</p>
                <h1 className="service-title mt-2 text-3xl font-bold text-white">Publish a standout offer</h1>
                <p className="service-subtitle mt-2 text-sm text-white/70">Describe your service, set the category, and price it for customers browsing your storefront.</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/30 backdrop-blur">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="service-field space-y-2">
                        <label className="text-sm font-medium text-white/80" htmlFor="title">Service title</label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="e.g. Signature Wedding Planning"
                            className="w-full bg-white/10 text-white placeholder:text-white/50"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="service-field space-y-2">
                        <label className="text-sm font-medium text-white/80" htmlFor="type">Service type</label>
                        <Select onValueChange={setType} value={type}>
                            <SelectTrigger id="type" className="w-full border-white/20 bg-white/10 text-white">
                                <SelectValue placeholder="Choose a category" />
                            </SelectTrigger>
                            <SelectContent className="border-white/10 bg-slate-900 text-white">
                                <SelectGroup>
                                    <SelectLabel>Event Types</SelectLabel>
                                    <SelectItem value="wedding">Wedding</SelectItem>
                                    <SelectItem value="birthday">Birthday</SelectItem>
                                    <SelectItem value="graduation">Graduation</SelectItem>
                                    <SelectItem value="anniversary">Anniversary</SelectItem>
                                    <SelectItem value="festival">Festival</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="mt-6 space-y-2 service-field">
                    <label className="text-sm font-medium text-white/80" htmlFor="price">Price</label>
                    <Input
                        id="price"
                        type="number"
                        placeholder="Set your rate"
                        className="w-full bg-white/10 text-white placeholder:text-white/50"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                    <p className="text-xs text-white/60">Customers will see this as the base booking price. You can adjust later.</p>
                </div>

                <div className="service-actions mt-8 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-white/70">Keep details concise—strong titles and clear pricing build trust.</p>
                    <Button
                        className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-800/40 transition hover:-translate-y-0.5 hover:brightness-110"
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Create service
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProviderCreateService;
