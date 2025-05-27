'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { title } from "process";

export const getAllEventsByCustomer = async (customerId: string) => {
    const events = await prisma.event.findMany({
        where: {
            customerId,
        },
        include: {
            reservations: {
                include: {
                    customer: true,
                },
            },
        },
    });

    // Flatten into Event[]
    const flattenedEvents = events.flatMap(event =>
        event.reservations.map(reservation => ({
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.date.toISOString(),
            type: event.type,
            status: event.status,
            customer: {
                id: reservation.customer.id,
                username: reservation.customer.username,
            },
            reservation: {
                id: reservation.id,
                status: reservation.status,
            },
        }))
    );

    return flattenedEvents;
};


export const createEvent = async (title: string, description: string, date: string, type: string, status: string, customerId: string) => {
    if (!title || !description || !date || !type || !status || !customerId) {
        return { error: "All fields are required." };
    }

    try {
        const event = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date),
                type,
                status,
                customerId,
            },
        });

        revalidatePath('/customer/');
        return { message: "Event created successfully.", event };
    } catch (error) {
        console.error("Error creating event:", error);
        return { error: "Failed to create event. Please try again." };
    }
}