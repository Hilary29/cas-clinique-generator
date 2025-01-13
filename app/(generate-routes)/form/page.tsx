"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";

function FormPage() {
  const commonSymptoms = ["Fièvre", "Fatigue", "Douleur", "Nausée", "Toux"];
  const commonDiseases = ["Diabète", "Hypertension", "Asthme", "Arthrite"];
  const commonFamilyHistory = ["Cancer", "Maladie cardiaque", "Diabète", "Hypertension"];
  const commonDiagnoses = ["Grippe", "Infection urinaire", "Migraine", "Lombalgie"];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [disease, setDisease] = useState("");
  const [allergies, setAllergies] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");
  const [obstetricHistory, setObstetricHistory] = useState("");
  const [surgery, setSurgery] = useState("");
  const [currentTreatment, setCurrentTreatment] = useState("");
  const [physicalDiagnosis, setPhysicalDiagnosis] = useState("");
  const [travel, setTravel] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState("");
  const [addiction, setAddiction] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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
    console.log({
      startDate,
      endDate,
      symptoms,
      disease,
      allergies,
      familyHistory,
      obstetricHistory,
      surgery,
      currentTreatment,
      physicalDiagnosis,
      travel,
      physicalActivity,
      addiction,
    });

    /* router.push('/results'); */
  };


  return (
    <div className="p-8 bg-white-50 rounded-md w-full max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section Informations */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Informations</h2>
          <div className="space-y-4">
            {/* Période */}
            <div className="flex flex-col">
              <label className="text-left text-gray-700 font-medium mb-2">
                Période <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
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

            {/* Symptômes */}
            <div className="flex flex-col">
              <label className="text-left text-gray-700 font-medium mb-2">Symptômes</label>
              <select
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value=""></option>
                {commonSymptoms.map((symptom) => (
                  <option key={symptom} value={symptom.toLowerCase()}>{symptom}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Section Antécédents Médicaux */}
        <div className="flex flex-col p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-4">Antécédents médicaux</h3>

          <div className="space-y-4">
            {/* Maladie */}
            <div>
              <label className="text-gray-700 font-medium mb-2">Maladie</label>
              <select
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value=""></option>
                {commonDiseases.map((disease) => (
                  <option key={disease} value={disease.toLowerCase()}>{disease}</option>
                ))}
              </select>
            </div>

            {/* Allergies */}
            <div>
              <label className="text-gray-700 font-medium mb-2">Allergies</label>
              <select
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value=""></option>
                <option value="arachide">Arachide</option>
                <option value="lait">Lait</option>
                <option value="poisson">Poisson</option>
                <option value="banane">Banane</option>
              </select>
            </div>

            {/* Antécédents familiaux */}
            <div>
              <label className="text-gray-700 font-medium mb-2">Antécédents familiaux</label>
              <select
                value={familyHistory}
                onChange={(e) => setFamilyHistory(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value=""></option>
                {commonFamilyHistory.map((history) => (
                  <option key={history} value={history.toLowerCase().replace(' ', '')}>{history}</option>
                ))}
              </select>
            </div>

            {/* Antécédents obstétricaux */}
            <div className="flex flex-col">
              <label className="text-left text-gray-700 font-medium mb-2">Antécédents obstétricaux</label>
              <select
                value={obstetricHistory}
                onChange={(e) => setObstetricHistory(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionnez</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </div>

            {/* Chirurgie */}
            <div className="flex flex-col">
              <label className="text-left text-gray-700 font-medium mb-2">Chirurgie</label>
              <select
                value={surgery}
                onChange={(e) => setSurgery(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionnez</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section Traitement en cours */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Traitement en cours</h2>
          <div className="flex flex-col">
            <label className="text-left text-gray-700 font-medium mb-2">Traitement actuel</label>
            <input
              type="text"
              value={currentTreatment}
              onChange={(e) => setCurrentTreatment(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex : antibiotiques, antidouleurs"
            />
          </div>
        </section>

        {/* Section Diagnostic physique */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Diagnostic physique</h2>
          <div className="flex flex-col">
            <label className="text-left text-gray-700 font-medium mb-2">Diagnostic</label>
            <select
              value={physicalDiagnosis}
              onChange={(e) => setPhysicalDiagnosis(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value=""></option>
              {commonDiagnoses.map((diagnosis) => (
                <option key={diagnosis} value={diagnosis.toLowerCase()}>{diagnosis}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Section Mode de vie */}
        <div className="flex flex-col p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-4">Mode de vie</h3>

          <div className="space-y-4">
            {/* Voyage */}
            <div>
              <label className="text-gray-700 font-medium mb-2">Voyage</label>
              <select
                value={travel}
                onChange={(e) => setTravel(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value=""></option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </div>

            {/* Activité physique */}
            <div>
              <label className="text-gray-700 font-medium mb-2">Activité physique</label>
              <select
                value={physicalActivity}
                onChange={(e) => setPhysicalActivity(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value=""></option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </div>

            {/* Addiction */}
            <div>
              <label className="text-gray-700 font-medium mb-2">Addiction</label>
              <select
                value={addiction}
                onChange={(e) => setAddiction(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value=""></option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </div>
          </div>
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
      <section className="flex flex-col items-start w-full min-h-screen bg-gradient-to-br from-white-50 to-accent-100 px-4 sm:px-6 md:px-8 lg:px-28 py-12">
        <div className="flex flex-col w-full justify-center gap-8 sm:gap-12 md:gap-14 lg:gap-8 mx-auto">
          <div className="flex flex-col gap-2 ">
            <section className="w-full pt-12 px-4 sm:px-6 md:px-8">
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

