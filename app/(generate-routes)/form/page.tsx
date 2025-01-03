"use client"; // Cela indique que le composant est un composant côté client

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importation spécifique pour `app` directory
import { Header } from "@/components/Header";

function FormPage() {
  const [age, setAge] = useState<number | undefined>();
  const [gender, setGender] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialiser useRouter

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate.trim() || !endDate.trim()) {
      setError("La période (dates de début et de fin) est obligatoire.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError("La date de début doit être antérieure à la date de fin.");
      return;
    }

    setError("");
    console.log({ age, gender, startDate, endDate });

    // Rediriger vers la page /results après la soumission du formulaire
    router.push('/results');
  };

  return (
    <div className="p-8 bg-white-50 rounded-md w-[350px] sm:w-[580px]">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Champ pour la période (obligatoire) */}
        <div className="flex flex-col">
          <label className="text-left text-gray-700 font-medium mb-2">
            Période <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            <span className="my-auto">De</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                error && (!startDate || !endDate) ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            <span className="my-auto">à</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                error && (!startDate || !endDate) ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
          </div>
          {error && (!startDate || !endDate) && (
            <p className="text-red-500 text-sm mt-1">La période est obligatoire et doit être valide.</p>
          )}
          {error && new Date(startDate) > new Date(endDate) && (
            <p className="text-red-500 text-sm mt-1">La date de début doit être antérieure à la date de fin.</p>
          )}
        </div>

        {/* Champ pour l'âge */}
        <div className="flex flex-col">
          <label className="text-left text-gray-700 font-medium mb-2">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex : 25"
          />
        </div>

        {/* Champ pour le sexe */}
        <div className="flex flex-col">
          <label className="text-left text-gray-700 font-medium mb-2">Sexe</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionnez</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-full py-2.5 bg-accent-600 text-white-50 font-medium rounded-md hover:bg-accent-700 transition duration-200"
        >
          Soumettre
        </button>
      </form>
    </div>
  );
}

export default function ClinicalCaseForm() {
  return (
    <div>
      <Header />
      <section className="flex flex-col items-start w-full h-[824px] bg-gradient-to-br from-white-50 to-accent-100 px-4 sm:px-6 md:px-8 lg:px-28">
        <div className="flex flex-col w-full justify-center gap-8 sm:gap-12 md:gap-14 lg:gap-8 mx-auto">
          <div className="flex flex-col gap-2 text-center">
            <section className="w-full pt-32 px-4 sm:px-6 md:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10 sm:mb-16">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-semibold font-satoshi text-black-100 mb-4">
                    Entrez les caractéristiques de cas cliniques
                  </p>
                  <p className="text-base sm:text-lg font-inter text-black-400 max-w-2xl mx-auto">
                    Remplissez ce formulaire pour obtenir des cas cliniques adaptés à votre contexte.
                  </p>
                </div>
                <div className="flex flex-col items-center mx-auto">
                  <FormPage />
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
