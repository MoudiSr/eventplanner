'use client';

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { deleteService, updateService } from "@/actions/services";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export type ManageService = {
    id: string;
    title: string;
    type: string;
    price: number;
    providerId: string;
};

const ProviderManageService = ({ service }: { service: ManageService }) => {
    const [title, setTitle] = useState(service.title);
    const [type, setType] = useState(service.type);
    const [price, setPrice] = useState(service.price);
    const [deleteConfirmation, setDeleteConfirmation] = useState("");
    const { data: session } = useSession();
    const pageRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

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

    const handleUpdate = async () => {
        if (!title || !type || price <= 0) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const providerId = session?.user?.id;
        if (!providerId) {
            alert("Please sign in again to update this service.");
            return;
        }

        const result = await updateService(service.id, title, type, price, String(providerId));
        if ("error" in result) {
            alert(result.error);
        } else {
            alert(result.message);
        }
    };

    const handleDelete = async () => {
        const providerId = session?.user?.id;
        if (!providerId) {
            alert("Please sign in again to delete this service.");
            return;
        }

        const result = await deleteService(service.id, String(providerId), deleteConfirmation);
        if ("error" in result) {
            alert(result.error);
        } else {
            alert(result.message);
            router.push("/provider");
        }
    };

    return (
        <div ref={pageRef} className="space-y-8 text-white">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/5 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
                <p className="service-badge text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Manage service</p>
                <h1 className="service-title mt-2 text-3xl font-bold text-white">Refine your standout offer</h1>
                <p className="service-subtitle mt-2 text-sm text-white/70">Update pricing, titles, or categories for this service. Changes reflect instantly across your provider hub.</p>
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
                    <p className="text-xs text-white/60">Customers will see this as the base booking price. Update to reflect new offerings.</p>
                </div>

                <div className="service-actions mt-8 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-white/70">Keep your service fresh—adjust details as your offerings evolve.</p>
                    <Button
                        className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-800/40 transition hover:-translate-y-0.5 hover:brightness-110"
                        onClick={() => {
                            handleUpdate();
                        }}
                    >
                        Save updates
                    </Button>
                </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-rose-500/30 bg-rose-500/10 p-6 shadow-2xl shadow-rose-900/30 backdrop-blur">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Delete service</h2>
                        <p className="mt-2 text-sm text-white/70">
                            Type the service title to confirm deletion. This action cannot be undone.
                        </p>
                    </div>
                    <div className="w-full max-w-md space-y-2">
                        <Input
                            id="delete-confirmation"
                            type="text"
                            placeholder={`Type \"${service.title}\" to confirm`}
                            className="w-full bg-white/10 text-white placeholder:text-white/50"
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                        />
                        <Button
                            className="w-full border border-rose-400/60 bg-rose-500/20 text-rose-50 shadow-lg shadow-rose-900/30 transition hover:-translate-y-0.5 hover:bg-rose-500/30"
                            onClick={() => {
                                handleDelete();
                            }}
                        >
                            Delete service
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderManageService;
