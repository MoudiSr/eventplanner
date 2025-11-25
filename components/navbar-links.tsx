'use client';
import Link from "next/link";
import { useSession } from "next-auth/react";

const NavBarLinks = () => {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col gap-3 py-2 text-white/90">
            <Link href="/" className="text-lg transition hover:text-white">Home</Link>
            <Link href="/services" className="text-lg transition hover:text-white">Services</Link>
            {session?.user.role === "CUSTOMER" && <Link href="/customer" className="text-lg transition hover:text-white">Profile</Link>}
            {session?.user.role === "PROVIDER" && <Link href="/provider" className="text-lg transition hover:text-white">Profile</Link>}
            {!session && (
                <>
                    <Link href="/logIn" className="text-lg transition hover:text-white">Log In</Link>
                    <Link href="/signUp" className="text-lg transition hover:text-white">Sign Up</Link>
                </>
            )}
        </div>
    );
};

export default NavBarLinks;
