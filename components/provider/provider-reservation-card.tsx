'use client';

import { updateReservationStatus } from "@/actions/reservations";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useTransition } from "react";

export type ProviderReservation = {
    id: string;
    status: string;
    service: {
        id: string;
        title: string;
        type: string;
    };
    event: {
        title: string;
        type: string;
        date: string;
        customer: {
            username: string;
        };
    };
};

const ProviderReservationCard = ({ reservation }: { reservation: ProviderReservation }) => {
    const { data: session } = useSession();
    const [isPending, startTransition] = useTransition();
    const statusLabel = reservation.status.toLowerCase();
    const canApprove = statusLabel === "pending";

    const handleApprove = () => {
        const providerId = session?.user?.id;
        if (!providerId) {
            alert("Please sign in again to approve this reservation.");
            return;
        }

        startTransition(async () => {
            const result = await updateReservationStatus(reservation.id, String(providerId), "APPROVED");
            if ("error" in result) {
                alert(result.error);
            } else {
                alert(result.message);
            }
        });
    };

    return (
        <div className="relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-indigo-900/30 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/60">{reservation.service.type}</p>
                    <h2 className="mt-1 text-xl font-semibold text-white">{reservation.service.title}</h2>
                    <p className="mt-1 text-sm text-white/70">Event: {reservation.event.title}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold capitalize text-white ring-1 ring-white/15">
                    {statusLabel}
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

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/70">
                <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
                    📍
                    <span>Event type: {reservation.event.type}</span>
                </span>
                {canApprove ? (
                    <Button
                        className="rounded-xl bg-emerald-500/20 text-emerald-100 shadow-lg shadow-emerald-900/30 transition hover:-translate-y-0.5 hover:bg-emerald-500/30"
                        disabled={isPending}
                        onClick={handleApprove}
                    >
                        {isPending ? "Approving..." : "Approve"}
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

export default ProviderReservationCard;
