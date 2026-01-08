import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";

export const auth = betterAuth({
    database: prismaAdapter(prisma),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    plugins: [nextCookies(), username()],
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "CUSTOMER",
            },
            username: {
                type: "string",
                required: true,
                unique: true,
            },
        },
    },
});
