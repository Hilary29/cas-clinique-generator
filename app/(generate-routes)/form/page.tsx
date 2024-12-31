import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <div>
          <section className="flex flex-col items-start w-full  bg-gradient-to-br from-white-50 to-accent-100 px-4 sm:px-6 md:px-8 lg:px-28 pt-20 md:pt-24 pb-6 ">
      <div className="flex flex-col  w-full justify-center  items-center gap-8 sm:gap-12 md:gap-14 lg:gap-8 mx-auto ">
        <div className="flex flex-col gap-2 text-center ">
          <p className="text-3xl  md:text-3xl lg:text-3xl font-semibold font-satoshi text-heading-desktop-h2 text-black-100 mb-4 sm:mb-5 md:mb-6 ">
            Remplissez le formulaire
          </p>
          <p className="  font-inter text-paragraph-md text-black-400   mb-4 sm:mb-5 md:mb-6 ">
             Entrez les caracteristiques des cas que vous voulez generer
          </p>

          <div>
          <div className="w-[704px]  h-[580px] aspect-video rounded-[32px] bg-gray-300 overflow-hidden">
          
          </div>
          </div>

        </div>

      </div>
    </section>   
    </div>
  )
}

export default page
