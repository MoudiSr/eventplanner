'use client'
import { SessionProvider } from "next-auth/react";
import NavBar from "./navbar"

const ChildrenSession = ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <SessionProvider>
            <NavBar />
            {children}
        </SessionProvider>
    )
}

export default ChildrenSession;