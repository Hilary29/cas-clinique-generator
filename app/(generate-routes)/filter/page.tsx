"use client";

import { Header } from "@/components/Header";
import { useEffect, useState } from "react";


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
  });

  const [exportFormat, setExportFormat] = useState<string>("json");

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
        <ClinicalCaseDetails caseData={caseData} />
      </div>
    );
  }

  const exportFilteredCases = (cases: [string, ClinicalCase][]) => {
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
        const csvData = convertToCSV(formattedData);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convertToCSV = (data: any[]) => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");
    return `${headers}\n${rows}`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convertToXML = (data: any[]) => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<clinicalCases>';
    data.forEach((item) => {
      xml += "\n  <clinicalCase>";
      Object.keys(item).forEach((key) => {
        xml += `\n    <${key}>${item[key]}</${key}>`;
      });
      xml += "\n  </clinicalCase>";
    });
    xml += "\n</clinicalCases>";
    return xml;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convertToXLSX = (data: any[]) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const XLSX = require("xlsx");
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clinical Cases");
    return XLSX.write(wb, { bookType: "xlsx", type: "array" });
  };

  

  return (
        <div className="min-h-screen bg-accent-50">
          <Header />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center mb-12">
              <p className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                Génération de cas cliniques
              </p>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Remplissez ce formulaire pour obtenir des cas cliniques adaptés à votre contexte.
              </p>
            </div>
    <div className="p-4 ">

      {/* Filter Form */}
      <form className="max-w-xl mx-auto p-6 bg-white-50 rounded-xl shadow-lg space-y-8 md:gap-6">
        {/* Surgery Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🏥 Surgery
          </label>
          <select
            name="surgery"
            value={filter.surgery}
            onChange={handleFilterChange}
            className="w-full rounded-lg border-gray-300 bg-gray-50 py-2.5 px-4 text-gray-900 shadow-sm transition duration-200 ease-in-out hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="any"></option>
            <option value="no">No surgery</option>
            <option value="yes">Surgery</option>
          </select>
        </div>

        {/* Pregnancies Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🤰 Pregnancies
          </label>
          <select
            name="pregnancies"
            value={filter.pregnancies}
            onChange={handleFilterChange}
            className="w-full rounded-lg border-gray-300 bg-gray-50 py-2.5 px-4 text-gray-900 shadow-sm transition duration-200 ease-in-out hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="any"></option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {/* Addiction Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🍷 Addiction
          </label>
          <select
            name="addiction"
            value={filter.addiction}
            onChange={handleFilterChange}
            className="w-full rounded-lg border-gray-300 bg-gray-50 py-2.5 px-4 text-gray-900 shadow-sm transition duration-200 ease-in-out hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="any"></option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {/* Physical Activity Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🏃 Physical Activity
          </label>
          <select
            name="physicalActivity"
            value={filter.physicalActivity}
            onChange={handleFilterChange}
            className="w-full rounded-lg border-gray-300 bg-gray-50 py-2.5 px-4 text-gray-900 shadow-sm transition duration-200 ease-in-out hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="any"></option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {/* Travel Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ✈️ Travel
          </label>
          <select
            name="travel"
            value={filter.travel}
            onChange={handleFilterChange}
            className="w-full rounded-lg border-gray-300 bg-gray-50 py-2.5 px-4 text-gray-900 shadow-sm transition duration-200 ease-in-out hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="any"></option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div className="flex flex-row justify-end mt-4 gap-2 ">
        <div className="space-y-2 py-auto">
          <label className="block text-sm font-medium text-gray-700 "></label>
          <select
            name="exportFormat"
            onChange={(e) => setExportFormat(e.target.value)}
            className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-4 text-gray-900 shadow-sm transition duration-200 ease-in-out hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="xml">XML</option>
            <option value="xlsx">XLSX</option>
          </select>
        </div>


        <button
        onClick={() => exportFilteredCases(filteredCases)}
        className=" px-3 py-2 bg-accent-600 text-white-50 rounded-lg"
      >
        Exporter
      </button>
</div>
      </form>

{/*       <div className="grid gap-4 mt-4 max-w-xl mx-auto">
        {filteredCases.map(([id, caseData]) => (
          <div key={id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">
              {caseData?.diagnostic?.name || "Unknown Diagnostic"} -{" "}
              {caseData?.personalData?.profession || "Unknown Profession"}
            </h2>
            <p>
              Reason: {caseData?.consultationReason || "No reason provided"}
            </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setSelectedCaseId(id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div> */}
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
