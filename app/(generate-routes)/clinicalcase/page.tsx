"use client";

import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import { ChevronRightCircle } from "lucide-react";

interface Lifestyle {
  addiction: Array<{ name: string; frequency: string; duration: string }>;
  physicalActivity: Array<{ name: string; frequency: string }>;
  travel: Array<{ location: string; frequency: string; duration: string }>;
  pets: string[];
  mosquitoNet: boolean;
  waterQuantity: string;
}

interface AdditionalTest {
  name: string;
  result: string;
  anatomy: string;
}

interface Disease {
  name: string;
  startDate: string;
  endDate: string | null;
  observation: string;
  treatment: {
    duration: string;
    posology: string;
  };
}

interface MedicalHistory {
  familyHistory: string;
  allergies: Array<{ manifestation: string; trigger: string }>;
  diseases: Disease[];
  surgeries: Array<{ name: string; date: string }>;
  obstetricalHistory: Record<string, unknown>;
}

interface Symptom {
  name: string;
  location: string;
  startDate: string;
  frequency: string;
  duration: string;
  evolution: string;
  triggeringActivity: string;
  severity: number;
}

interface ClinicalCase {
  diagnostic: {
    name: string;
    result: string;
  };
  currentTreatment: string;
  lifestyle: Lifestyle;
  personalData: {
    age: number;
    sex: string;
    maritalStatus: string;
    profession: string;
    childrenCount: number;
    bloodGroup: string;
  };
  consultationReason: string;
  additionalTests: AdditionalTest[];
  medicalHistory: MedicalHistory;
  symptoms: Symptom[];
  _id: string;
}

export default function Home() {
  const [clinicalCases, setClinicalCases] = useState<
    Record<string, ClinicalCase>
  >({});
  const [loading, setLoading] = useState(true);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  useEffect(() => {
    const fetchClinicalCases = async () => {
      try {
        const response = await fetch("http://localhost:3000/clinical_cases", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setClinicalCases(data);
      } catch (error) {
        console.error("Error fetching clinical cases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinicalCases();
  }, []);

  if (loading) {
    return <p>Loading clinical cases...</p>;
  }

  if (selectedCaseId) {
    const caseData = clinicalCases[selectedCaseId];
    return (
      <div className="p-4">
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setSelectedCaseId(null)}
        >
          Back to List
        </button>
        <ClinicalCaseDetails caseData={caseData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white-50 to-blue-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <p className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            Affichage de cas cliniques
          </p>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Ayez un appercu de tous les cas cliniques disponibles
          </p>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4  gap-8  mx-auto">
            {Object.entries(clinicalCases).map(([id, caseData]) => (
              <div key={id} className="p-4 border rounded shadow bg-white-50">
                <h2 className="text-xl font-semibold">
                  {caseData?.diagnostic?.name || "Unknown Diagnostic"} -{" "}
                  {caseData?.personalData?.profession || "Unknown Profession"}
                </h2>
                <p>
                  Raison de consultation: {caseData?.consultationReason || "No reason provided"}
                </p>
                <button
                  className="flex gap-2 mt-2  py-2 text-accent-600 text-paragraph-md font-semibold  "
                  onClick={() => setSelectedCaseId(id)}
                >
                  Plus de details
                  <ChevronRightCircle />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClinicalCaseDetails({ caseData }: { caseData: ClinicalCase }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Case Details</h1>
      <h2 className="text-xl mt-4">Diagnostic</h2>
      <p>Name: {caseData.diagnostic.name}</p>
      <p>Result: {caseData.diagnostic.result}</p>

      <h2 className="text-xl mt-4">Personal Data</h2>
      <p>Age: {caseData.personalData.age}</p>
      <p>Sex: {caseData.personalData.sex}</p>
      <p>Marital Status: {caseData.personalData.maritalStatus}</p>
      <p>Profession: {caseData.personalData.profession}</p>
      <p>Children Count: {caseData.personalData.childrenCount}</p>
      <p>Blood Group: {caseData.personalData.bloodGroup}</p>

      <h2 className="text-xl mt-4">Consultation Reason</h2>
      <p>{caseData.consultationReason}</p>

      <h2 className="text-xl mt-4">Current Treatment</h2>
      <p>{caseData.currentTreatment}</p>

      <h2 className="text-xl mt-4">Lifestyle</h2>
      <pre>{JSON.stringify(caseData.lifestyle, null, 2)}</pre>

      <h2 className="text-xl mt-4">Additional Tests</h2>
      {caseData.additionalTests.map((test, index) => (
        <div key={index}>
          <p>Name: {test.name}</p>
          <p>Result: {test.result}</p>
          <p>Anatomy: {test.anatomy}</p>
        </div>
      ))}

      <h2 className="text-xl mt-4">Symptoms</h2>
      {caseData.symptoms.map((symptom, index) => (
        <div key={index}>
          <p>Name: {symptom.name}</p>
          <p>Location: {symptom.location}</p>
          <p>Severity: {symptom.severity}</p>
        </div>
      ))}

      <h2 className="text-xl mt-4">Medical History</h2>
      <pre>{JSON.stringify(caseData.medicalHistory, null, 2)}</pre>
    </div>
  );
}
