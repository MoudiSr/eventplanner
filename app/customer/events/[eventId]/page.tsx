// app/events/[eventId]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
    params: {
        eventId: string;
    };
};

export default async function EventDetailPage({ params }: Props) {
    const event = await prisma.event.findUnique({
        where: { id: params.eventId },
        include: {
            customer: true,
            reservations: {
                include: {
                    service: true,
                },
            },
        },
    });

    if (!event) return notFound();

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <p className="text-sm text-gray-500">Date: {event.date.toDateString()}</p>
            <p className="text-sm text-gray-500">Description: {event.description}</p>
            <p className="text-sm text-gray-500">Type: {event.type}</p>
            <p className="text-sm text-gray-500 mb-4">Status: {event.status}</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Services:</h2>
            <div className="space-y-2">
                {event.reservations.map((service) => (
                    <div key={service.id} className="p-4 border rounded shadow">
                        <p><strong>{service.service.type}</strong></p>
                        <p>Service: {service.service.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
