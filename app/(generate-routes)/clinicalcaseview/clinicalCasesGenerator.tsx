import { v4 as uuidv4 } from 'uuid';

// Types
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
  additionalTests: Array<{
    name: string;
    result: string;
    anatomy: string;
  }>;
  medicalHistory: {
    familyHistory: string;
    allergies: Array<{
      manifestation: string;
      trigger: string;
    }>;
    diseases: Array<{
      name: string;
      startDate: string;
      endDate: string;
      observation: string;
      treatment: {
        duration: string;
        posology: string;
      };
    }>;
    surgeries: Array<{
      name: string;
      date: string;
    }>;
    obstetricalHistory?: {
      pregnancies: number;
      lastPregnancyDate: string;
    };
  };
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

// Données de test
const diagnostics = [
  { name: "Hypertension", result: "150/90 mmHg" },
  { name: "Diabète Type 2", result: "HbA1c: 7.2%" },
  { name: "Migraine chronique", result: "Diagnostic clinique positif" },
  { name: "Asthme", result: "DEP: 350 L/min" },
  { name: "Arthrose", result: "Diagnostic radiologique confirmé" }
];

const treatments = [
  "Amlodipine 5mg",
  "Metformine 1000mg",
  "Sumatriptan 50mg",
  "Ventoline 100μg",
  "Paracétamol 1000mg"
];

const addictions = [
  { name: "Tabac", frequency: "Quotidien", duration: "10 ans" },
  { name: "Café", frequency: "3 fois/jour", duration: "15 ans" },
  { name: "Alcool", frequency: "Occasionnel", duration: "5 ans" }
];

const activities = [
  { name: "Marche", frequency: "3 fois/semaine" },
  { name: "Natation", frequency: "1 fois/semaine" },
  { name: "Vélo", frequency: "2 fois/semaine" },
  { name: "Yoga", frequency: "2 fois/semaine" }
];

// Fonction de génération de cas cliniques
export const generateClinicalCases = (count: number): ClinicalCase[] => {
  return Array(count).fill(null).map(() => ({
    id: uuidv4(),
    diagnostic: diagnostics[Math.floor(Math.random() * diagnostics.length)],
    currentTreatment: treatments[Math.floor(Math.random() * treatments.length)],
    lifestyle: {
      addiction: [addictions[Math.floor(Math.random() * addictions.length)]],
      physicalActivity: [activities[Math.floor(Math.random() * activities.length)]],
      travel: [{
        location: "Paris",
        frequency: "Annuel",
        duration: "1 semaine"
      }],
      pets: ["Chat"],
      mosquitoNet: Math.random() > 0.5,
      waterQuantity: "2L/jour"
    },
    personalData: {
      age: Math.floor(Math.random() * 50) + 20,
      sex: Math.random() > 0.5 ? "Homme" : "Femme",
      maritalStatus: ["Marié(e)", "Célibataire", "Divorcé(e)"][Math.floor(Math.random() * 3)],
      profession: ["Enseignant", "Ingénieur", "Commercial", "Médecin", "Retraité"][Math.floor(Math.random() * 5)],
      childrenCount: Math.floor(Math.random() * 4),
      bloodGroup: ["A+", "B+", "O+", "AB+"][Math.floor(Math.random() * 4)]
    },
    consultationReason: [
      "Contrôle de routine",
      "Douleurs chroniques",
      "Renouvellement ordonnance",
      "Symptômes aigus"
    ][Math.floor(Math.random() * 4)],
    additionalTests: [{
      name: "Prise de sang",
      result: "Normal",
      anatomy: "Bras"
    }],
    medicalHistory: {
      familyHistory: "Diabète dans la famille",
      allergies: [{
        manifestation: "Urticaire",
        trigger: "Arachides"
      }],
      diseases: [{
        name: "Grippe",
        startDate: "2023-12-01",
        endDate: "2023-12-15",
        observation: "Guérison complète",
        treatment: {
          duration: "2 semaines",
          posology: "Paracétamol 1g x3/j"
        }
      }],
      surgeries: [{
        name: "Appendicectomie",
        date: "2020-05-15"
      }],
      obstetricalHistory: undefined
    },
    symptoms: [{
      name: "Céphalées",
      location: "Frontal",
      startDate: "2024-01-01",
      frequency: "Hebdomadaire",
      duration: "2 heures",
      evolution: "Stable",
      triggeringActivity: "Stress",
      severity: Math.floor(Math.random() * 5) + 1
    }]
  }));
};

// Exemple d'utilisation
const cases = generateClinicalCases(5);
export default cases;