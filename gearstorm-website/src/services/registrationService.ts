import { API_ENDPOINTS } from '@/config/api';
import { apiClient, unwrap } from '@/services/apiClient';
import type { RegistrationFormValues } from '@/schemas/registrationSchema';
import type { ApiResponse, PublicTeamDto } from '@/types/api';

export interface RegistrationResult {
  team: PublicTeamDto;
  emailQueued: boolean;
  message: string;
}

export const submitTeamRegistration = async (
  formData: RegistrationFormValues
): Promise<RegistrationResult> => {
  const { data } = await apiClient.post<ApiResponse<RegistrationResult>>(
    API_ENDPOINTS.TEAMS,
    formData
  );
  return unwrap(data);
};

export const fetchTeam = async (teamId: string): Promise<PublicTeamDto> => {
  const { data } = await apiClient.get<ApiResponse<PublicTeamDto>>(
    `${API_ENDPOINTS.TEAMS}/${teamId}`
  );
  return unwrap(data);
};
