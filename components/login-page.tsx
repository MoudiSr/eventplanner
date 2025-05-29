'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSession, signIn } from "next-auth/react";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();


    const handleSubmit = async () => {
        const response = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (response?.error) {
            alert("Incorrect username/password combination !!");
        } else {
            // Wait briefly for the session to update
            const session = await getSession();

            const role = session?.user?.role;

            if (role === "PROVIDER") {
                router.push("/provider");
            } else {
                router.push("/services");
            }
        }
    };

    return (
        <div className="flex justify-center min-h-screen p-12 bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="flex flex-col p-4 md:px-12">
                    <h1 className="text-xl">Login to your account</h1>
                    <form className="flex flex-col gap-4">
                        <label className="text-sm font-medium">Username</label>
                        <input onChange={e => setUsername(e.target.value)} type="text" className="p-2 border rounded" placeholder="Enter your username" required />

                        <label className="text-sm font-medium">Password</label>
                        <input onChange={e => setPassword(e.target.value)} type="password" className="p-2 border rounded" placeholder="Enter your password" required />

                        <button onClick={(e) => {
                            e.preventDefault();
                            handleSubmit()
                        }} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;