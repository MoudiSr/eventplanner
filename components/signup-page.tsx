'use client';
import { createUserIfNotExists } from "@/actions/user";
import { Role } from "@prisma/client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<Role>("CUSTOMER");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

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
        <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-16">
            <div className="absolute inset-0 -z-10 overflow-hidden opacity-40">
                <div className="absolute right-14 top-12 h-48 w-48 rounded-full bg-blue-200 blur-3xl" />
                <div className="absolute left-10 bottom-6 h-56 w-56 rounded-full bg-purple-200 blur-3xl" />
            </div>

            <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white/90 shadow-2xl backdrop-blur">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="h-full bg-gradient-to-br from-blue-600 to-purple-600 p-10 text-white">
                        <p className="text-sm uppercase tracking-[0.15em] text-blue-100">Join EventPlanner</p>
                        <h1 className="mt-4 text-3xl font-bold leading-tight">Create your account and start planning unforgettable events.</h1>
                        <p className="mt-4 text-sm text-blue-100">Choose whether you want to book services or provide them. You can always create another account later.</p>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className={`rounded-xl border border-white/30 bg-white/10 p-4 backdrop-blur-sm ${role === "CUSTOMER" ? "ring-2 ring-white" : ""}`}>
                                <p className="text-lg font-semibold">Customer</p>
                                <p className="mt-2 text-sm text-blue-100">Find and book curated services tailored to your event.</p>
                            </div>
                            <div className={`rounded-xl border border-white/30 bg-white/10 p-4 backdrop-blur-sm ${role === "PROVIDER" ? "ring-2 ring-white" : ""}`}>
                                <p className="text-lg font-semibold">Service provider</p>
                                <p className="mt-2 text-sm text-blue-100">Showcase your offerings and connect with new clients.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Create account</p>
                                    <h2 className="mt-2 text-2xl font-bold text-gray-900">Let's get started</h2>
                                    <p className="text-sm text-gray-600">Tell us a bit about you to set up your access.</p>
                                </div>
                                <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">{role.toLowerCase()}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-2 text-sm font-medium text-gray-700">
                                <button
                                    type="button"
                                    onClick={() => setRole("CUSTOMER")}
                                    className={`rounded-lg px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-200 ${role === "CUSTOMER" ? "bg-white shadow" : "text-gray-500"}`}
                                >
                                    Customer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole("PROVIDER")}
                                    className={`rounded-lg px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-200 ${role === "PROVIDER" ? "bg-white shadow" : "text-gray-500"}`}
                                >
                                    Service Provider
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    onChange={e => setUsername(e.target.value)}
                                    type="text"
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    onChange={e => setPassword(e.target.value)}
                                    type="password"
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSubmitting ? "Creating account..." : "Create account"}
                            </button>

                            <p className="text-center text-sm text-gray-600">
                                Already registered? <a className="font-semibold text-blue-600 hover:text-blue-700" href="/logIn">Log in</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;
