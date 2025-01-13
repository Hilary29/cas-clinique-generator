// pages/api/clinical-cases.ts

import { NextApiRequest, NextApiResponse } from 'next';

const clinicalCases = [
  {
    disease: 'COVID-19',
    location: 'Douala, Cameroun',
    startDate: '2023-05-01',
    endDate: '2023-05-10',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(clinicalCases);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
