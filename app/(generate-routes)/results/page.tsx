"use client";
import { Header } from "@/components/Header";
import React, { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import clinicalCases from "../../../api/clinical-cases";

const page = () => {
  return (
    <div>
      <Header />
      <section className="flex flex-col items-start w-full h-[824px] bg-gradient-to-br from-white-50 to-accent-100 px-4 sm:px-6 md:px-8 lg:px-28 ">
        <div className="flex flex-col w-full justify-center gap-8 sm:gap-12 md:gap-14 lg:gap-8 mx-auto ">
          <div className="flex flex-col gap-2 text-center ">
            <ResultAccordion />
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;

const ToggleIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="group flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 cursor-pointer transition duration-200 ">
      {isOpen ? (
        <ChevronUp className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 text-accent-600" />
      ) : (
        <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 text-accent-800" />
      )}
    </div>
  );
};

const ResultAccordion = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [clinicalCases, setClinicalCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleAccordion = (value: string) => {
    setOpenItem((prev) => (prev === value ? null : value));
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("/api/clinical-cases");
        setClinicalCases(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats", error);
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  // Fonction pour exporter les résultats en JSON
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(clinicalCases, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resultats_cliniques.json";
    link.click();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Chargement des résultats...</p>
      </div>
    );
  }

  const faqItems = clinicalCases.length > 0 ? clinicalCases : [
    {
      question: "Aucun résultat",
      answer: "Aucun cas clinique trouvé pour la période donnée.",
    }
  ];

  return (
    <section className="w-full pt-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <p className="inline-block px-3 py-1 mb-3 text-sm font-semibold text-accent-600 ">
            RÉSULTATS
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold font-satoshi text-black-100 mb-4">
            Résultats des cas cliniques demandés
          </p>
          <p className="text-base sm:text-lg text-black-400 max-w-2xl mx-auto">
            Trouvez ici les informations sur les cas cliniques récupérés.
          </p>
        </div>

        {/* Bouton Exporter */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleExport}
            className="px-6 py-2 bg-primary-500 text-white-50 font-semibold font-inter rounded-md hover:bg-primary-400 transition duration-200"
          >
            Exporter
          </button>
        </div>

        <Accordion type="single" collapsible className="w-full text-black-50 ">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={`item-${index + 1}`}
              value={`item-${index + 1}`}
              className=""
            >
              <AccordionTrigger
                onClick={() => toggleAccordion(`item-${index + 1}`)}
                className="flex justify-between items-center text-left font-medium text-base sm:text-lg md:text-xl font-satoshi py-4 px-2 "
              >
                {item.question}
                <ToggleIcon isOpen={openItem === `item-${index + 1}`} />
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-black-400 px-2 pb-4 ">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
