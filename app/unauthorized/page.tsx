'use client';
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function UnauthorizedPage() {
    const router = useRouter();
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".unauth-card", { opacity: 0, y: 24, duration: 0.7, ease: "power3.out" });
            gsap.from(".unauth-title", { opacity: 0, y: 16, duration: 0.65, ease: "power2.out", delay: 0.05 });
            gsap.from(".unauth-copy", { opacity: 0, y: 12, duration: 0.6, ease: "power2.out", delay: 0.1 });
            gsap.from(".unauth-cta", { opacity: 0, y: 10, duration: 0.55, ease: "power2.out", delay: 0.15 });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-[#05060a] via-[#0b1220] to-[#0a1a2f] px-4 py-16 text-white">
            <div className="unauth-card max-w-lg rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl shadow-indigo-900/40 backdrop-blur-lg">
                <h1 className="unauth-title text-3xl font-bold">403 - Unauthorized</h1>
                <p className="unauth-copy mt-2 text-white/70">You don’t have access to this page. Return home to keep exploring.</p>
                <Button
                    className="unauth-cta mt-6 rounded-full bg-[#86f2d3] px-6 text-black shadow-lg shadow-emerald-400/30 transition hover:shadow-emerald-300/40"
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    Return to home page
                </Button>
            </div>
        </div>
    );
}
