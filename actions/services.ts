'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const getAllServices = async () => {
    const services = await prisma.service.findMany({
        include: {
            provider: true,
        },
    });

    return services;
}

export const getAllServicesByProvider = async (providerId: string) => {
    const services = await prisma.service.findMany({
        where: {
            providerId,
        },
        include: {
            provider: true,
        },
    });

    return services;
}

export const createService = async (title: string, type: string, price: number, providerId: string) => {
    const service = await prisma.service.create({
        data: {
            title,
            type,
            price,
            providerId,
        },
    });

    revalidatePath("/provider");
    return { service, message: "Successfully created service" };
}