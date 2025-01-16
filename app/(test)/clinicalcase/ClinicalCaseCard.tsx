import React from 'react';
import { ClinicalCase } from '../../../types/ClinicalCase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ClinicalCaseCardProps {
  clinicalCase: ClinicalCase;
}

const ClinicalCaseCard: React.FC<ClinicalCaseCardProps> = ({ clinicalCase }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto my-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Cas Clinique {clinicalCase.id.slice(0, 8)}</span>
          <span className="text-sm font-normal">
            {clinicalCase.personalData.age} ans, {clinicalCase.personalData.sex}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Diagnostic et raison de consultation */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Diagnostic et Consultation</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Raison de consultation</p>
                <p>{clinicalCase.consultationReason}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Diagnostic</p>
                <p>{clinicalCase.diagnostic.name} - {clinicalCase.diagnostic.result}</p>
              </div>
            </div>
          </div>

          {/* Symptômes */}
          <div>
            <h3 className="font-semibold mb-2">Symptômes</h3>
            <div className="grid gap-4">
              {clinicalCase.symptoms.map((symptom, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Symptôme</p>
                      <p>{symptom.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Localisation</p>
                      <p>{symptom.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sévérité</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 rounded-full mr-1 ${
                              i < symptom.severity ? 'bg-red-500' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traitements */}
          <div>
            <h3 className="font-semibold mb-2">Traitement actuel</h3>
            <p className="bg-blue-50 p-4 rounded-lg">{clinicalCase.currentTreatment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicalCaseCard;