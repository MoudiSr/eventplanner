import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function EventDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const session = await getServerSession(authOptions);
    if (!session) return redirect("/unauthorized");

    const event = await prisma.event.findUnique({
        where: { id: id },
        include: { customer: true },
    });

    if (!event || event.customer.id !== session.user.id) {
        return redirect("/unauthorized");
    }

    const reservations = await prisma.reservation.findMany({
        where: { eventId: id },
        include: { service: { include: { provider: true } } },
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-10 px-4 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-5xl space-y-8">
                <div className="overflow-hidden rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Event details</p>
                            <h1 className="text-3xl font-bold text-slate-900">{event.title}</h1>
                            <p className="text-sm text-slate-600">{event.description}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700 ring-1 ring-indigo-100">{event.type}</span>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-100">{event.status}</span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Date</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{new Date(event.date).toLocaleDateString()}</p>
                        <p className="text-sm text-slate-600">Scheduled event date</p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Customer</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{event.customer.username}</p>
                        <p className="text-sm text-slate-600">Owner of this event</p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Status</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900 capitalize">{event.status.toLowerCase()}</p>
                        <p className="text-sm text-slate-600">Current progress</p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Reservations</p>
                            <h2 className="text-lg font-semibold text-slate-900">Services reserved</h2>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {reservations.length} total
                        </span>
                    </div>
                    {reservations.length > 0 ? (
                        <ul className="mt-5 grid gap-4">
                            {reservations.map((res) => (
                                <li key={res.id} className="flex flex-col justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700 sm:flex-row sm:items-center">
                                    <div className="space-y-1">
                                        <p className="text-base font-semibold text-slate-900">{res.service.title}</p>
                                        <p className="text-xs uppercase tracking-[0.15em] text-indigo-600">{res.service.type}</p>
                                        <p className="text-xs text-slate-500">Provider: {res.service.provider.username}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">${res.service.price.toFixed(2)}</span>
                                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">{res.status}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="mt-5 flex flex-col items-start gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-slate-600">
                            <p className="text-sm font-semibold text-slate-800">No services reserved for this event yet.</p>
                            <p className="text-sm">Use the services catalog to invite providers and track confirmations here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
