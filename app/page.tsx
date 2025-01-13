"use client"
 
import Footer from "@/components/Footer";
import { HeaderHome } from "@/components/HeaderHome";
import Hero from "@/components/Hero";
/* import { ModeToggle } from "@/components/ModeToggle"; */ //Changement de theme Dark light
import * as React from "react"



export default function Home() {
  return (
    <main className=""> 
    <HeaderHome />
    <Hero />
{/*       <div className="space-y-[100px] "> 
        <Hero />  
        <Features />
        <Benefits />
        <HowItWorks />
        <Testimonials />
        <Faq />
      </div>
      <Cta />
      <Footer /> */}
    </main>
  );
}
