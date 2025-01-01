"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Header } from "@/components/Header";

const clinicalCaseSchema = z
  .object({
    startDate: z.date({ required_error: "La date de début est obligatoire." }),
    endDate: z.date({ required_error: "La date de fin est obligatoire." }),
    disease: z.string().optional(),
    location: z.string().optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message:
      "La date de fin doit être postérieure ou égale à la date de début.",
    path: ["endDate"],
  });

type ClinicalCaseFormData = z.infer<typeof clinicalCaseSchema>;

export default function ClinicalCaseForm() {
  const router = useRouter(); // Utilisation de useRouter pour la redirection

  const form = useForm<ClinicalCaseFormData>({
    resolver: zodResolver(clinicalCaseSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      disease: "",
      location: "",
    },
  });

  async function onSubmit(values: ClinicalCaseFormData) {
    try {
      const response = await axios.post("/api/clinical-cases", values);
      console.log("Résultats trouvés :", response.data);

      // Redirection vers /results avec les données
      router.push("/results");
    } catch (error) {
      console.error("Erreur lors de l’envoi :", error);
    }
  }

  return (
    <div>
      <Header />
      <section className="flex flex-col items-start w-full h-[824px] bg-gradient-to-br from-white-50 to-accent-100 px-4 sm:px-6 md:px-8 lg:px-28">
        <div className="flex flex-col w-full justify-center gap-8 sm:gap-12 md:gap-14 lg:gap-8 mx-auto">
          <div className="flex flex-col gap-2 text-center">
            <section className="w-full pt-32 px-4 sm:px-6 md:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10 sm:mb-16">
                  <p className="inline-block px-3 py-1 mb-3 text-sm font-semibold text-accent-600">
                    FORMULAIRE
                  </p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-semibold font-satoshi text-black-100 mb-4">
                    Entrez les caractéristiques de cas cliniques
                  </p>
                </div>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 bg-white-50 min-w-[300px] p-4 rounded-md shadow-6dp-v2 mx-24"
                >
                  <div className="space-y-8">
                    <div className="flex flex-row gap-4 justify-between">
                      <p className="font-semibold my-auto">Période</p>
                      <div>
                        <label htmlFor="startDate">Du </label>
                        <input
                          type="date"
                          id="startDate"
                          {...form.register("startDate", { valueAsDate: true })}
                          className="border p-2"
                        />
                        <p>{form.formState.errors.startDate?.message}</p>
                      </div>
                      <div>
                        <label htmlFor="endDate">Au </label>
                        <input
                          type="date"
                          id="endDate"
                          {...form.register("endDate", { valueAsDate: true })}
                          className="border p-2"
                        />
                        <p>{form.formState.errors.endDate?.message}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-row gap-4 justify-between">
                        <label
                          htmlFor="disease"
                          className="font-semibold my-auto"
                        >
                          Maladie
                        </label>
                        <input
                          id="disease"
                          {...form.register("disease")}
                          placeholder="Grippe"
                          className="border p-2"
                        />
                      </div>
                      <p>{form.formState.errors.disease?.message}</p>
                    </div>
                    <div>
                      <div className="flex flex-row justify-between">
                        <label
                          htmlFor="location"
                          className="font-semibold my-auto"
                        >
                          Localisation
                        </label>
                        <input
                          id="location"
                          {...form.register("location")}
                          placeholder="Yaoundé"
                          className="border p-2"
                        />
                      </div>
                      <p>{form.formState.errors.location?.message}</p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-300 font-inter font-semibold text-white-50 rounded-md px-3 py-2 transition duration-200"
                  >
                    Rechercher
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
