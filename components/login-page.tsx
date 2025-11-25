'use client';
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getSession, signIn } from "next-auth/react";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        const response = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (response?.error) {
            alert("Incorrect username/password combination !!");
            setIsSubmitting(false);
            return;
        }

        const session = await getSession();
        const role = session?.user?.role;

        if (role === "PROVIDER") {
            router.push("/provider");
        } else {
            router.push("/services");
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-16">
            <div className="absolute inset-0 -z-10 overflow-hidden opacity-40">
                <div className="absolute left-1/2 top-10 h-48 w-48 -translate-x-1/2 rounded-full bg-blue-300 blur-3xl" />
                <div className="absolute right-8 bottom-8 h-40 w-40 rounded-full bg-purple-300 blur-3xl" />
            </div>

            <div className="w-full max-w-xl rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur">
                <div className="mb-8 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Welcome back</p>
                    <h1 className="mt-3 text-3xl font-bold text-gray-900">Log in to EventPlanner</h1>
                    <p className="mt-2 text-sm text-gray-600">Access your dashboard and continue planning amazing experiences.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSubmitting ? "Signing in..." : "Log In"}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account? <a className="font-semibold text-blue-600 hover:text-blue-700" href="/signUp">Create one</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
