'use client'
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavBar from "./navbar"

const ChildrenSession = ({ children }: {
    children: React.ReactNode;
}) => {
    const pathname = usePathname();

    const wrapperClass = "min-h-screen bg-gradient-to-b from-[#05060a] via-[#0b1220] to-[#0a1a2f] text-white";

    return (
        <SessionProvider>
            <div className={wrapperClass}>
                <NavBar />
                {children}
            </div>
        </SessionProvider>
    )
}

export default ChildrenSession;