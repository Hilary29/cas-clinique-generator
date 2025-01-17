'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Sex, MaritalStatus, BloodGroup, Frequency } from "../../../types/ClinicalCase"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

const formSchema = z.object({
  // Diagnostic
  diagnosticName: z.string().optional(),
  
  // Personal Data Filters
  ageRange: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }),
  sex: z.nativeEnum(Sex).optional(),
  maritalStatus: z.nativeEnum(MaritalStatus).optional(),
  bloodGroup: z.nativeEnum(BloodGroup).optional(),
  
  // Lifestyle Filters
  hasAddiction: z.boolean().default(false),
  addictionFrequency: z.nativeEnum(Frequency).optional(),
  hasPhysicalActivity: z.boolean().default(false),
  physicalActivityFrequency: z.nativeEnum(Frequency).optional(),
  hasTravel: z.boolean().default(false),
  travelFrequency: z.nativeEnum(Frequency).optional(),
  hasPets: z.boolean().default(false),
  
  // Medical History Filters
  hasSurgery: z.boolean().default(false),
  hasAllergy: z.boolean().default(false),
  hasDisease: z.boolean().default(false),
  diseaseName: z.string().optional(),
  familyHistory: z.string().optional(),
  hasObstetricalHistory: z.boolean().default(false),
  
  // Symptoms
  symptomName: z.string().optional(),
  symptomSeverity: z.number().optional(),
  
  // Additional Tests
  hasAdditionalTests: z.boolean().default(false),
})

export function ClinicalCaseForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diagnosticName: "",
      ageRange: { min: undefined, max: undefined },
      hasAddiction: false,
      hasPhysicalActivity: false,
      hasTravel: false,
      hasPets: false,
      hasSurgery: false,
      hasAllergy: false,
      hasDisease: false,
      diseaseName: "",
      hasObstetricalHistory: false,
      hasAdditionalTests: false,
      symptomName: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/filter-cases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
    
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to filter cases')
      }
    
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'filtered-clinical-cases.zip'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    } catch (error) {
      console.error('Error filtering cases:', error)
      // You might want to add a toast or alert here to show the error to the user
      alert(error instanceof Error ? error.message : 'Une erreur est survenue')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Diagnostic Section */}
          <FormField
            control={form.control}
            name="diagnosticName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diagnostic</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du diagnostic" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Personal Data Section */}
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexe</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le sexe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(Sex).map((sex) => (
                      <SelectItem key={sex} value={sex}>
                        {sex}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>État civil</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner l'état civil" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(MaritalStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bloodGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Groupe sanguin</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le groupe sanguin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(BloodGroup).map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Lifestyle Section */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="hasAddiction"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Présence d&apos;addiction</FormLabel>
                </FormItem>
              )}
            />

            {form.watch("hasAddiction") && (
              <FormField
                control={form.control}
                name="addictionFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fréquence de l&apos;addiction</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner la fréquence" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Frequency).map((freq) => (
                          <SelectItem key={freq} value={freq}>
                            {freq}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Medical History Section */}
          <FormField
            control={form.control}
            name="hasDisease"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Présence de maladie</FormLabel>
              </FormItem>
            )}
          />

          {form.watch("hasDisease") && (
            <FormField
              control={form.control}
              name="diseaseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la maladie</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez le nom de la maladie" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          {/* Symptoms Section */}
          <FormField
            control={form.control}
            name="symptomName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symptôme</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du symptôme" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="symptomSeverity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sévérité du symptôme (1-10)</FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[field.value || 1]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">Générer les cas cliniques filtrés</Button>
      </form>
    </Form>
  )
}

