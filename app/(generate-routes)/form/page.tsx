"use client";
import React, { useState, FormEvent, ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRunning } from 'react-icons/fa';
import { ClinicalCase } from '../../../types/ClinicalCase';
import { 
  Calendar, 
  Thermometer, 
  Activity, 
  AlertCircle, 
  Heart, 
  Users, 
  Waypoints,
  Pill,
  Stethoscope,
  Plane,
  Wine
} from 'lucide-react';

interface SelectFieldProps {
  icon: ReactElement;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

interface RadioFieldProps {
  icon: ReactElement;
  label: string;
  name: string;
  value: boolean;
  onChange: (updater: (prev: FormData) => FormData) => void;
}

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

const SelectField: React.FC<SelectFieldProps> = ({ icon, label, name, value, onChange, options }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Sélectionner...</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

const RadioField: React.FC<RadioFieldProps> = ({ icon, label, name, value, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
      <div className="flex gap-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name={name}
            checked={value === true}
            onChange={() => onChange(prev => ({ ...prev, [name]: true }))}
            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-700">Oui</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name={name}
            checked={value === false}
            onChange={() => onChange(prev => ({ ...prev, [name]: false }))}
            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-700">Non</span>
        </label>
      </div>
    </div>
  );
};

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
      const response = await fetch('http://192.168.56.1:3000/generate', {
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Période */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent-800"/>
                <label className="text-sm font-medium text-gray-700">Date de début</label>
              </div>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent-800" />
                <label className="text-sm font-medium text-gray-700">Date de fin</label>
              </div>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* Principaux champs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              icon={<Thermometer className="w-4 h-4 text-red-800" />}
              label="Symptômes"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              options={symptomsList}
            />

            <SelectField
              icon={<Activity className="w-4 h-4 text-emerald-950" />}
              label="Maladie"
              name="disease"
              value={formData.disease}
              onChange={handleChange}
              options={diseasesList}
            />

            <SelectField
              icon={<AlertCircle className="w-4 h-4 text-green-500" />}
              label="Allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              options={allergiesList}
            />

            <SelectField
              icon={<Users className="w-4 h-4 text-purple-500" />}
              label="Antécédents familiaux"
              name="familyHistory"
              value={formData.familyHistory}
              onChange={handleChange}
              options={familyHistoryList}
            />
          </div>

          {/* Champs booléens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RadioField
              icon={<Heart className="w-4 h-4 text-red-500" />}
              label="Antécédents obstétriques"
              name="obstetricalHistory"
              value={formData.obstetricalHistory}
              onChange={setFormData}
            />

            <RadioField
              icon={<Waypoints className="w-4 h-4 text-gray-500" />}
              label="Chirurgie"
              name="surgery"
              value={formData.surgery}
              onChange={setFormData}
            />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">Traitement actuel</label>
              </div>
              <input
                type="text"
                name="currentTreatment"
                value={formData.currentTreatment}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Mode de vie */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RadioField
              icon={<Plane className="w-4 h-4 text-blue-800" />}
              label="Voyage"
              name="travel"
              value={formData.travel}
              onChange={setFormData}
            />

            <RadioField
              icon={<FaRunning className="w-4 h-4 text-gray-500" />}
              label="Activité physique"
              name="physicalActivity"
              value={formData.physicalActivity}
              onChange={setFormData}
            />

            <RadioField
              icon={<Wine className="w-4 h-4 text-gray-500" />}
              label="Dépendance"
              name="dependency"
              value={formData.dependency}
              onChange={setFormData}
            />
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-accent-600 text-white-50 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Générer
          </button>
        </form>
      </CardContent>
    </Card>
  );
}

// Composants réutilisables

export default function ClinicalCaseForm() {
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
        <FormPage />
      </div>
    </div>
  );
}
