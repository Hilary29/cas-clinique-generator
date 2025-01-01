"use client"
 
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
/* import { ModeToggle } from "@/components/ModeToggle"; */ //Changement de theme Dark light
import * as React from "react"



export default function Home() {
  return (
    <main className=""> 
    <Header />
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
