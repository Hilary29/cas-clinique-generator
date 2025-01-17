import { ClinicalCaseForm } from "./clinical-case-form"

export default function Page() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Filtre de Cas Cliniques
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Sélectionnez les critères pour filtrer les cas cliniques
      </p>
      <ClinicalCaseForm />
    </div>
  )
}

