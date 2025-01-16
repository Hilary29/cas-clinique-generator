// pages/index.tsx
import { mockClinicalCases } from '../../../data/clinic';
import ClinicalCaseCard from './ClinicalCaseCard';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Cas Cliniques</h1>
      {mockClinicalCases.map((clinicalCase) => (
        <ClinicalCaseCard 
          key={clinicalCase.id} 
          clinicalCase={clinicalCase} 
        />
      ))}
    </div>
  );
}