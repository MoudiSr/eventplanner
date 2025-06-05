import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function EventDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
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
        <div className="p-6">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p className="text-gray-700">{event.description}</p>
            <p>Date: {new Date(event.date).toDateString()}</p>
            <p>Status: {event.status}</p>
            <p>Type: {event.type}</p>
            <p>Customer: {event.customer.username}</p>

            <div className="mt-6">
                <h2 className="text-lg font-semibold">Services Reserved</h2>
                {reservations.length > 0 ? (
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        {reservations.map((res) => (
                            <li key={res.id}>
                                <strong>{res.service.title}</strong> ({res.service.type}) — $
                                {res.service.price.toFixed(2)} — Status: {res.status}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-red-500 mt-2 underline">
                        No services reserved for this event.
                    </p>
                )}
            </div>
        </div>
    );
}
