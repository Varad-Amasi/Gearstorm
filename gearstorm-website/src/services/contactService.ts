import { API_ENDPOINTS } from '@/config/api';
import { apiClient, unwrap } from '@/services/apiClient';
import type { ContactFormValues } from '@/schemas/contactSchema';
import type { ApiResponse } from '@/types/api';

export interface ContactSubmitResult {
  id: string;
  message: string;
}

export const submitContactMessage = async (
  formData: ContactFormValues
): Promise<ContactSubmitResult> => {
  const { data } = await apiClient.post<ApiResponse<ContactSubmitResult>>(
    API_ENDPOINTS.CONTACT,
    formData
  );
  return unwrap(data);
};
