"use client";
import gsap from "gsap";
import { createUserIfNotExists } from "@/actions/user";
import { Role } from "@prisma/client";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<Role>("CUSTOMER");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

            intro
                .from(".signup-badge", { y: 14, opacity: 0, duration: 0.6 })
                .from(".signup-title", { y: 24, opacity: 0, duration: 0.85 }, "-=0.25")
                .from(".signup-subtitle", { y: 16, opacity: 0, duration: 0.65 }, "-=0.35");

            gsap.from(".signup-highlight", {
                opacity: 0,
                y: 28,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.12,
                delay: 0.1,
            });

            gsap.from(".signup-form", {
                opacity: 0,
                y: 22,
                duration: 0.75,
                ease: "power3.out",
                delay: 0.2,
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        const response = await createUserIfNotExists(username, password, role);

        if ('error' in response) {
            alert(response.error);
            setIsSubmitting(false);
        } else {
            router.push("/logIn");
        }
    }

    return (
        <div ref={pageRef} className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-[#05060a] via-[#0b1220] to-[#0a1a2f] px-4 py-16 text-white">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-2 top-8 h-72 w-72 rounded-full bg-[#7aa2ff]/20 blur-[110px]" />
                <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-[#86f2d3]/22 blur-[130px]" />
                <div className="absolute inset-6 rounded-[30px] border border-white/5 bg-gradient-to-br from-white/5 via-white/0 to-white/5 opacity-40" />
            </div>

            <div className="w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl shadow-indigo-900/30 backdrop-blur-xl">
                <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.95fr]">
                    <div className="relative overflow-hidden p-10 md:p-12">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(134,242,211,0.18),transparent_38%),radial-gradient(circle_at_75%_80%,rgba(122,162,255,0.18),transparent_42%)]" />
                        <div className="relative flex h-full flex-col gap-8">
                            <div className="space-y-4">
                                <div className="signup-badge inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/70">
                                    <span className="h-2 w-2 rounded-full bg-[#86f2d3]" />
                                    Join EventPlanner
                                </div>
                                <h1 className="signup-title text-4xl font-semibold leading-tight text-white md:text-5xl">
                                    Create your account to craft <span className="text-[#86f2d3]">modern events</span>
                                </h1>
                                <p className="signup-subtitle text-base text-white/70">
                                    Choose whether you want to book experiences or showcase your services. You can always create another profile later.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    { label: "Curated customer journeys", roleCheck: role === "CUSTOMER" },
                                    { label: "Provider insights & payouts", roleCheck: role === "PROVIDER" },
                                    { label: "Live collaboration with guests", roleCheck: role === "CUSTOMER" },
                                    { label: "Priority vendor matching", roleCheck: role === "PROVIDER" },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className={`signup-highlight rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 ${item.roleCheck ? "ring-2 ring-[#86f2d3]/80 shadow-[0_10px_40px_-25px_rgba(134,242,211,0.8)]" : ""}`}
                                    >
                                        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#86f2d3]">✓</div>
                                        <p>{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 bg-black/40 p-8 shadow-inner md:border-l md:border-t-0 md:p-10">
                        <form onSubmit={handleSubmit} className="signup-form space-y-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Create account</p>
                                    <h2 className="mt-2 text-2xl font-semibold text-white">Let's get started</h2>
                                    <p className="text-sm text-white/60">Tell us a bit about you to personalize your workspace.</p>
                                </div>
                                <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#86f2d3]">{role.toLowerCase()}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 rounded-2xl bg-white/5 p-2 text-sm font-medium text-white/80">
                                <button
                                    type="button"
                                    onClick={() => setRole("CUSTOMER")}
                                    className={`rounded-xl px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-[#86f2d3]/30 ${role === "CUSTOMER" ? "bg-white/10 text-white shadow-inner" : "text-white/60"}`}
                                >
                                    Customer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole("PROVIDER")}
                                    className={`rounded-xl px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-[#86f2d3]/30 ${role === "PROVIDER" ? "bg-white/10 text-white shadow-inner" : "text-white/60"}`}
                                >
                                    Service Provider
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-white/80" htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    onChange={e => setUsername(e.target.value)}
                                    type="text"
                                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 shadow-sm transition focus:border-[#86f2d3] focus:outline-none focus:ring-2 focus:ring-[#86f2d3]/30"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-white/80" htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    onChange={e => setPassword(e.target.value)}
                                    type="password"
                                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 shadow-sm transition focus:border-[#86f2d3] focus:outline-none focus:ring-2 focus:ring-[#86f2d3]/30"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-xl bg-gradient-to-r from-[#86f2d3] via-[#9de3ff] to-[#7aa2ff] px-4 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-400/20 transition hover:translate-y-[-1px] hover:shadow-emerald-300/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#86f2d3] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSubmitting ? "Creating account..." : "Create account"}
                            </button>

                            <p className="text-center text-sm text-white/70">
                                Already registered? <Link className="font-semibold text-[#86f2d3] hover:text-[#9cf6e2]" href="/logIn">Log in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
