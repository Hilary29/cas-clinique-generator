"use client"
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Header } from "@/components/Header";

interface Log {
  _id: string;
  message: string;
  timestamp: string;
}

const LogsPage: NextPage = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fonction pour récupérer les logs du backend
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/logs"); // Assurez-vous que l'URL correspond à votre backend
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des logs");
        }
        const data = await response.json();
        setLogs(data.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Une erreur inconnue est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []); // L'effet est déclenché une seule fois au montage du composant

  if (loading) {
    return <div>Chargement des logs...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
            <div className="min-h-screen bg-accent-50">
              <Header />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-12">
                  <p className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                    Historique
                  </p>
                  <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Consultez les fichiers log
                  </p>
                </div>
        <div className="p-4 ">
        <div className="container mx-auto p-4 bg-white-50 shadow-6dp">
      <h1 className="text-2xl font-bold">Logs</h1>
      <div className="mt-4 overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td className="border px-4 py-2">{log._id}</td>
                <td className="border px-4 py-2">{log.message}</td>
                <td className="border px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> 
   
    
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




 /*    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Logs</h1>
      <div className="mt-4 overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td className="border px-4 py-2">{log._id}</td>
                <td className="border px-4 py-2">{log.message}</td>
                <td className="border px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> */
  );
};

export default LogsPage;
