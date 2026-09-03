import { API_ENDPOINTS } from '@/config/api';
import { APP_CONFIG } from '@/config/api';
import { apiClient, unwrap } from '@/services/apiClient';
import type { ApiResponse, GalleryImageDto } from '@/types/api';

/** Resolve a gallery URL that may be absolute or API-relative (`/uploads/...`). */
export const resolveMediaUrl = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/gallery/')) {
    return url;
  }

  const base = APP_CONFIG.apiBaseUrl.replace(/\/+$/, '');
  const apiRoot = base.replace(/\/api$/, '');
  const path = url.startsWith('/') ? url : `/${url}`;

  // Relative `/api` (Vite proxy) → keep `/uploads/...` relative for same-origin.
  if (!apiRoot || apiRoot === base) {
    return path;
  }

  return `${apiRoot}${path}`;
};

export const fetchGalleryImages = async (): Promise<GalleryImageDto[]> => {
  const { data } = await apiClient.get<ApiResponse<GalleryImageDto[]>>(
    API_ENDPOINTS.GALLERY
  );
  return unwrap(data);
};
