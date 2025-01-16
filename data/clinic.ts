// data/clinic.ts

import { ClinicalCase, Sex, MaritalStatus, BloodGroup, Frequency } from '../types/ClinicalCase';

export const mockClinicalCases: ClinicalCase[] = [
    {
        id: "13e810e8-75aa-4aef-8e62-b6253cca2609",
        diagnostic: {
          name: "Hypertension artérielle",
          result: "150/90 mmHg"
        },
        currentTreatment: "Amlodipine 5mg par jour",
        lifestyle: {
          addiction: [
            {
              name: "Tabagisme",
              frequency: Frequency.Quotidien,
              duration: "10 ans"
            }
          ],
          physicalActivity: [
            {
              name: "Marche",
              frequency: Frequency.Hebdomadaire
            }
          ],
          travel: [
            {
              location: "Paris",
              frequency: Frequency.Mensuel,
              duration: "3 jours"
            }
          ],
          pets: ["Chien"],
          mosquitoNet: true,
          waterQuantity: "3L/jour"
        },
        personalData: {
          age: 45,
          sex: Sex.Homme,
          maritalStatus: MaritalStatus.Marie,
          profession: "Ingénieur",
          childrenCount: 2,
          bloodGroup: BloodGroup.OPositif
        },
        consultationReason: "Contrôle de routine",
        additionalTests: [
          {
            name: "Analyse sanguine",
            result: "Normal",
            anatomy: "Bras"
          }
        ],
        medicalHistory: {
          familyHistory: "Diabète",
          allergies: [
            {
              manifestation: "Éruption cutanée",
              trigger: "Arachides"
            }
          ],
          diseases: [
            {
              name: "Diabète",
              startDate: "2015-01-01",
              endDate: "2020-01-01",
              observation: "Bien contrôlé",
              treatment: {
                duration: "5 ans",
                posology: "Metformine 500mg"
              }
            }
          ],
          surgeries: [
            {
              name: "Appendicectomie",
              date: "2010-05-01"
            }
          ],
          obstetricalHistory: {
            pregnancies: 2,
            lastPregnancyDate: "2018-09-15"
          }
        },
        symptoms: [
          {
            name: "Maux de tête",
            location: "Front",
            startDate: "2024-01-01",
            frequency: "Occasionnel",
            duration: "2 heures",
            evolution: "Stable",
            triggeringActivity: "Stress",
            severity: 3
          }
        ]
      },
      {
        id: "24f920f9-86bb-5bf6-9f73-c7364ddb3720",
        diagnostic: {
          name: "Asthme allergique",
          result: "DEP 350 L/min"
        },
        currentTreatment: "Ventoline 100μg à la demande",
        lifestyle: {
          addiction: [],
          physicalActivity: [
            {
              name: "Natation",
              frequency: Frequency.Hebdomadaire
            }
          ],
          travel: [],
          pets: ["Chat"],
          mosquitoNet: false,
          waterQuantity: "2L/jour"
        },
        personalData: {
          age: 28,
          sex: Sex.Femme,
          maritalStatus: MaritalStatus.Celibataire,
          profession: "Professeure",
          childrenCount: 0,
          bloodGroup: BloodGroup.APositif
        },
        consultationReason: "Difficulté respiratoire",
        additionalTests: [
          {
            name: "Spirométrie",
            result: "Diminution capacité respiratoire",
            anatomy: "Poumons"
          }
        ],
        medicalHistory: {
          familyHistory: "Asthme maternel",
          allergies: [
            {
              manifestation: "Rhinite",
              trigger: "Pollen"
            }
          ],
          diseases: [
            {
              name: "Asthme",
              startDate: "2010-03-15",
              endDate: "",
              observation: "Exacerbations saisonnières",
              treatment: {
                duration: "En cours",
                posology: "Ventoline si besoin"
              }
            }
          ],
          surgeries: [],
          obstetricalHistory: {
            pregnancies: 0,
            lastPregnancyDate: ""
          }
        },
        symptoms: [
          {
            name: "Essoufflement",
            location: "Thorax",
            startDate: "2024-01-15",
            frequency: "Quotidien",
            duration: "30 minutes",
            evolution: "Aggravation",
            triggeringActivity: "Effort physique",
            severity: 4
          }
        ]
      },
      {
        id: "35g130h0-97cc-6cg7-0g84-d8475eec4831",
        diagnostic: {
          name: "Arthrose lombaire",
          result: "Stade 2"
        },
        currentTreatment: "Paracétamol 1g 3x/jour",
        lifestyle: {
          addiction: [
            {
              name: "Café",
              frequency: Frequency.Quotidien,
              duration: "20 ans"
            }
          ],
          physicalActivity: [
            {
              name: "Kinésithérapie",
              frequency: Frequency.Hebdomadaire
            }
          ],
          travel: [
            {
              location: "Marseille",
              frequency: Frequency.Mensuel,
              duration: "1 semaine"
            }
          ],
          pets: [],
          mosquitoNet: false,
          waterQuantity: "1.5L/jour"
        },
        personalData: {
          age: 65,
          sex: Sex.Femme,
          maritalStatus: MaritalStatus.Veuf,
          profession: "Retraitée",
          childrenCount: 3,
          bloodGroup: BloodGroup.BPositif
        },
        consultationReason: "Douleur lombaire chronique",
        additionalTests: [
          {
            name: "IRM lombaire",
            result: "Arthrose L4-L5",
            anatomy: "Colonne vertébrale"
          }
        ],
        medicalHistory: {
          familyHistory: "Arthrose",
          allergies: [],
          diseases: [
            {
              name: "Ostéoporose",
              startDate: "2018-06-01",
              endDate: "",
              observation: "Sous traitement",
              treatment: {
                duration: "En cours",
                posology: "Calcium 1000mg/jour"
              }
            }
          ],
          surgeries: [
            {
              name: "Prothèse de hanche",
              date: "2019-03-15"
            }
          ],
          obstetricalHistory: {
            pregnancies: 3,
            lastPregnancyDate: "1990-08-20"
          }
        },
        symptoms: [
          {
            name: "Lombalgie",
            location: "Bas du dos",
            startDate: "2023-12-01",
            frequency: "Permanent",
            duration: "Continue",
            evolution: "Stable",
            triggeringActivity: "Station debout prolongée",
            severity: 5
          }
        ]
      },
      {
        id: "46h240i1-08dd-7dh8-1h95-e9586ffd5942",
        diagnostic: {
          name: "Gastrite chronique",
          result: "H. pylori positif"
        },
        currentTreatment: "Oméprazole 20mg/jour",
        lifestyle: {
          addiction: [
            {
              name: "Alcool",
              frequency: Frequency.Hebdomadaire,
              duration: "5 ans"
            }
          ],
          physicalActivity: [
            {
              name: "Yoga",
              frequency: Frequency.Hebdomadaire
            }
          ],
          travel: [],
          pets: ["Poisson"],
          mosquitoNet: false,
          waterQuantity: "2L/jour"
        },
        personalData: {
          age: 35,
          sex: Sex.Homme,
          maritalStatus: MaritalStatus.Divorce,
          profession: "Commercial",
          childrenCount: 1,
          bloodGroup: BloodGroup.ABPositif
        },
        consultationReason: "Douleurs épigastriques",
        additionalTests: [
          {
            name: "Endoscopie",
            result: "Gastrite érosive",
            anatomy: "Estomac"
          }
        ],
        medicalHistory: {
          familyHistory: "Cancer gastrique",
          allergies: [
            {
              manifestation: "Urticaire",
              trigger: "Fruits de mer"
            }
          ],
          diseases: [
            {
              name: "Reflux gastro-œsophagien",
              startDate: "2020-09-01",
              endDate: "",
              observation: "Symptômes nocturnes",
              treatment: {
                duration: "En cours",
                posology: "Oméprazole 20mg"
              }
            }
          ],
          surgeries: [],
          obstetricalHistory: {
            pregnancies: 0,
            lastPregnancyDate: ""
          }
        },
        symptoms: [
          {
            name: "Brûlures d'estomac",
            location: "Épigastre",
            startDate: "2024-01-10",
            frequency: "Quotidien",
            duration: "1-2 heures",
            evolution: "Aggravation",
            triggeringActivity: "Repas épicés",
            severity: 4
          }
        ]
      },

      
      {
        id: "57i350j2-19ee-8ei9-2i06-f0697gge6053",
        diagnostic: {
          name: "Migraine avec aura",
          result: "Forme épisodique"
        },
        currentTreatment: "Sumatriptan 50mg si crise",
        lifestyle: {
          addiction: [],
          physicalActivity: [
            {
              name: "Vélo",
              frequency: Frequency.Hebdomadaire
            }
          ],
          travel: [
            {
              location: "Lyon",
              frequency: Frequency.Mensuel,
              duration: "2 jours"
            }
          ],
          pets: [],
          mosquitoNet: false,
          waterQuantity: "2.5L/jour"
        },
        personalData: {
          age: 32,
          sex: Sex.Femme,
          maritalStatus: MaritalStatus.Marie, // Adapté de "En couple" à "Marié" pour correspondre à l'enum
          profession: "Architecte",
          childrenCount: 1,
          bloodGroup: BloodGroup.ANegatif
        },
        consultationReason: "Migraines fréquentes",
        additionalTests: [
          {
            name: "IRM cérébrale",
            result: "Normal",
            anatomy: "Cerveau"
          }
        ],
        medicalHistory: {
          familyHistory: "Migraines",
          allergies: [
            {
              manifestation: "Rhinite",
              trigger: "Acariens"
            }
          ],
          diseases: [
            {
              name: "Migraine",
              startDate: "2016-04-01",
              endDate: "",
              observation: "Facteur déclenchant : stress",
              treatment: {
                duration: "En cours",
                posology: "Traitement de crise"
              }
            }
          ],
          surgeries: [
            {
              name: "Amygdalectomie",
              date: "2005-07-15"
            }
          ],
          obstetricalHistory: {
            pregnancies: 1,
            lastPregnancyDate: "2022-03-10"
          }
        },
        symptoms: [
          {
            name: "Migraine",
            location: "Hémicrâne droit",
            startDate: "2024-01-05",
            frequency: "Hebdomadaire",
            duration: "4-6 heures",
            evolution: "Stable",
            triggeringActivity: "Stress et fatigue",
            severity: 5
          }
        ]
      },
      {
        id: "13e810e8-75aa-4aef-8e62-b6253cca2609",
        diagnostic: {
          name: "Grossesse",
          result: "8 semaines d'aménorrhée"
        },
        currentTreatment: "Acide folique 0.4mg/jour",
        lifestyle: {
          addiction: [],
          physicalActivity: [
            {
              name: "Yoga prénatal",
              frequency: Frequency.Hebdomadaire
            }
          ],
          travel: [],
          pets: ["Chat"],
          mosquitoNet: false,
          waterQuantity: "2L/jour"
        },
        personalData: {
          age: 32,
          sex: Sex.Femme,
          maritalStatus: MaritalStatus.Marie,
          profession: "Enseignante",
          childrenCount: 1,
          bloodGroup: BloodGroup.APositif
        },
        consultationReason: "Suivi de grossesse",
        additionalTests: [
          {
            name: "Test de grossesse sanguin",
            result: "Positif",
            anatomy: "Sang"
          }
        ],
        medicalHistory: {
          familyHistory: "Hypertension maternelle",
          allergies: [],
          diseases: [],
          surgeries: [],
          obstetricalHistory: {
            pregnancies: 1,
            lastPregnancyDate: "2021-03-15"
          }
        },
        symptoms: [
          {
            name: "Nausées matinales",
            location: "Estomac",
            startDate: "2024-01-01",
            frequency: "Quotidien",
            duration: "2 heures",
            evolution: "Stable",
            triggeringActivity: "À jeun",
            severity: 2
          }
        ]
      },
      {
        id: "24f920f9-86bb-5bf6-9f73-c7364ddb3710",
        diagnostic: {
          name: "Diabète gestationnel",
          result: "Glycémie à jeun 1.26 g/L"
        },
        currentTreatment: "Régime diabétique + surveillance glycémique",
        lifestyle: {
          addiction: [],
          physicalActivity: [
            {
              name: "Marche",
              frequency: Frequency.Quotidien
            }
          ],
          travel: [],
          pets: [],
          mosquitoNet: false,
          waterQuantity: "2.5L/jour"
        },
        personalData: {
          age: 38,
          sex: Sex.Femme,
          maritalStatus: MaritalStatus.Marie,
          profession: "Comptable",
          childrenCount: 2,
          bloodGroup: BloodGroup.BPositif
        },
        consultationReason: "Suivi de grossesse à risque",
        additionalTests: [
          {
            name: "Test O'Sullivan",
            result: "Anormal",
            anatomy: "Sang"
          },
          {
            name: "HGPO",
            result: "Positif pour diabète gestationnel",
            anatomy: "Sang"
          }
        ],
        medicalHistory: {
          familyHistory: "Diabète type 2 familial",
          allergies: [],
          diseases: [
            {
              name: "Diabète gestationnel",
              startDate: "2020-01-15",
              endDate: "2020-09-15",
              observation: "Lors de la précédente grossesse",
              treatment: {
                duration: "8 mois",
                posology: "Régime seul"
              }
            }
          ],
          surgeries: [],
          obstetricalHistory: {
            pregnancies: 3,
            lastPregnancyDate: "2020-09-15"
          }
        },
        symptoms: [
          {
            name: "Soif excessive",
            location: "Général",
            startDate: "2024-01-15",
            frequency: "Permanent",
            duration: "Continue",
            evolution: "Progressive",
            triggeringActivity: "Aucune",
            severity: 2
          }
        ]
      },
      {
        id: "35g1030h-97cc-6cg7-0g84-d8475eec4821",
        diagnostic: {
          name: "Endométriose",
          result: "Stade III confirmé par IRM"
        },
        currentTreatment: "Dienogest 2mg/jour",
        lifestyle: {
          addiction: [],
          physicalActivity: [
            {
              name: "Natation",
              frequency: Frequency.Hebdomadaire
            }
          ],
          travel: [],
          pets: ["Chien"],
          mosquitoNet: false,
          waterQuantity: "1.5L/jour"
        },
        personalData: {
          age: 35,
          sex: Sex.Femme,
          maritalStatus: MaritalStatus.Divorce,
          profession: "Avocate",
          childrenCount: 1,
          bloodGroup: BloodGroup.ONegatif
        },
        consultationReason: "Douleurs pelviennes chroniques",
        additionalTests: [
          {
            name: "IRM pelvienne",
            result: "Endométriose stade III",
            anatomy: "Pelvis"
          }
        ],
        medicalHistory: {
          familyHistory: "Endométriose chez la mère",
          allergies: [
            {
              manifestation: "Urticaire",
              trigger: "Ibuprofène"
            }
          ],
          diseases: [
            {
              name: "Endométriose",
              startDate: "2019-06-01",
              endDate: "",
              observation: "En cours",
              treatment: {
                duration: "Continue",
                posology: "Dienogest 2mg/jour"
              }
            }
          ],
          surgeries: [
            {
              name: "Cœlioscopie exploratrice",
              date: "2019-06-15"
            }
          ],
          obstetricalHistory: {
            pregnancies: 1,
            lastPregnancyDate: "2017-11-20"
          }
        },
        symptoms: [
          {
            name: "Douleurs pelviennes",
            location: "Pelvis",
            startDate: "2024-01-01",
            frequency: "Cyclique",
            duration: "5-7 jours",
            evolution: "Stable sous traitement",
            triggeringActivity: "Menstruations",
            severity: 4
          }
        ]
      },
      {
        id: "35g032g0-97cc-6cg7-0g84-d8475eec2821",
        diagnostic: {
          name: "Migraine sans aura",
          result: "Céphalées épisodiques"
        },
        currentTreatment: "Paracétamol 1000mg",
        lifestyle: {
          addiction: [
            {
              name: "Café",
              frequency: Frequency.Quotidien,
              duration: "5 ans"
            }
          ],
          physicalActivity: [
            {
              name: "Yoga",
              frequency: Frequency.Hebdomadaire
            }
          ],
          travel: [
            {
              location: "Paris",
              frequency: Frequency.Mensuel,
              duration: "1 jour"
            }
          ],
          pets: [],
          mosquitoNet: false,
          waterQuantity: "2.5L/jour"
        },
        personalData: {
          age: 31,
          sex: Sex.Femme,
          maritalStatus: MaritalStatus.Marie, // Adaptation de "En couple"
          profession: "Enseignante",
          childrenCount: 0,
          bloodGroup: BloodGroup.ONegatif
        },
        consultationReason: "Migraines fréquentes",
        additionalTests: [
          {
            name: "Examen neurologique",
            result: "Normal",
            anatomy: "Tête"
          }
        ],
        medicalHistory: {
          familyHistory: "Migraines",
          allergies: [],
          diseases: [],
          surgeries: [],
          obstetricalHistory: {
            pregnancies: 0,
            lastPregnancyDate: ""
          }
        },
        symptoms: [
          {
            name: "Migraine",
            location: "Hémicrâne droit",
            startDate: "2024-01-10",
            frequency: "Hebdomadaire",
            duration: "4-6 heures",
            evolution: "Variable",
            triggeringActivity: "Stress et fatigue",
            severity: 4
          }
        ]
      },
      {
        id: "46h143h1-08dd-7dh8-1h95-e9586ffd3932",
        diagnostic: {
          name: "Gastrite légère",
          result: "Inflammation gastrique superficielle"
        },
        currentTreatment: "Oméprazole 20mg",
        lifestyle: {
          addiction: [],
          physicalActivity: [
            {
              name: "Marche",
              frequency: Frequency.Hebdomadaire
            }
          ],
          travel: [
            {
              location: "Lyon",
              frequency: Frequency.Occasionnel, // Adapté de "Semestriel"
              duration: "3 jours"
            }
          ],
          pets: ["Hamster"],
          mosquitoNet: false,
          waterQuantity: "1L/jour"
        },
        personalData: {
          age: 42,
          sex: Sex.Homme,
          maritalStatus: MaritalStatus.Divorce,
          profession: "Commercial",
          childrenCount: 2,
          bloodGroup: BloodGroup.ANegatif
        },
        consultationReason: "Douleurs épigastriques",
        additionalTests: [
          {
            name: "Endoscopie digestive",
            result: "Gastrite légère",
            anatomy: "Estomac"
          }
        ],
        medicalHistory: {
          familyHistory: "RAS",
          allergies: [],
          diseases: [],
          surgeries: [],
          obstetricalHistory: {
            pregnancies: 0,
            lastPregnancyDate: ""
          }
        },
        symptoms: [
          {
            name: "Douleur épigastrique",
            location: "Estomac",
            startDate: "2024-02-01",
            frequency: "Après les repas",
            duration: "1 heure",
            evolution: "En amélioration",
            triggeringActivity: "Repas copieux",
            severity: 2
          }
        ]
      },
      {
        id: "57i254i2-19ee-8ei9-2i06-f0697gge4043",
        diagnostic: {
          name: "Tendinite du coude",
          result: "Épicondylite latérale"
        },
        currentTreatment: "Diclofénac gel",
        lifestyle: {
          addiction: [],
          physicalActivity: [
            {
              name: "Tennis",
              frequency: Frequency.Hebdomadaire
            }
          ],
          travel: [],
          pets: ["Tortue"],
          mosquitoNet: false,
          waterQuantity: "1.8L/jour"
        },
        personalData: {
          age: 38,
          sex: Sex.Femme,
          maritalStatus: MaritalStatus.Marie,
          profession: "Architecte",
          childrenCount: 1,
          bloodGroup: BloodGroup.ABPositif
        },
        consultationReason: "Douleur au coude",
        additionalTests: [
          {
            name: "Échographie",
            result: "Inflammation tendineuse",
            anatomy: "Coude droit"
          }
        ],
        medicalHistory: {
          familyHistory: "RAS",
          allergies: [
            {
              manifestation: "Urticaire",
              trigger: "Aspirine"
            }
          ],
          diseases: [],
          surgeries: [],
          obstetricalHistory: {
            pregnancies: 1,
            lastPregnancyDate: "2022-06-15"
          }
        },
        symptoms: [
          {
            name: "Douleur coude",
            location: "Coude droit",
            startDate: "2024-03-05",
            frequency: "Pendant l'activité",
            duration: "Variable",
            evolution: "Stable",
            triggeringActivity: "Mouvements répétitifs",
            severity: 3
          }
        ]
      },
      {
        id: "13e810e8-75aa-4aef-8e62-b6253cca2609",
        diagnostic: {
          name: "Bronchiolite aiguë",
          result: "Saturation en oxygène: 95%"
        },
        currentTreatment: "Sérum physiologique nasal + Kinésithérapie respiratoire",
        lifestyle: {
          addiction: [],
          physicalActivity: [
            {
              name: "Jeux en extérieur",
              frequency: Frequency.Hebdomadaire
            }
          ],
          travel: [
            {
              location: "Paris",
              frequency: Frequency.Occasionnel, // Adapté de "Récent"
              duration: "1 semaine"
            }
          ],
          pets: ["Chat"],
          mosquitoNet: false,
          waterQuantity: "500ml/jour"
        },
        personalData: {
          age: 8,
          sex: Sex.Homme,
          maritalStatus: MaritalStatus.Celibataire,
          profession: "Écolier",
          childrenCount: 0,
          bloodGroup: BloodGroup.APositif
        },
        consultationReason: "Toux et difficultés respiratoires",
        additionalTests: [
          {
            name: "Radiographie thoracique",
            result: "Infiltrats bronchiques",
            anatomy: "Thorax"
          }
        ],
        medicalHistory: {
          familyHistory: "Asthme (père)",
          allergies: [
            {
              manifestation: "Rhinite",
              trigger: "Acariens"
            }
          ],
          diseases: [
            {
              name: "Otite moyenne aiguë",
              startDate: "2023-09-15",
              endDate: "2023-09-30",
              observation: "Bien résolu sous antibiotiques",
              treatment: {
                duration: "10 jours",
                posology: "Amoxicilline 500mg"
              }
            }
          ],
          surgeries: [],
          obstetricalHistory: {
            pregnancies: 0,
            lastPregnancyDate: ""
          }
        },
        symptoms: [
          {
            name: "Toux",
            location: "Thorax",
            startDate: "2024-01-10",
            frequency: "Continue",
            duration: "5 jours",
            evolution: "Aggravation progressive",
            triggeringActivity: "Effort",
            severity: 4
          },
          {
            name: "Fièvre",
            location: "Générale",
            startDate: "2024-01-12",
            frequency: "Intermittente",
            duration: "3 jours",
            evolution: "Stable",
            triggeringActivity: "Aucune",
            severity: 3
          }
        ]
      },
      {
        id: "24f920f9-86bb-5bf6-9f73-c7364ddb1710",
        diagnostic: {
          name: "Gastro-entérite aiguë",
          result: "Déshydratation légère"
        },
        currentTreatment: "Solution de réhydratation orale",
        lifestyle: {
          addiction: [],
          physicalActivity: [
            {
              name: "Natation",
              frequency: Frequency.Hebdomadaire
            }
          ],
          travel: [],
          pets: [],
          mosquitoNet: false,
          waterQuantity: "Diminuée"
        },
        personalData: {
          age: 4,
          sex: Sex.Femme,
          maritalStatus: MaritalStatus.Celibataire,
          profession: "Maternelle",
          childrenCount: 0,
          bloodGroup: BloodGroup.ONegatif
        },
        consultationReason: "Diarrhées et vomissements",
        additionalTests: [
          {
            name: "Bandelette urinaire",
            result: "Corps cétoniques +",
            anatomy: "Urine"
          }
        ],
        medicalHistory: {
          familyHistory: "RAS",
          allergies: [],
          diseases: [
            {
              name: "Varicelle",
              startDate: "2023-05-01",
              endDate: "2023-05-15",
              observation: "Évolution favorable",
              treatment: {
                duration: "15 jours",
                posology: "Traitement symptomatique"
              }
            }
          ],
          surgeries: [],
          obstetricalHistory: {
            pregnancies: 0,
            lastPregnancyDate: ""
          }
        },
        symptoms: [
          {
            name: "Diarrhée",
            location: "Abdomen",
            startDate: "2024-01-14",
            frequency: "6 fois par jour",
            duration: "2 jours",
            evolution: "Stable",
            triggeringActivity: "Alimentation",
            severity: 3
          },
          {
            name: "Vomissements",
            location: "Estomac",
            startDate: "2024-01-14",
            frequency: "3 fois par jour",
            duration: "2 jours",
            evolution: "Amélioration",
            triggeringActivity: "Alimentation",
            severity: 2
          }
        ]
      },
  {
    id: "35g1030h-97cc-6cg7-0g84-d8475eec2821",
    diagnostic: {
      name: "Dermatite atopique",
      result: "SCORAD: 35/103"
    },
    currentTreatment: "Dermocorticoïdes + Émollients",
    lifestyle: {
      addiction: [],
      physicalActivity: [
        {
          name: "Danse",
          frequency: Frequency.Occasionnel
        }
      ],
      travel: [],
      pets: ["Poisson"],
      mosquitoNet: false,
      waterQuantity: "1L/jour"
    },
    personalData: {
      age: 6,
      sex: Sex.Femme,
      maritalStatus: MaritalStatus.Celibataire,
      profession: "Écolière",
      childrenCount: 0,
      bloodGroup: BloodGroup.BNegatif
    },
    consultationReason: "Poussée eczéma",
    additionalTests: [
      {
        name: "Tests allergiques cutanés",
        result: "Positif aux acariens",
        anatomy: "Peau"
      }
    ],
    medicalHistory: {
      familyHistory: "Eczéma (mère)",
      allergies: [
        {
          manifestation: "Eczéma",
          trigger: "Acariens"
        },
        {
          manifestation: "Urticaire",
          trigger: "Œufs"
        }
      ],
      diseases: [
        {
          name: "Asthme",
          startDate: "2022-01-01",
          endDate: "",
          observation: "Sous contrôle",
          treatment: {
            duration: "Continue",
            posology: "Ventoline si besoin"
          }
        }
      ],
      surgeries: [],
      obstetricalHistory: {
        pregnancies: 0,
        lastPregnancyDate: ""
      }
    },
    symptoms: [
      {
        name: "Prurit",
        location: "Plis coudes et genoux",
        startDate: "2024-01-08",
        frequency: "Quotidien",
        duration: "1 semaine",
        evolution: "Aggravation",
        triggeringActivity: "Stress et chaleur",
        severity: 4
      }
    ]
  },
  {
    id: "46h1141i-08dd-7dh8-1h95-e9586ffd3932",
    diagnostic: {
      name: "Angine streptococcique",
      result: "TDR Streptocoque A positif"
    },
    currentTreatment: "Amoxicilline 1g/jour",
    lifestyle: {
      addiction: [],
      physicalActivity: [
        {
          name: "Football",
          frequency: Frequency.Quotidien
        }
      ],
      travel: [],
      pets: ["Chien"],
      mosquitoNet: false,
      waterQuantity: "1.5L/jour"
    },
    personalData: {
      age: 10,
      sex: Sex.Homme,
      maritalStatus: MaritalStatus.Celibataire,
      profession: "Écolier",
      childrenCount: 0,
      bloodGroup: BloodGroup.OPositif
    },
    consultationReason: "Mal de gorge intense",
    additionalTests: [
      {
        name: "Test de diagnostic rapide",
        result: "Positif",
        anatomy: "Gorge"
      }
    ],
    medicalHistory: {
      familyHistory: "RAS",
      allergies: [],
      diseases: [
        {
          name: "Angines à répétition",
          startDate: "2023-01-01",
          endDate: "",
          observation: "3 épisodes en 2023",
          treatment: {
            duration: "Variable",
            posology: "Selon épisodes"
          }
        }
      ],
      surgeries: [],
      obstetricalHistory: {
        pregnancies: 0,
        lastPregnancyDate: ""
      }
    },
    symptoms: [
      {
        name: "Odynophagie",
        location: "Gorge",
        startDate: "2024-01-13",
        frequency: "Continue",
        duration: "2 jours",
        evolution: "Stable",
        triggeringActivity: "Déglutition",
        severity: 4
      },
      {
        name: "Fièvre",
        location: "Générale",
        startDate: "2024-01-13",
        frequency: "Continue",
        duration: "2 jours",
        evolution: "Stable",
        triggeringActivity: "Aucune",
        severity: 3
      }
    ]
  },
  {
    id: "57i1252j-19ee-8ei9-2i06-f0697gge4043",
    diagnostic: {
      name: "Diabète type 1",
      result: "Glycémie: 3.5 g/L"
    },
    currentTreatment: "Insuline Lantus + Novorapid",
    lifestyle: {
      addiction: [],
      physicalActivity: [
        {
          name: "Basket",
          frequency: Frequency.Mensuel
        }
      ],
      travel: [],
      pets: [],
      mosquitoNet: false,
      waterQuantity: "2L/jour"
    },
    personalData: {
      age: 12,
      sex: Sex.Femme,
      maritalStatus: MaritalStatus.Celibataire,
      profession: "Collégienne",
      childrenCount: 0,
      bloodGroup: BloodGroup.ABNegatif
    },
    consultationReason: "Suivi diabète",
    additionalTests: [
      {
        name: "HbA1c",
        result: "8.5%",
        anatomy: "Sang"
      },
      {
        name: "Glycémie à jeun",
        result: "1.8 g/L",
        anatomy: "Sang"
      }
    ],
    medicalHistory: {
      familyHistory: "Diabète type 2 (grand-mère)",
      allergies: [],
      diseases: [
        {
          name: "Diabète type 1",
          startDate: "2022-06-15",
          endDate: "",
          observation: "Équilibre moyen",
          treatment: {
            duration: "Continue",
            posology: "Lantus 20U matin, Novorapid selon glycémie"
          }
        }
      ],
      surgeries: [],
      obstetricalHistory: {
        pregnancies: 0,
        lastPregnancyDate: ""
      }
    },
    symptoms: [
      {
        name: "Hypoglycémie",
        location: "Générale",
        startDate: "2024-01-15",
        frequency: "2 fois cette semaine",
        duration: "15-20 minutes",
        evolution: "Résolution après resucrage",
        triggeringActivity: "Sport",
        severity: 3
      }
    ]
  }
];