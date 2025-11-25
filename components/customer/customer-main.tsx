'use client';

import Link from "next/link";
import { useMemo } from "react";

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
    if (value === "completed") return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
    if (value === "cancelled") return "bg-rose-50 text-rose-700 ring-1 ring-rose-100";
    return "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100";
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-10 px-4 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl space-y-10">
                <header className="overflow-hidden rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Customer space</p>
                            <h1 className="text-3xl font-bold text-slate-900">Plan experiences with confidence</h1>
                            <p className="text-sm text-slate-600">
                                Track every celebration, follow progress, and jump back in when you are ready to create the next memorable moment.
                            </p>
                        </div>
                        <Link
                            href="/customer/createEvent"
                            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            + Create event
                        </Link>
                    </div>
                </header>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex flex-col gap-2 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3 text-slate-500">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-lg">📅</span>
                            <p className="text-sm font-medium">Total events</p>
                        </div>
                        <p className="text-3xl font-semibold text-slate-900">{totalEvents}</p>
                        <p className="text-xs text-slate-500">Everything you have planned so far.</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3 text-slate-500">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">⏱️</span>
                            <p className="text-sm font-medium">Upcoming</p>
                        </div>
                        <p className="text-3xl font-semibold text-emerald-600">{upcomingEvents}</p>
                        <p className="text-xs text-slate-500">Future dates still on your calendar.</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center gap-3 text-slate-500">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-lg">✨</span>
                            <p className="text-sm font-medium">Completed</p>
                        </div>
                        <p className="text-3xl font-semibold text-indigo-600">{completedEvents}</p>
                        <p className="text-xs text-slate-500">Wrapped up and marked as done.</p>
                    </div>
                </div>

                {events.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/70 px-8 py-14 text-center shadow-sm">
                        <div className="rounded-full bg-indigo-50 p-3 text-indigo-600">🎉</div>
                        <h2 className="mt-5 text-xl font-semibold text-slate-900">You haven't added any events yet</h2>
                        <p className="mt-3 max-w-2xl text-sm text-slate-600">
                            Start planning your first celebration to see it appear here. Keep track of progress, services, and updates all in one place.
                        </p>
                        <Link
                            href="/customer/createEvent"
                            className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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
                                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-2">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">{event.type}</p>
                                        <h2 className="text-xl font-semibold text-slate-900 transition group-hover:text-indigo-700">{event.title}</h2>
                                        <p className="line-clamp-2 text-sm text-slate-600">{event.description}</p>
                                    </div>
                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeColor(event.status)}`}>
                                        {event.status || "Pending"}
                                    </span>
                                </div>
                                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                    <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-1.5 text-slate-700">
                                        <span className="text-slate-500">📆</span>
                                        <span>{formatDate(event.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-1.5 text-slate-700">
                                        <span className="text-slate-500">🧾</span>
                                        <span className="capitalize">{event.type}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerMain;
