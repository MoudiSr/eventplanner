import { createAuthClient } from "better-auth/react";
import { InferAuth } from "better-auth/client";
import { usernameClient } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
    $InferAuth: InferAuth<typeof auth>(),
    plugins: [usernameClient()],
});
