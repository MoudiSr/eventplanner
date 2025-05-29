import { getCurrentProviderCustomerReservations } from "@/actions/reservations";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const Page = async () => {
    const session = await getServerSession(authOptions);
    const customerReservations = await getCurrentProviderCustomerReservations(session.user.id);
    return (
        <>
            <div>
                <h1 className="text-2xl font-bold mb-4">Customer Reservations</h1>
                {customerReservations.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {customerReservations.map((reservation) => (
                            <li key={reservation.id} className="mb-2">
                                <strong>Service:</strong> {reservation.service.title} -
                                <strong> Event:</strong> {reservation.event.title} -
                                <strong> Customer:</strong> {reservation.event.customer.username} -
                                <strong> Date:</strong> {new Date(reservation.event.date).toLocaleDateString()} -
                                <strong>Status:</strong> {reservation.status}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-red-500 underline">No reservations found.</p>
                )}
            </div>
        </>
    );
}

export default Page;