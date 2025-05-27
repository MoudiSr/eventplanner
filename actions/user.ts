'use server'
import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client";

export const createUserIfNotExists = async (username: string, password: string, role: Role) => {
    const existing = await prisma.user.findUnique({ where: { username } });

    if (!existing) {
        return await prisma.user.create({
            data: {
                username,
                password,
                role,
            },
        });
    }

    return { error: "User already exists" };
};

export const loginUser = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
        return { error: "User not found" }
    }

    if (user.password !== password) {
        return { error: "Invalid password" }
    }

    return user;
}
