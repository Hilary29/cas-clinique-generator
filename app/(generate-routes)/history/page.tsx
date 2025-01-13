"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../public/images/logo_clin2.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Activity = {
  id: number;
  title: string;
  description: string;
  date: string;
};

const Page = () => {
  const initialActivities: Activity[] = [
    { id: 1, title: "Patient X", description: "Resultat Diagnostic 1", date: "2025-01-01" },
    { id: 2, title: "Patient Y", description: "Resultat Diagnostic 2", date: "2025-01-02" },
    { id: 3, title: "Patient Z", description: "Resultat Diagnostic 3", date: "2025-01-03" },
    { id: 4, title: "Patient A", description: "Resultat Diagnostic 4", date: "2025-01-04" },
    { id: 5, title: "Patient B", description: "Resultat Diagnostic 5", date: "2025-01-05" },
    { id: 6, title: "Patient C", description: "Resultat Diagnostic 6", date: "2025-01-06" },
    { id: 7, title: "Patient D", description: "Resultat Diagnostic 7", date: "2025-01-07" },
  ];

  const [visibleActivities, setVisibleActivities] = useState(4);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [details, setDetails] = useState<Activity | null>(null);

  const filteredActivities = initialActivities.filter((activity) => {
    const matchesDate = !selectedDate || activity.date === selectedDate;
    const matchesTitle =
      !selectedTitle ||
      activity.title.toLowerCase().includes(selectedTitle.toLowerCase());
    return matchesDate && matchesTitle;
  });

  const displayedActivities = filteredActivities.slice(0, visibleActivities);

  return (
    <main className="bg-gradient-to-br from-white-50 to-accent-100 min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Logo" className="w-10 h-auto" />
          <h1 className="text-xl font-semibold text-secondary-500">Cas Clinique</h1>
        </Link>
      </header>

      {/* Contenu principal */}
      <section className="mt-8 w-full max-w-4xl px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-secondary-500 text-center">
              Activity History
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Find and manage your clinical case activities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Barre de filtres */}
            <div className="mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border rounded-lg p-3 w-full"
                  placeholder="Filter by date"
                />
                <input
                  type="text"
                  value={selectedTitle}
                  onChange={(e) => setSelectedTitle(e.target.value)}
                  className="border rounded-lg p-3 w-full"
                  placeholder="Search by title"
                />
              </div>
              {/* Reset filters */}
              <div className="flex justify-end mt-2">
                <Button
                  onClick={() => {
                    setSelectedDate("");
                    setSelectedTitle("");
                  }}
                  className="bg-gray-500 text-white-50 hover:bg-gray-600"
                >
                  Reset Filters
                </Button>
              </div>
            </div>

            {/* Liste des activités */}
            <div className="space-y-4">
              {displayedActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-4 border rounded-lg bg-white shadow-md flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-500">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">{activity.date}</span>
                    <Button
                      className="bg-active-600 text-white-50 hover:bg-active-700"
                      onClick={() => setDetails(activity)}
                    >
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Boutons pagination */}
            <div className="flex justify-center gap-4 mt-6">
              {visibleActivities < filteredActivities.length && (
                <Button
                  className="bg-active-600 text-white-50 hover:bg-active-700"
                  onClick={() => setVisibleActivities((prev) => prev + 4)}
                >
                  Load More
                </Button>
              )}
              {visibleActivities > 4 && (
                <Button
                  className="bg-gray-500 text-white-50 hover:bg-gray-600"
                  onClick={() => setVisibleActivities(4)}
                >
                  Reduce
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Modal pour les détails */}
      {details && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="bg-active-200 rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-xl font-semibold text-secondary-500">
              Details for {details.title}
            </h3>
            <p className="text-sm text-white-800 mt-2">{details.description}</p>
            <p className="text-sm text-white-700 mt-2">Date: {details.date}</p>
            <div className="flex justify-end mt-4">
              <Button
                className="bg-red-500 text-white-50 hover:bg-red-600"
                onClick={() => setDetails(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
