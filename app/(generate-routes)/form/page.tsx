"use client";

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from "@/components/Header";

type FormData = {
  startDate: string
  endDate: string
  symptoms: string
  disease: string
  allergies: string
  familyHistory: string
  obstetricalHistory: boolean
  surgery: boolean
  currentTreatment: string
  physicalDiagnosis: string
  travel: boolean
  physicalActivity: boolean
  dependency: boolean
}

const symptomsList = [
  'Fièvre',
  'Toux',
  'Fatigue',
  'Essoufflement',
  'Mal de tête',
  'Nausées',
  'Vomissements',
  'Douleurs musculaires',
  'Perte d’appétit',
  'Frissons',
  'Douleurs thoraciques',
  'Perte de l’odorat',
  'Perte du goût',
  'Démangeaisons',
  'Étourdissements',
  'Douleurs abdominales',
];

const diseasesList = [
  'Hypertension',
  'Diabète',
  'Asthme',
  'Maladie cardiaque',
  'Cancer',
  'Insuffisance rénale',
  'Hépatite',
  'Sclérose en plaques',
  'Tuberculose',
  'VIH/SIDA',
  'Arthrite rhumatoïde',
  'Maladie de Parkinson',
  'Alzheimer',
  'Migraine chronique',
  'Ostéoporose',
];

const allergiesList = [
  'Pollen',
  'Poussière',
  'Pénicilline',
  'Arachides',
  'Latex',
  'Œufs',
  'Lait',
  'Fruits de mer',
  'Noix',
  'Soja',
  'Blé',
  'Médicaments spécifiques',
  'Poils d’animaux',
  'Moisissures',
  'Produits chimiques',
];

const diagnosisList = [
  'Normal',
  'Sons cardiaques anormaux',
  'Sifflements',
  'Sensibilité abdominale',
  'Éruption cutanée',
  'Inflammation des articulations',
  'Douleur localisée',
  'Palpitations',
  'Gonflement des ganglions lymphatiques',
  'Pression artérielle élevée',
  'Tachycardie',
  'Bradycardie',
  'Troubles respiratoires',
  'Fièvre persistante',
  'Jaunisse',
];

const familyHistoryList = [
  'Diabète',
  'Maladie cardiaque',
  'Cancer',
  'Hypertension',
  'Asthme',
  'Arthrite',
  'Accidents vasculaires cérébraux (AVC)',
  'Dépression',
  'Troubles bipolaires',
  'Maladie de Crohn',
  'Sclérose en plaques',
  'Anémie falciforme',
  'Hypercholestérolémie',
  'Obésité',
  'Maladies auto-immunes',
];

function FormPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    startDate: '',
    endDate: '',
    symptoms: '',
    disease: '',
    allergies: '',
    familyHistory: '',
    obstetricalHistory: false,
    surgery: false,
    currentTreatment: '',
    physicalDiagnosis: '',
    travel: false,
    physicalActivity: false,
    dependency: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Clinical cases generated:', result)
        router.push('/results')
      } else {
        console.error('Failed to generate clinical cases')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-[500px] mx-auto p-4 bg-white-50 rounded-md shadow-6dp-v2">
      <div className="grid grid-cols-1  gap-8">       
        <div className="flex  gap-4 justify-between">
        <div >
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">De</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">A</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        </div>


        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">Symptoms</label>
          <select
            id="symptoms"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select symptom</option>
            {symptomsList.map(symptom => (
              <option key={symptom} value={symptom}>{symptom}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="disease" className="block text-sm font-medium text-gray-700">Disease</label>
          <select
            id="disease"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select disease</option>
            {diseasesList.map(disease => (
              <option key={disease} value={disease}>{disease}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies</label>
          <select
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select allergy</option>
            {allergiesList.map(allergy => (
              <option key={allergy} value={allergy}>{allergy}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="familyHistory" className="block text-sm font-medium text-gray-700">Family History</label>
          <select
            id="familyHistory"
            name="familyHistory"
            value={formData.familyHistory}
            onChange={handleChange}
            className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select family history</option>
            {familyHistoryList.map(history => (
              <option key={history} value={history}>{history}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="obstetricalHistory" className="block text-sm font-medium text-gray-700">Obstetrical History</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="obstetricalHistory"
                value="true"
                checked={formData.obstetricalHistory === true}
                onChange={() => setFormData(prev => ({ ...prev, obstetricalHistory: true }))}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="obstetricalHistory"
                value="false"
                checked={formData.obstetricalHistory === false}
                onChange={() => setFormData(prev => ({ ...prev, obstetricalHistory: false }))}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="surgery" className="block text-sm font-medium text-gray-700">Surgery</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="surgery"
                value="true"
                checked={formData.surgery === true}
                onChange={() => setFormData(prev => ({ ...prev, surgery: true }))}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="surgery"
                value="false"
                checked={formData.surgery === false}
                onChange={() => setFormData(prev => ({ ...prev, surgery: false }))}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="currentTreatment" className="block text-sm font-medium text-gray-700">Current Treatment</label>
          <input
            type="text"
            id="currentTreatment"
            name="currentTreatment"
            value={formData.currentTreatment}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="physicalDiagnosis" className="block text-sm font-medium text-gray-700">Physical Diagnosis</label>
          <select
            id="physicalDiagnosis"
            name="physicalDiagnosis"
            value={formData.physicalDiagnosis}
            onChange={handleChange}
            className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select physical diagnosis</option>
            {diagnosisList.map(diagnosis => (
              <option key={diagnosis} value={diagnosis}>{diagnosis}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Travel</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="travel"
                value="true"
                checked={formData.travel === true}
                onChange={() => setFormData(prev => ({ ...prev, travel: true }))}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="travel"
                value="false"
                checked={formData.travel === false}
                onChange={() => setFormData(prev => ({ ...prev, travel: false }))}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Physical Activity</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="physicalActivity"
                value="true"
                checked={formData.physicalActivity === true}
                onChange={() => setFormData(prev => ({ ...prev, physicalActivity: true }))}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="physicalActivity"
                value="false"
                checked={formData.physicalActivity === false}
                onChange={() => setFormData(prev => ({ ...prev, physicalActivity: false }))}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dependency</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="dependency"
                value="true"
                checked={formData.dependency === true}
                onChange={() => setFormData(prev => ({ ...prev, dependency: true }))}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="dependency"
                value="false"
                checked={formData.dependency === false}
                onChange={() => setFormData(prev => ({ ...prev, dependency: false }))}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white-50 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate Clinical Cases
        </button>
      </div>
    </form>
  )
}




export default function ClinicalCaseForm() {
  return (
    <div>
      <Header />
      <section className="flex flex-col items-start w-full min-h-screen bg-gradient-to-br from-white-50 to-accent-100 px-4 sm:px-6 md:px-8 lg:px-28 py-12">
        <div className="flex flex-col w-full justify-center gap-8 sm:gap-12 md:gap-14 lg:gap-8 mx-auto">
          <div className="flex flex-col gap-2 ">
            <section className="w-full pt-12 px-4 sm:px-6 md:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10 sm:mb-16">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-semibold font-satoshi text-black-100 mb-4">
                    Entrez les caractéristiques de cas cliniques
                  </p>
                  <p className="text-base sm:text-lg font-inter text-black-400 max-w-2xl mx-auto">
                    Remplissez ce formulaire pour obtenir des cas cliniques
                    adaptés à votre contexte.
                  </p>
                </div>
                <div className="flex flex-col items-center mx-auto">
                  <FormPage />
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
