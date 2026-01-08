import { getCurrentProviderCustomerReservations } from "@/actions/reservations";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ProviderReservationCard from "@/components/provider/provider-reservation-card";

const Page = async () => {
    const session = await getServerSession(authOptions);
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
                        <ProviderReservationCard
                            key={reservation.id}
                            reservation={{
                                ...reservation,
                                event: {
                                    ...reservation.event,
                                    date: reservation.event.date.toISOString(),
                                },
                            }}
                        />
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
