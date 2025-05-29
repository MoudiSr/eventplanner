'use client';
import { useSession } from "next-auth/react";

const NavBarLinks = () => {
    const { data: session } = useSession();
    

    return (
        <div className="flex flex-col gap-4 p-4">
            <a href="/" className="text-lg">Home</a>
            <a href="/services" className="text-lg">Services</a>
            {session?.user.role === "CUSTOMER" && <a href="/customer" className="text-lg">Profile</a>}
            {session?.user.role === "PROVIDER" && <a href="/provider" className="text-lg">Profile</a>}
            {!session && (
                <>
                    <a href="/logIn" className="text-lg">Log In</a>
                    <a href="/signUp" className="text-lg">Sign Up</a>
                </>
            )}
        </div>
    )
}

export default NavBarLinks;