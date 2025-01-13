import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section 
      className="flex flex-col items-start w-full  px-4 sm:px-6 md:px-8 lg:px-28 pt-20 md:pt-24 pb-6"
      aria-label="Héros"
    >
      <div className="flex flex-row w-full justify-between gap-8 sm:gap-12 md:gap-14 lg:gap-8">
        <div className="flex flex-col my-auto gap-10">
          <h1 
            className="text-3xl md:text-3xl lg:text-5xl font-semibold font-satoshi text-heading-desktop-h2 text-black-100 mb-4 sm:mb-5 md:mb-6"
            aria-level={1}
          >
            Génerez facilement des cas cliniques.
          </h1>
          <p className="font-regular font-inter text-paragraph-lg text-black-400 mb-6 sm:mb-8 md:mb-10 max-w-md sm:max-w-lg md:max-w-xl">
          Accedez a des cas de patients reels en toute confidentialite. Sélectionnez un intervalle de dates, et obtenez des résultats adaptés à votre contexte. 
          </p>
          <div>
            <Link 
              className="bg-accent-700 text-white-50 font-semibold font-inter text-paragraph-md rounded-md py-3 px-5 mx-auto sm:text-lg transition-colors duration-300 hover:bg-accent-600"
              href={"/login"}
              aria-label="Commencer la génération de cas cliniques"
            >
              Commencer
            </Link>
          </div>
        </div>
        <div className="w-[604px] h-[580px] aspect-video rounded-[32px] overflow-hidden">
          <Image
            src="/images/hero3.png"
            alt="Imgaen illustrative"
            width={704} 
            height={580} 
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
