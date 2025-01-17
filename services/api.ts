import axios from '../utils/axiosConfig';

export const fetchClinicalCases = async () => {
  const response = await axios.get('/clinical_cases');
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addClinicalCase = async (clinicalCase: any) => {
  const response = await axios.post('/clinical_cases', clinicalCase);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateClinicalCase = async (id: number, updatedData: any) => {
  const response = await axios.put(`/clinical_cases/${id}`, updatedData);
  return response.data;
};

export const deleteClinicalCase = async (id: number) => {
  const response = await axios.delete(`/clinical_cases/${id}`);
  return response.data;
};
