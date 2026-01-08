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
    revalidatePath("/services");
    return { service, message: "Successfully created service" };
}

export const getServiceById = async (serviceId: string) => {
    const service = await prisma.service.findUnique({
        where: {
            id: serviceId,
        },
        include: {
            provider: true,
        },
    });

    return service;
}

export const updateService = async (
    serviceId: string,
    title: string,
    type: string,
    price: number,
    providerId: string,
) => {
    const service = await prisma.service.findUnique({
        where: {
            id: serviceId,
        },
    });

    if (!service) {
        return { error: "Service not found." };
    }

    if (service.providerId !== providerId) {
        return { error: "You are not authorized to update this service." };
    }

    const updatedService = await prisma.service.update({
        where: {
            id: serviceId,
        },
        data: {
            title,
            type,
            price,
        },
    });

    revalidatePath("/provider");
    revalidatePath("/services");
    revalidatePath(`/provider/manageService/${serviceId}`);
    return { service: updatedService, message: "Service updated successfully." };
}

export const deleteService = async (serviceId: string, providerId: string, confirmation: string) => {
    const service = await prisma.service.findUnique({
        where: {
            id: serviceId,
        },
    });

    if (!service) {
        return { error: "Service not found." };
    }

    if (service.providerId !== providerId) {
        return { error: "You are not authorized to delete this service." };
    }

    if (service.title.trim().toLowerCase() !== confirmation.trim().toLowerCase()) {
        return { error: "Deletion confirmation does not match the service title." };
    }

    await prisma.service.delete({
        where: {
            id: serviceId,
        },
    });

    revalidatePath("/provider");
    revalidatePath("/services");
    revalidatePath(`/provider/manageService/${serviceId}`);
    return { message: "Service deleted successfully." };
}
