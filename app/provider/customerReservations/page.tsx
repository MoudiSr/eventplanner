import { getCurrentProviderCustomerReservations } from "@/actions/reservations";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: headers(),
    });
    if (!session?.user?.id) {
        return (
            <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center text-white shadow-2xl shadow-indigo-900/30 backdrop-blur">
                <h1 className="text-2xl font-semibold">Please sign in</h1>
                <p className="mt-2 text-sm text-white/70">Log in as a provider to review reservations from your customers.</p>
            </div>
        );
    }

    const customerReservations = await getCurrentProviderCustomerReservations(session.user.id);
    const totalReservations = customerReservations.length;
    const confirmed = customerReservations.filter((reservation) => reservation.status.toLowerCase() === "approved" || reservation.status.toLowerCase() === "confirmed").length;
    const pending = customerReservations.filter((reservation) => reservation.status.toLowerCase() === "pending").length;

    return (
        <div className="space-y-8 text-white">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/5 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Customer reservations</p>
                <h1 className="mt-2 text-3xl font-bold text-white">Keep tabs on every booking</h1>
                <p className="mt-2 text-sm text-white/70">Review what customers have requested, confirm details, and guide them toward a great experience.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-indigo-900/30 backdrop-blur">
                    <p className="text-sm font-medium text-white/70">Total reservations</p>
                    <p className="mt-2 text-3xl font-bold text-white">{totalReservations}</p>
                    <p className="text-xs text-white/60">Bookings across all services.</p>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5 shadow-xl shadow-emerald-900/30 backdrop-blur">
                    <p className="text-sm font-medium text-emerald-50">Confirmed</p>
                    <p className="mt-2 text-3xl font-bold text-emerald-100">{confirmed}</p>
                    <p className="text-xs text-emerald-100/80">Marked as approved or confirmed.</p>
                </div>
                <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-5 shadow-xl shadow-amber-900/30 backdrop-blur">
                    <p className="text-sm font-medium text-amber-50">Pending review</p>
                    <p className="mt-2 text-3xl font-bold text-amber-100">{pending}</p>
                    <p className="text-xs text-amber-100/80">Awaiting your response.</p>
                </div>
            </div>

            {customerReservations.length > 0 ? (
                <div className="grid gap-4 lg:grid-cols-2">
                    {customerReservations.map((reservation) => (
                        <div key={reservation.id} className="relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-indigo-900/30 backdrop-blur">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-white/60">{reservation.service.type}</p>
                                    <h2 className="mt-1 text-xl font-semibold text-white">{reservation.service.title}</h2>
                                    <p className="mt-1 text-sm text-white/70">Event: {reservation.event.title}</p>
                                </div>
                                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold capitalize text-white ring-1 ring-white/15">
                                    {reservation.status.toLowerCase()}
                                </span>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                                    <p className="text-xs uppercase tracking-wide text-white/60">Customer</p>
                                    <p className="font-semibold">{reservation.event.customer.username}</p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                                    <p className="text-xs uppercase tracking-wide text-white/60">Date</p>
                                    <p className="font-semibold">{new Date(reservation.event.date).toLocaleDateString()}</p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                                    <p className="text-xs uppercase tracking-wide text-white/60">Service ID</p>
                                    <p className="font-semibold">{reservation.service.id}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                                <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
                                    📍
                                    <span>Event type: {reservation.event.type}</span>
                                </span>
                                
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center shadow-2xl shadow-indigo-900/30 backdrop-blur">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-indigo-100">📭</div>
                    <h2 className="mt-4 text-xl font-semibold text-white">No reservations yet</h2>
                    <p className="mt-2 text-sm text-white/70">When customers book your services, their requests will appear here for you to approve.</p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-white/70">
                        <Link
                            href="/provider/createService"
                            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-800/40 transition hover:-translate-y-0.5"
                        >
                            Create a service
                        </Link>
                        <Link
                            href="/provider"
                            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5"
                        >
                            Back to dashboard
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
