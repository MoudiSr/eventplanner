'use server'
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export const createUserIfNotExists = async (
    username: string,
    email: string,
    password: string,
    role: Role
) => {
    const normalizedEmail = email.toLowerCase();
    const existing = await prisma.user.findFirst({
        where: {
            OR: [{ username }, { email: normalizedEmail }],
        },
    });

    if (!existing) {
        try {
            return await auth.api.signUpEmail({
                body: {
                    email: normalizedEmail,
                    name: username,
                    password,
                    username,
                    role,
                },
            });
        } catch (error) {
            return { error: "Unable to create user" };
        }
    }

    return { error: "User already exists" };
};
