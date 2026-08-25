import { API_ENDPOINTS } from '@/config/api';
import { APP_CONFIG } from '@/config/api';
import { apiClient, unwrap } from '@/services/apiClient';
import type { ApiResponse, GalleryImageDto } from '@/types/api';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

export interface GalleryUploadInput {
  file: File;
  alt: string;
  category: string;
  year: number;
  caption: string;
  adminKey: string;
}

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

export const uploadGalleryImage = async (
  input: GalleryUploadInput
): Promise<GalleryImageDto> => {
  if (!ALLOWED_TYPES.has(input.file.type)) {
    throw new Error('Only JPEG, PNG, WebP, or GIF images are allowed');
  }
  if (input.file.size > MAX_IMAGE_BYTES) {
    throw new Error('Image must be 5 MB or smaller');
  }
  if (input.alt.trim().length < 3 || input.caption.trim().length < 3) {
    throw new Error('Alt text and caption must be at least 3 characters');
  }
  if (input.year < 2020 || input.year > 2100) {
    throw new Error('Year must be between 2020 and 2100');
  }

  const body = new FormData();
  body.append('image', input.file);
  body.append('alt', input.alt.trim());
  body.append('category', input.category);
  body.append('year', String(input.year));
  body.append('caption', input.caption.trim());

  const { data } = await apiClient.post<ApiResponse<GalleryImageDto>>(
    API_ENDPOINTS.GALLERY,
    body,
    {
      headers: {
        'x-admin-key': input.adminKey,
      },
    }
  );
  return unwrap(data);
};
