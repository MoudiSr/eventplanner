'use client';
import { createUserIfNotExists } from "@/actions/user";
import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (role: Role) => {
        const response = await createUserIfNotExists(username, password, role);

        if ('error' in response) {
            alert(response.error);
        } else {
            router.push("/logIn");
        }
    }

    return (
        <div className="flex justify-center min-h-screen p-12 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 bg-white p-8 rounded-lg shadow-lg">
                <div className="flex flex-col p-4 md:px-12">
                    <h1 className="text-xl">Customer Account</h1>
                    <form className="flex flex-col gap-4">
                        <label className="text-sm font-medium">Username</label>
                        <input onChange={e => setUsername(e.target.value)} type="text" className="p-2 border rounded" placeholder="Enter your username" required />

                        <label className="text-sm font-medium">Password</label>
                        <input onChange={e => setPassword(e.target.value)} type="password" className="p-2 border rounded" placeholder="Enter your password" required />

                        <button onClick={(e) => {
                            e.preventDefault();
                            handleSubmit("CUSTOMER")
                        }} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Sign Up</button>
                    </form>
                </div>
                <div className="md:border-l-2 flex flex-col p-4 md:px-12">
                    <h1 className="text-xl">Service Provider Account</h1>
                    <form className="flex flex-col gap-4">
                        <label className="text-sm font-medium">Username</label>
                        <input onChange={e => setUsername(e.target.value)} type="text" className="p-2 border rounded" placeholder="Enter your username" required />

                        <label className="text-sm font-medium">Password</label>
                        <input onChange={e => setPassword(e.target.value)} type="password" className="p-2 border rounded" placeholder="Enter your password" required />

                        <button onClick={(e) => {
                            e.preventDefault();
                            handleSubmit("PROVIDER")
                        }} className="bg-gray-500 text-white p-2 rounded hover:bg-blue-600">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;