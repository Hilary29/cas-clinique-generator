// src/types/clinicalCase.ts

export enum Sex {
    Homme = "Homme",
    Femme = "Femme",
    Autre = "Autre"
  }
  
  export enum MaritalStatus {
    Celibataire = "Célibataire",
    Marie = "Marié",
    Divorce = "Divorcé",
    Veuf = "Veuf"
  }
  
  export enum BloodGroup {
    APositif = "A+",
    ANegatif = "A-",
    BPositif = "B+",
    BNegatif = "B-",
    ABPositif = "AB+",
    ABNegatif = "AB-",
    OPositif = "O+",
    ONegatif = "O-"
  }
  
  export enum Frequency {
    Quotidien = "Quotidien",
    Hebdomadaire = "Hebdomadaire",
    Mensuel = "Mensuel",
    Occasionnel = "Occasionnel"
  }
  
  export interface Addiction {
    name: string;
    frequency: Frequency;
    duration: string;
  }
  
  export interface PhysicalActivity {
    name: string;
    frequency: Frequency;
  }
  
  export interface Travel {
    location: string;
    frequency: Frequency;
    duration: string;
  }
  
  export interface Lifestyle {
    addiction: Addiction[];
    physicalActivity: PhysicalActivity[];
    travel: Travel[];
    pets: string[];
    mosquitoNet: boolean;
    waterQuantity: string;
  }
  
  export interface PersonalData {
    age: number;
    sex: Sex;
    maritalStatus: MaritalStatus;
    profession: string;
    childrenCount: number;
    bloodGroup: BloodGroup;
  }
  
  export interface AdditionalTest {
    name: string;
    result: string;
    anatomy: string;
  }
  
  export interface Treatment {
    duration: string;
    posology: string;
  }
  
  export interface Disease {
    name: string;
    startDate: string;
    endDate: string;
    observation: string;
    treatment: Treatment;
  }
  
  export interface Surgery {
    name: string;
    date: string;
  }
  
  export interface Allergy {
    manifestation: string;
    trigger: string;
  }
  
  export interface ObstetricalHistory {
    pregnancies: number;
    lastPregnancyDate: string;
  }
  
  export interface MedicalHistory {
    familyHistory: string;
    allergies: Allergy[];
    diseases: Disease[];
    surgeries: Surgery[];
    obstetricalHistory: ObstetricalHistory;
  }
  
  export interface Symptom {
    name: string;
    location: string;
    startDate: string;
    frequency: string;
    duration: string;
    evolution: string;
    triggeringActivity: string;
    severity: number;
  }
  
  export interface Diagnostic {
    name: string;
    result: string;
  }
  
  export interface ClinicalCase {
    id: string;
    diagnostic: Diagnostic;
    currentTreatment: string;
    lifestyle: Lifestyle;
    personalData: PersonalData;
    consultationReason: string;
    additionalTests: AdditionalTest[];
    medicalHistory: MedicalHistory;
    symptoms: Symptom[];
  }