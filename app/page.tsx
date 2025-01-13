"use client"
 
import Footer from "@/components/Footer"
import { HeaderHome } from "@/components/HeaderHome"
import Hero from "@/components/Hero"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white-50 to-accent-100 bg-cover bg-center w-full">
      <HeaderHome />
      <section 
        className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8 lg:px-28 pt-16 sm:pt-20 md:pt-24 pb-6"
        aria-label="Héros"
      >
        <div className="flex flex-col lg:flex-row w-full justify-between gap-8 sm:gap-12 md:gap-14 lg:gap-8">
          {/* Contenu texte */}
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:my-auto order-2 lg:order-1">
            <h1 
              className="text-2xl sm:text-3xl lg:text-5xl font-semibold font-satoshi text-heading-desktop-h2 text-black-100"
              aria-level={1}
            >
              Génerez facilement des cas cliniques.
            </h1>
            <p className="font-regular font-inter text-base sm:text-paragraph-lg text-black-400 max-w-none sm:max-w-lg md:max-w-xl">
              Accedez a des cas de patients reels en toute confidentialite. Sélectionnez un intervalle de dates, et obtenez des résultats adaptés à votre contexte.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link 
                className="bg-accent-700 text-white-50 font-semibold font-inter text-paragraph-md rounded-md py-3 px-5 transition-colors duration-300 hover:bg-accent-600 text-center sm:text-lg w-full sm:w-auto"
                href={"/login"}
                aria-label="Commencer la génération de cas cliniques"
              >
                Commencer
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-[604px] h-[300px] sm:h-[400px] md:h-[480px] lg:h-[580px] rounded-[20px] sm:rounded-[32px] overflow-hidden order-1 lg:order-2">
            <Image
              src="/images/hero3.png"
              alt="Image illustrative"
              width={704} 
              height={580}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  )
}

