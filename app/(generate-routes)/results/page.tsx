"use client";
import { Header } from "@/components/Header";
import React, { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import clinicalCases from "../../../api/clinical-cases";
import { DataTable } from "./data-table";

const page = () => {
  return (
    <div>
      <Header />
      <section className="flex flex-col items-start w-full h-full bg-white-50 px-4 sm:px-6 md:px-8 lg:px-28 ">
        <div className="flex flex-col w-full justify-center gap-8 sm:gap-12 md:gap-14 lg:gap-8 mx-auto ">
          <div className="flex flex-col gap-2 text-center ">
          <section className="w-full pt-32 px-4 sm:px-6 md:px-8">
      <div className=" w-full  mx-auto">
        <div className="text-center mb-8">
{/*           <p className="inline-block px-3 py-1 mb-3 text-sm font-semibold text-accent-600 ">
            RÉSULTATS
          </p> */}
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold font-satoshi text-black-100 mb-4">
            Résultats des cas cliniques demandés
          </p>
          <p className="text-base sm:text-lg  text-black-400 max-w-2xl mx-auto">
            Trouvez ici les informations sur les cas cliniques récupérés.
          </p>
        </div>
        <div className="w-full mx-auto py-4 pb-4">
        <DataTable/>
        </div>
            
      </div>
    </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
