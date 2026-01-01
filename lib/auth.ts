import { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // your Prisma client

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { username: credentials.username },
                });

                if (!user || !user.password) return null;

                const isValid = credentials.password === user.password;
                if (!isValid) return null;

                const { password, ...safeUser } = user;
                return safeUser;
            },
        }),
    ],
    pages: {
        signIn: "/logIn",
    },
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            if (session?.user) {
                if (token?.sub) {
                    session.user.id = token.sub;
                }
                if (token?.role) {
                    session.user.role = token.role;
                }
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
