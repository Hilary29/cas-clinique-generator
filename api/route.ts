import { NextRequest, NextResponse } from 'next/server'
import { ClinicalCase } from '@/types/clinicalCase'
import { mockClinicalCases } from '@/data/clinic'
import * as csv from 'csv-stringify/sync'
import * as XLSX from 'xlsx'
import { create } from 'xmlbuilder2'
import JSZip from 'jszip'

export async function POST(req: NextRequest) {
  const formData = await req.json()

  // Here, you would typically use the formData to generate or filter clinical cases
  // For this example, we'll just use the mockClinicalCases

  const cases: ClinicalCase[] = mockClinicalCases

  // Generate CSV
  const csvData = csv.stringify(cases, { header: true })

  // Generate JSON
  const jsonData = JSON.stringify(cases, null, 2)

  // Generate XML
  const xmlData = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('clinical-cases')
    .ele(cases)
    .end({ prettyPrint: true })

  // Generate XLSX
  const worksheet = XLSX.utils.json_to_sheet(cases)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Clinical Cases')
  const xlsxData = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

  // Create a zip file containing all formats
  const zip = new JSZip()
  zip.file('clinical_cases.csv', csvData)
  zip.file('clinical_cases.json', jsonData)
  zip.file('clinical_cases.xml', xmlData)
  zip.file('clinical_cases.xlsx', xlsxData)

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })

  return new NextResponse(zipBuffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename=clinical_cases.zip',
    },
  })
}

