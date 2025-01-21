"use client";

import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import { utils as XLSXUtils, write as XLSXWrite } from 'xlsx';
import { Parser } from 'json2csv';
import { create } from 'xmlbuilder2';
import { ClinicalCaseCard } from './ClinicalCaseCard';
import { Button } from "@/components/ui/button"


interface Lifestyle {
  addiction?: Array<{ name: string; frequency: string; duration: string }>;
  physicalActivity?: Array<{ name: string; frequency: string }>;
  travel?: Array<{ location: string; frequency: string; duration: string }>;
  pets?: string[];
  mosquitoNet?: boolean;
  waterQuantity?: string;
}

interface AdditionalTest {
  name?: string;
  result?: string;
  anatomy?: string;
}

interface Disease {
  name?: string;
  startDate?: string;
  endDate?: string | null;
  observation?: string;
  treatment?: {
    duration?: string;
    posology?: string;
  };
}

interface MedicalHistory {
  familyHistory?: string;
  allergies?: Array<{ manifestation: string; trigger: string }>;
  diseases?: Disease[];
  surgeries?: Array<{ name: string; date: string }>;
  obstetricalHistory?: Record<string, unknown>;
}

interface Symptom {
  name?: string;
  location?: string;
  startDate?: string;
  frequency?: string;
  duration?: string;
  evolution?: string;
  triggeringActivity?: string;
  severity?: number;
}

interface ClinicalCase {
  diagnostic?: {
    name?: string;
    result?: string;
  };
  currentTreatment?: string;
  lifestyle?: Lifestyle;
  personalData?: {
    age?: number;
    sex?: string;
    maritalStatus?: string;
    profession?: string;
    childrenCount?: number;
    bloodGroup?: string;
  };
  consultationReason?: string;
  additionalTests?: AdditionalTest[];
  medicalHistory?: MedicalHistory;
  symptoms?: Symptom[];
  _id?: string;
}


export default function Home() {
  const [clinicalCases, setClinicalCases] = useState<
    Record<string, ClinicalCase>
  >({});
  const [loading, setLoading] = useState(true);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    surgery: "any",
    pregnancies: "any",
    addiction: "any",
    physicalActivity: "any",
    travel: "any",
    sex: "any",
  });
  const [exportFormat, setExportFormat] = useState<string>("json");
  const [showCases, setShowCases] = useState(false);

  const getFieldIcon = (field: string) => {
    const icons: Record<string, string> = {
      surgery: '🏥',
      pregnancies: '🤰',
      addiction: '🍷',
      physicalActivity: '🏃',
      travel: '✈️',
      sex: '👤',
    };
    return icons[field] || '';
  };

  const getFieldLabel = (field: string) => {
    return field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
  };


  useEffect(() => {
    const fetchClinicalCases = async () => {
      try {
        const response = await fetch("http://localhost:3000/clinical_cases");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
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

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  const filteredCases = Object.entries(clinicalCases).filter(
    ([id, caseData]) => {
      const lifestyle = caseData.lifestyle || {};
      const personalData = caseData.personalData || {};

      if (filter.surgery === "no" && caseData.medicalHistory?.surgeries?.length)
        return false;
      if (
        filter.surgery === "yes" &&
        (!caseData.medicalHistory?.surgeries ||
          caseData.medicalHistory.surgeries.length === 0)
      )
        return false;

      if (filter.addiction === "no" && (lifestyle.addiction?.length || 0) > 0)
        return false;
      if (
        filter.addiction === "yes" &&
        (!lifestyle.addiction || lifestyle.addiction.length === 0)
      )
        return false;

      if (
        filter.physicalActivity === "no" &&
        (lifestyle.physicalActivity?.length || 0) > 0
      )
        return false;
      if (
        filter.physicalActivity === "yes" &&
        (!lifestyle.physicalActivity || lifestyle.physicalActivity.length === 0)
      )
        return false;

      if (filter.travel === "no" && (lifestyle.travel?.length || 0) > 0)
        return false;
      if (
        filter.travel === "yes" &&
        (!lifestyle.travel || lifestyle.travel.length === 0)
      )
        return false;

      if (filter.sex !== "any" && personalData.sex !== filter.sex) {
        return false;
      }

      return true;
    }
  );

  if (loading) return <p>Loading clinical cases...</p>;

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
        {/* <ClinicalCaseDetails caseData={caseData} /> */}
      </div>
    );
  }

  const exportFilteredCases = async (cases: [string, ClinicalCase][]) => {
    const formattedData = cases.map(([id, caseData]) => ({
      id,
      ...caseData,
    }));

    let blob: Blob | undefined;
    let fileExtension: string = "json";
    let contentType: string = "application/json";

    switch (exportFormat) {
      case "xml":
        const xmlData = convertToXML(formattedData);
        blob = new Blob([xmlData], { type: "application/xml" });
        fileExtension = "xml";
        contentType = "application/xml";
        break;
      case "csv":
        const csvData = await convertToCSV(formattedData);
        blob = new Blob([csvData], { type: "text/csv" });
        fileExtension = "csv";
        contentType = "text/csv";
        break;
      case "xlsx":
        const xlsxData = convertToXLSX(formattedData);
        blob = new Blob([xlsxData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        fileExtension = "xlsx";
        contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;
      default:
        blob = new Blob([JSON.stringify({ clinicalCases: formattedData }, null, 2)], {
          type: "application/json",
        });
        fileExtension = "json";
        contentType = "application/json";
        break;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `clinical_cases.${fileExtension}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const convertToCSV = async (data: any[]) => {
    const json2csvParser = new Parser();
    return json2csvParser.parse(data);
  };

  const convertToXML = (data: any[]) => {
    const root = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('clinicalCases');

    data.forEach((item) => {
      const caseElement = root.ele('clinicalCase');
      Object.entries(item).forEach(([key, value]) => {
        caseElement.ele(key).txt(String(value));
      });
    });

    return root.end({ prettyPrint: true });
  };

  const convertToXLSX = (data: any[]) => {
    const ws = XLSXUtils.json_to_sheet(data);
    const wb = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(wb, ws, "Clinical Cases");
    return XLSXWrite(wb, { bookType: "xlsx", type: "array" });
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-white-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mt-12">
          <p className="font-semibold text-heading-desktop-h2 text-gray-900 ">
            Génération de cas cliniques
          </p>
          <p className="my-8 text-xl text-gray-600 max-w-3xl mx-auto">
            Remplissez ce formulaire pour obtenir des cas cliniques adaptés à votre contexte.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white-50 rounded-xl shadow-lg overflow-hidden">
          <form className="p-6 space-y-6 ">
            {['surgery', 'pregnancies', 'addiction', 'physicalActivity', 'travel', 'sex'].map((field) => (
              <div key={field} className="space-y-2">
                <label htmlFor={field} className="block font-medium text-paragraph-lg text-gray-700">
                  {getFieldIcon(field)} {getFieldLabel(field)}
                </label>
                <select
                  id={field}
                  name={field}
                  value={filter[field as keyof typeof filter]}
                  onChange={handleFilterChange}
                  className="w-full rounded-lg border-gray-300 bg-gray-50 py-2.5 px-4 text-gray-900 shadow-sm transition duration-200 ease-in-out hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="any"></option>
                  {field === 'sex' ? (
                    <>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </>
                  ) : (
                    <>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </>
                  )}
                </select>
              </div>
            ))}
          </form>
        </div>

        <div className="max-w-2xl mx-auto mt-8 p-6 bg-gray-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cas cliniques filtrés</h2>
          <div className="flex items-center space-x-4 mb-4">
            <Button
              onClick={() => setShowCases(!showCases)}
              className="px-6 py-2.5 bg-accent-600 text-white-50 font-medium rounded-md shadow-md hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              {showCases ? 'Masquer les cas' : 'Afficher les cas'}
            </Button>
          </div>
          {showCases && (
            <div className="mb-8">
              {filteredCases.map(([id, caseData]) => (
                <ClinicalCaseCard key={id} caseData={caseData} />
              ))}
            </div>
          )}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Exporter les cas filtrés</h2>
          <div className="flex items-center space-x-4">
            <select
              name="exportFormat"
              onChange={(e) => setExportFormat(e.target.value)}
              className="flex-grow rounded-lg border-gray-300 bg-white py-2.5 px-4 text-gray-900 shadow-sm transition duration-200 ease-in-out hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="xml">XML</option>
              <option value="xlsx">XLSX</option>
            </select>
            <Button
              onClick={() => exportFilteredCases(filteredCases)}
              className="px-6 py-2.5 bg-accent-600 text-white-50 font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              Exporter
            </Button>
          </div>
        </div>
      </main>
    </div>

  );
}

/* function ClinicalCaseDetails({ caseData }: { caseData: ClinicalCase }) {
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
 */

