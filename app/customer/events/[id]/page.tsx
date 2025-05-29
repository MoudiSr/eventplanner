import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
    params: { id: string }
};

export default async function EventDetailPage({ params }: Props) {
    const event = await prisma.event.findUnique({
        where: { id: params.id },
        include: {
            customer: true,
        }
    });

    const eventReservations = await prisma.reservation.findMany({
        where: { eventId: params.id },
        include: {
            service: true,
        }
    });

    if (!event) return redirect("/unauthorized");
    const session = await getServerSession(authOptions);


    if (event.customer.id !== session?.user.id) {
        return redirect("/unauthorized");
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p className="text-gray-700">{event.description}</p>
            <p>Date: {event.date.toDateString()}</p>
            <p>Status: {event.status}</p>
            <p>Type: {event.type}</p>
            <p>Customer: {event.customer.username}</p>
            <div className="mt-4">
                <span>Services reserved</span>
                { eventReservations.length > 0 ? (
                    <ul className="list-disc pl-5 mt-2">
                        {eventReservations.map((reservation) => (
                            <li key={reservation.id} className="mb-2">
                                <strong>{reservation.service.title}</strong> - {reservation.service.type} - ${reservation.service.price.toFixed(2)} - {reservation.status}
                            </li>
                        ))} 
                    </ul>
                ) : (
                    <p className="text-red-500 underline">No services reserved for this event.</p>
                )}

            </div>
        </div>
    );
}
