import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col items-start w-full  bg-gradient-to-br from-white-50 to-accent-100 px-4 sm:px-6 md:px-8 lg:px-28 pt-20 md:pt-24 pb-6 ">
      <div className="flex flex-row  w-full justify-between   gap-8 sm:gap-12 md:gap-14 lg:gap-8">
        <div className="flex flex-col my-auto gap-10 ">
          <p className="text-3xl  md:text-3xl lg:text-5xl font-semibold font-satoshi text-heading-desktop-h2 text-black-100 mb-4 sm:mb-5 md:mb-6 ">
            Génerez facilement des cas cliniques.
          </p>
          <p className=" font-regular font-inter text-paragraph-md text-black-400  mb-6 sm:mb-8 md:mb-10 max-w-md sm:max-w-lg md:max-w-xl">
            Sous titre
          </p>
          <div>
          <Link 
            className="bg-primary-500  text-white-50 font-semibold font-inter text-paragraph-md rounded-md py-3 px-5 mx-auto  sm:text-lg transition-colors duration-300 hover:bg-primary-300"
            href={"/form"}>
            Commencer
          </Link>
          </div>

        </div>
        <div className="w-[704px]  h-[580px] aspect-video rounded-[32px] overflow-hidden">
          <Image
            src="/images/hero3.png"
            alt="AgriNet Platform Preview"
            width={584}
            height={102}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

