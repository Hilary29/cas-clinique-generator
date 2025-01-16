import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Activity, Pill, FileText, AlertCircle } from 'lucide-react';

interface ClinicalCase {
  diagnostic: {
    name: string;
    result: string;
  };
  currentTreatment: string;
  lifestyle: {
    addiction: Array<{
      name: string;
      frequency: string;
      duration: string;
    }>;
    physicalActivity: Array<{
      name: string;
      frequency: string;
    }>;
    travel: Array<{
      location: string;
      frequency: string;
      duration: string;
    }>;
    pets: string[];
    mosquitoNet: boolean;
    waterQuantity: string;
  };
  personalData: {
    age: number;
    sex: string;
    maritalStatus: string;
    profession: string;
    childrenCount: number;
    bloodGroup: string;
  };
  consultationReason: string;
  symptoms: Array<{
    name: string;
    location: string;
    startDate: string;
    frequency: string;
    duration: string;
    evolution: string;
    triggeringActivity: string;
    severity: number;
  }>;
  id: string;
}

const ClinicalCaseView = ({ clinicalCase }: { clinicalCase: ClinicalCase }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* En-tête du cas */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">
              Cas Clinique: {clinicalCase.diagnostic.name}
            </CardTitle>
            <Badge variant="outline">{clinicalCase.id.slice(0, 8)}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <span>
                {clinicalCase.personalData.age} ans, {clinicalCase.personalData.sex}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-gray-500" />
              <span>{clinicalCase.consultationReason}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations personnelles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Informations Personnelles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <InfoItem label="État civil" value={clinicalCase.personalData.maritalStatus} />
            <InfoItem label="Profession" value={clinicalCase.personalData.profession} />
            <InfoItem label="Groupe sanguin" value={clinicalCase.personalData.bloodGroup} />
            <InfoItem label="Enfants" value={clinicalCase.personalData.childrenCount.toString()} />
          </div>
        </CardContent>
      </Card>

      {/* Symptômes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Symptômes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clinicalCase.symptoms.map((symptom, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{symptom.name}</h4>
                    <p className="text-sm text-gray-600">Localisation: {symptom.location}</p>
                  </div>
                  <Badge 
                    variant={symptom.severity > 2 ? "destructive" : "secondary"}
                  >
                    Sévérité: {symptom.severity}/5
                  </Badge>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <p>Fréquence: {symptom.frequency}</p>
                  <p>Durée: {symptom.duration}</p>
                  <p>Évolution: {symptom.evolution}</p>
                  <p>Déclencheur: {symptom.triggeringActivity}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mode de vie */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Mode de vie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Addictions */}
            <div className="space-y-2">
              <h4 className="font-semibold">Addictions</h4>
              {clinicalCase.lifestyle.addiction.map((addiction, index) => (
                <div key={index} className="text-sm">
                  {addiction.name} - {addiction.frequency} ({addiction.duration})
                </div>
              ))}
            </div>

            {/* Activité physique */}
            <div className="space-y-2">
              <h4 className="font-semibold">Activité physique</h4>
              {clinicalCase.lifestyle.physicalActivity.map((activity, index) => (
                <div key={index} className="text-sm">
                  {activity.name} - {activity.frequency}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default ClinicalCaseView;