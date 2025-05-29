'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const getAllEventsByCustomer = async (customerId: string) => {
    const events = await prisma.event.findMany({
        where: {
            customerId,
        },
        include: {
            customer: true
        }
    });

    return events;
};


export const createEvent = async (title: string, description: string, date: string, type: string, status: string, customerId: string) => {
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