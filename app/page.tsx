'use client';
import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline()

    tl.from(".heading1", {
      opacity: 0,
      duration: 1,
      y: -50,
      ease: "power2.inOut",
    })

      .from(".heading2", {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power2.inOut"
      })

    const sections = gsap.utils.toArray<HTMLElement>(".section");


    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        markers: false,
      });
    });

  }, [])
  return (
    <main className="flex min-h-screen flex-col gap-8 p-8">
      <section className="h-screen relative z-[1] section flex flex-col gap-4 bg-[#8E6C88] p-8 md:p-18 rounded-4xl text-white">
        <h1 className="text-5xl md:text-8xl font-extrabold heading1">Every Moment Matters<br />Plan It Beautifully</h1>
        <p className="text-lg md:text-2xl heading2">From weddings to farewells, find the right venues and services effortlessly</p>
        <Link href="/services" className="mt-4 md:mt-8 heading2">
          <Button className="text-black" variant="outline">Explore Services</Button>
        </Link>
      </section>
      <section className="h-screen relative z-[2] section flex flex-col gap-4 bg-[#F2E6D5] p-8 md:p-18 rounded-4xl text-black">
        <h1 className="text-5xl md:text-8xl font-extrabold heading1">Every Moment Matters<br />Plan It Beautifully</h1>
        <p className="text-lg md:text-2xl heading2">From weddings to farewells, find the right venues and services effortlessly</p>
        <Link href="/services" className="mt-4 md:mt-8 heading2">
          <Button className="text-black" variant="outline">Explore Services</Button>
        </Link>
      </section>
      <section className="h-screen relative z-[3] section flex flex-col gap-4 bg-[#d5eef2] p-8 md:p-18 rounded-4xl text-black">
        <h1 className="text-5xl md:text-8xl font-extrabold heading1">Every Moment Matters<br />Plan It Beautifully</h1>
        <p className="text-lg md:text-2xl heading2">From weddings to farewells, find the right venues and services effortlessly</p>
        <Link href="/services" className="mt-4 md:mt-8 heading2">
          <Button className="text-black" variant="outline">Explore Services</Button>
        </Link>
      </section>
    </main>
  );
}
