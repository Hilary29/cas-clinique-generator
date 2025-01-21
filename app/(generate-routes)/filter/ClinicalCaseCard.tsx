import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClinicalCase } from '../../../types/ClinicalCase';

interface ClinicalCaseCardProps {
  caseData: ClinicalCase;
}

export function ClinicalCaseCard({ caseData }: ClinicalCaseCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{caseData.diagnostic?.name || 'Undiagnosed Case'}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Age:</strong> {caseData.personalData?.age}</p>
        <p><strong>Sex:</strong> {caseData.personalData?.sex}</p>
        <p><strong>Consultation Reason:</strong> {caseData.consultationReason}</p>
        <p><strong>Current Treatment:</strong> {caseData.currentTreatment}</p>
      </CardContent>
    </Card>
  );
}

