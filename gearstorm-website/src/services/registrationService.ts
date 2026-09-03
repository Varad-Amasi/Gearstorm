import { API_ENDPOINTS } from '@/config/api';
import { apiClient, unwrap } from '@/services/apiClient';
import type { RegistrationPayload } from '@/schemas/registrationSchema';
import type { ApiResponse, PublicTeamDto } from '@/types/api';

export interface RegistrationResult {
  team: PublicTeamDto;
  emailQueued: boolean;
  message: string;
}

export const submitTeamRegistration = async (
  formData: RegistrationPayload
): Promise<RegistrationResult> => {
  const lead = formData.members[0];
  if (!lead) {
    throw new Error('Team lead is required');
  }

  const body = new FormData();
  body.append('teamName', formData.teamName);
  body.append('college', formData.college);
  body.append('contactEmail', lead.email);
  body.append('contactPhone', lead.phone);
  body.append('paymentUtr', formData.paymentUtr);
  body.append('members', JSON.stringify(formData.members));
  body.append('paymentProof', formData.paymentProof);

  const { data } = await apiClient.post<ApiResponse<RegistrationResult>>(
    API_ENDPOINTS.TEAMS,
    body,
    { timeout: 60_000 }
  );
  return unwrap(data);
};

export const fetchTeam = async (teamId: string): Promise<PublicTeamDto> => {
  const { data } = await apiClient.get<ApiResponse<PublicTeamDto>>(
    `${API_ENDPOINTS.TEAMS}/${teamId}`
  );
  return unwrap(data);
};
