import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col items-start w-full  bg-gradient-to-br from-white-50 to-primary-50 px-4 sm:px-6 md:px-8 lg:px-32 pt-28 md:pt-32">
      <div className="flex flex-row  w-full max-w-[1184px] mx-auto gap-8 sm:gap-12 md:gap-14 lg:gap-16">
        <div className="flex flex-col  max-w-xl lg:max-w-2xl my-auto  ">
          <p className="text-3xl  md:text-3xl lg:text-4xl font-semibold font-satoshi text-heading-desktop-h2 text-black-100 mb-4 sm:mb-5 md:mb-6 ">
            Generez facilement des cas cliniques.
          </p>
          <p className=" font-regular font-inter text-paragraph-md text-black-400  mb-6 sm:mb-8 md:mb-10 max-w-md sm:max-w-lg md:max-w-xl">
            Track your crops in real-time, get AI-powered recommendations, and connect with buyers—all in one platform.
          </p>
          <div>
          <Link 
            className="bg-[#2713a7]  text-white-50 font-regular font-inter text-paragraph-md rounded-md py-2.5 px-4 mx-auto  sm:text-lg transition-colors duration-300 hover:bg-blue-900"
            href={"/signup"}>
            Commencer
          </Link>
          </div>

        </div>
        <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src="/images/hero-image.jpg"
            alt="AgriNet Platform Preview"
            width={1184}
            height={602}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

