'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
    const router = useRouter();
    return (
        <div className="text-center mt-20">
            <h1 className="text-2xl font-bold">403 - Unauthorized</h1>
            <p>You don’t have access to this page.</p>
            <Button onClick={() => {
                router.push("/")
            }}>Return to home page</Button>
        </div>
    );
}
