'use server'
import { Event } from "@/components/customer/customer-main";
import { Service } from "@/components/provider/provider-main";
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const createReservation = async (service: Service, event: Event, status: string) => {
    try {
        const reservation = await prisma.reservation.create({
            data: {
                serviceId: service.id,
                eventId: event.id,
                status
            },
        });

        revalidatePath('/customer');
        return { message: "Reservation created successfully.", reservation };
    } catch (error) {
        console.error("Error creating reservation:", error);
        return { error: "Failed to create reservation. Please try again." };
    }
}

export const getCurrentProviderCustomerReservations = async (providerId: string) => {
    const reservations = await prisma.reservation.findMany({
        where: {
            service: {
                providerId,
            },
        },
        include: {
            service: true,
            event: {
                include: {
                    customer: true,
                },
            },
        },
    });

    return reservations;
}
