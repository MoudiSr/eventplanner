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
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-10 px-4 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-4xl space-y-8">
                <div className="overflow-hidden rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">New event</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Design your next celebration</h1>
                    <p className="mt-2 text-sm text-slate-600">Share a few details to get your event on the calendar. You can refine the plan and add services after creating it.</p>
                </div>

                <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700" htmlFor="title">Event title</label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="e.g. Aurora & Kai Wedding"
                                className="w-full"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700" htmlFor="type">Event type</label>
                            <Select onValueChange={setType} value={type}>
                                <SelectTrigger id="type" className="w-full">
                                    <SelectValue placeholder="Choose a type" />
                                </SelectTrigger>
                                <SelectContent>
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
                            <label className="text-sm font-medium text-slate-700" htmlFor="description">Description</label>
                            <Input
                                id="description"
                                type="text"
                                placeholder="Add context, style, or guest details"
                                className="w-full"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700" htmlFor="date">Event date</label>
                            <Input
                                id="date"
                                type="date"
                                className="w-full"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-slate-600">Save the basics now. You can invite providers and track reservations afterward.</p>
                        <Button
                            className="bg-indigo-600 text-white transition hover:-translate-y-0.5 hover:bg-indigo-700"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Create event
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerCreateEvent;
