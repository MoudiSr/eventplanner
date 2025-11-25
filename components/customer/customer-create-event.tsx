'use client';
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import { createEvent } from "@/actions/events";
import { useSession } from "next-auth/react";

const CustomerCreateEvent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");

    const { data: session } = useSession();

    const handleSubmit = async () => {
        if (session?.user.role !== "CUSTOMER") {
            alert("You must be logged in as a customer to create an event.");
            return;
        }

        if (!title || !type || !description || !date) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const event = await createEvent(title, description, date, type, "PENDING", String(session?.user.id));
        if ('error' in event) {
            alert(event.error);
        } else {
            alert(event.message);
            setTitle("");
            setType("");
            setDescription("");
            setDate("");
        }
    };

    return (
        <div className="space-y-8 text-white">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/5 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">New event</p>
                <h1 className="mt-2 text-3xl font-bold text-white">Design your next celebration</h1>
                <p className="mt-2 text-sm text-white/70">Share a few details to get your event on the calendar. You can refine the plan and add services after creating it.</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/30 backdrop-blur">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80" htmlFor="title">Event title</label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="e.g. Aurora & Kai Wedding"
                            className="w-full bg-white/10 text-white placeholder:text-white/50"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80" htmlFor="type">Event type</label>
                        <Select onValueChange={setType} value={type}>
                            <SelectTrigger id="type" className="w-full border-white/20 bg-white/10 text-white">
                                <SelectValue placeholder="Choose a type" />
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

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80" htmlFor="description">Description</label>
                        <Input
                            id="description"
                            type="text"
                            placeholder="Add context, style, or guest details"
                            className="w-full bg-white/10 text-white placeholder:text-white/50"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80" htmlFor="date">Event date</label>
                        <Input
                            id="date"
                            type="date"
                            className="w-full bg-white/10 text-white [color-scheme:dark]"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-white/70">Save the basics now. You can invite providers and track reservations afterward.</p>
                    <Button
                        className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-800/40 transition hover:-translate-y-0.5 hover:brightness-110"
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Create event
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CustomerCreateEvent;
