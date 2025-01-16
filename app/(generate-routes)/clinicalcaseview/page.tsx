import React from 'react'
import ClinicalCaseView from './ClinicalCaseView '
import { generateClinicalCases } from './clinicalCasesGenerator';
const cases = generateClinicalCases(5);

const page = () => {
  return (
    <div>
        <ClinicalCaseView clinicalCase={cases[0]}/>
      
    </div>
  )
}

export default page
