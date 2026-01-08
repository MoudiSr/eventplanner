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

        revalidatePath('/customer/');
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

export const updateReservationStatus = async (
    reservationId: string,
    providerId: string,
    status: string,
) => {
    const reservation = await prisma.reservation.findUnique({
        where: {
            id: reservationId,
        },
        include: {
            service: true,
        },
    });

    if (!reservation) {
        return { error: "Reservation not found." };
    }

    if (reservation.service.providerId !== providerId) {
        return { error: "You are not authorized to update this reservation." };
    }

    const updatedReservation = await prisma.reservation.update({
        where: {
            id: reservationId,
        },
        data: {
            status,
        },
    });

    revalidatePath("/provider/customerReservations");
    return { reservation: updatedReservation, message: "Reservation updated successfully." };
}
