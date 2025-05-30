// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username?: string | null;
            role?: string | null;
        };
    }

    interface User {
        role: string; 
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: string;
    }
}
