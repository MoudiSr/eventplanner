import EventDetail from "@/components/customer/event-detail";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function EventDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const requestHeaders = await headers();
    const session = await auth.api.getSession({
        headers: requestHeaders,
    });
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

    const serializedEvent = {
        ...event,
        date: event.date.toString(),
    };

    const serializedReservations = reservations.map((res) => ({
        ...res,
        service: {
            ...res.service,
            price: Number(res.service.price),
        },
    }));

    return <EventDetail event={serializedEvent} reservations={serializedReservations} />;
}
