import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AlignJustify } from "lucide-react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event Planner",
  description: "Best event planner in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <nav className="flex justify-between items-center p-4 bg-white shadow-md">
            <div>
              <h1>Momentry</h1>
            </div>
            <div>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className="bg-background text-foreground hover:bg-background hover:text-foreground"><AlignJustify className="size-6" /></Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                      <DrawerTitle>Navigation Menu</DrawerTitle>
                      <DrawerDescription>Check our services</DrawerDescription>
                    </DrawerHeader>
                  <div className="flex flex-col gap-4 p-4">
                    <a href="/" className="text-lg">Home</a>
                    <a href="/services" className="text-lg">Services</a>
                    <a href="/customer" className="text-lg">Customer</a>
                    <a href="/provider" className="text-lg">Provider</a>
                    <a href="/logIn" className="text-lg">Log In</a>
                    <a href="/signUp" className="text-lg">Sign Up</a>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
