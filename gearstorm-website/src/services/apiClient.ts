import axios, { AxiosError, isAxiosError } from 'axios';
import { APP_CONFIG } from '@/config/api';
import type { ApiFailure, ApiSuccess } from '@/types/api';

export const apiClient = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

export class ApiError extends Error {
  status?: number;
  details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

const formatValidationDetails = (details: unknown): string | null => {
  if (!details || typeof details !== 'object') {
    return null;
  }

  const record = details as {
    fieldErrors?: Record<string, string[] | undefined>;
    formErrors?: string[];
  };

  const fieldMessages = Object.entries(record.fieldErrors ?? {})
    .flatMap(([field, messages]) =>
      (messages ?? []).map((message) => `${field}: ${message}`)
    )
    .slice(0, 4);

  const formMessages = (record.formErrors ?? []).slice(0, 2);
  const combined = [...fieldMessages, ...formMessages];
  return combined.length > 0 ? combined.join('; ') : null;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    const detailText = formatValidationDetails(error.details);
    if (detailText) {
      return `${error.message}: ${detailText}`;
    }
    return error.message;
  }
  if (isAxiosError(error)) {
    const data = error.response?.data as ApiFailure | undefined;
    if (data?.error) {
      const detailText = formatValidationDetails(data.details);
      return detailText ? `${data.error}: ${detailText}` : data.error;
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong';
};

export const unwrap = <T>(payload: ApiSuccess<T> | ApiFailure): T => {
  if (!payload.success) {
    throw new ApiError(payload.error, undefined, payload.details);
  }
  return payload.data;
};

apiClient.interceptors.request.use((config) => {
  // Let the browser set multipart boundaries; a bare multipart header breaks Multer.
  if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
    if (config.headers) {
      delete config.headers['Content-Type'];
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiFailure>) => {
    const message =
      error.response?.data?.error ?? error.message ?? 'Request failed';
    return Promise.reject(
      new ApiError(
        message,
        error.response?.status,
        error.response?.data?.details
      )
    );
  }
);
