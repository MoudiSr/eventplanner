"use client";
import gsap from "gsap";
import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

            intro
                .from(".login-badge", { y: 14, opacity: 0, duration: 0.6 })
                .from(".login-title", { y: 24, opacity: 0, duration: 0.8 }, "-=0.25")
                .from(".login-subtitle", { y: 16, opacity: 0, duration: 0.6 }, "-=0.35");

            gsap.from(".login-feature", {
                opacity: 0,
                y: 30,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.1,
                delay: 0.1,
            });

            gsap.from(".login-form", {
                opacity: 0,
                y: 24,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.15,
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        const response = await authClient.signIn.username({
            username,
            password,
        });

        if (response?.error) {
            alert("Incorrect username/password combination !!");
            setIsSubmitting(false);
            return;
        }

        const role = response?.data?.user?.role;

        if (role === "PROVIDER") {
            router.push("/provider");
        } else {
            router.push("/services");
        }
    };

    return (
        <div ref={pageRef} className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-[#05060a] via-[#0b1220] to-[#0a1a2f] px-4 py-16 text-white">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#7aa2ff]/20 blur-[100px]" />
                <div className="absolute right-0 bottom-10 h-64 w-64 rounded-full bg-[#86f2d3]/25 blur-[120px]" />
                <div className="absolute inset-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 via-white/0 to-white/5 opacity-40" />
            </div>

            <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-indigo-900/30 backdrop-blur-xl">
                <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr]">
                    <div className="relative overflow-hidden p-10 md:p-12">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(134,242,211,0.16),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(122,162,255,0.18),transparent_45%)]" />
                        <div className="relative flex h-full flex-col justify-between gap-8">
                            <div className="space-y-4">
                                <div className="login-badge inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/70">
                                    <span className="h-2 w-2 rounded-full bg-[#86f2d3]" />
                                    Welcome back
                                </div>
                                <h1 className="login-title text-4xl font-semibold leading-tight text-white md:text-5xl">
                                    Log in to keep your <span className="text-[#86f2d3]">celebrations</span> moving
                                </h1>
                                <p className="login-subtitle text-base text-white/70">
                                    Access proposals, track milestones, and coordinate with providers inside your EventPlanner hub.
                                </p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {["Secure access with magic links", "Real-time provider updates", "Save favorite venues", "Collaborate with guests"].map((item) => (
                                    <div key={item} className="login-feature rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                                        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[#86f2d3]">✓</div>
                                        <p>{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 bg-black/40 p-8 shadow-inner md:border-l md:border-t-0 md:p-10">
                        <div className="mb-6 space-y-2 text-center">
                            <p className="text-xs uppercase tracking-[0.18em] text-white/60">Sign in</p>
                            <h2 className="text-2xl font-semibold text-white">Enter your account details</h2>
                            <p className="text-sm text-white/60">We’ll personalize your dashboard based on your role.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form space-y-5">
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
                                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#86f2d3] via-[#9de3ff] to-[#7aa2ff] px-4 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-400/20 transition hover:translate-y-[-1px] hover:shadow-emerald-300/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#86f2d3] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSubmitting ? "Signing in..." : "Log in"}
                            </button>

                            <p className="text-center text-sm text-white/70">
                                Don't have an account? <Link className="font-semibold text-[#86f2d3] hover:text-[#9cf6e2]" href="/signUp">Create one</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
