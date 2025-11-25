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

const CustomerMain = ({ events }: { events: Event[]; }) => {
    const totalEvents = events.length;
    const upcomingEvents = useMemo(() => events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= new Date();
    }).length, [events]);

    const completedEvents = useMemo(() => events.filter((event) => event.status?.toLowerCase() === "completed").length, [events]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-10 px-4 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl space-y-8">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Dashboard</p>
                        <h1 className="text-3xl font-bold text-slate-900">Your Events</h1>
                        <p className="mt-1 text-sm text-slate-600">View the experiences you have planned and create new ones.</p>
                    </div>
                    <Link
                        href="/customer/createEvent"
                        className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        + Create Event
                    </Link>
                </header>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <p className="text-sm font-medium text-slate-500">Total Events</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">{totalEvents}</p>
                        <p className="text-xs text-slate-500">All events you have created.</p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <p className="text-sm font-medium text-slate-500">Upcoming</p>
                        <p className="mt-2 text-3xl font-bold text-emerald-600">{upcomingEvents}</p>
                        <p className="text-xs text-slate-500">Events scheduled for the future.</p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <p className="text-sm font-medium text-slate-500">Completed</p>
                        <p className="mt-2 text-3xl font-bold text-indigo-600">{completedEvents}</p>
                        <p className="text-xs text-slate-500">Events marked as completed.</p>
                    </div>
                </div>

                {events.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
                        <div className="rounded-full bg-indigo-50 p-3 text-indigo-600">🎉</div>
                        <h2 className="mt-4 text-lg font-semibold text-slate-900">No events yet</h2>
                        <p className="mt-2 max-w-md text-sm text-slate-600">
                            Start planning your first event to see it appear here. You can track statuses and details once it is created.
                        </p>
                        <Link
                            href="/customer/createEvent"
                            className="mt-4 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Create your first event
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4 lg:grid-cols-2">
                        {events.map((event) => {
                            const eventDate = new Date(event.date);
                            return (
                                <Link
                                    key={event.id}
                                    href={`/customer/events/${event.id}`}
                                    className="group relative flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">{event.type}</p>
                                            <h2 className="mt-1 text-xl font-semibold text-slate-900 group-hover:text-indigo-700">{event.title}</h2>
                                            <p className="mt-2 line-clamp-2 text-sm text-slate-600">{event.description}</p>
                                        </div>
                                        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                            {event.status || "Pending"}
                                        </span>
                                    </div>
                                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-500">📅</span>
                                            <span>{eventDate.toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-500">🧾</span>
                                            <span>{event.type}</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerMain;
