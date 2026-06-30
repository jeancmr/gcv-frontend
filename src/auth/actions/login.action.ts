import { AxiosError } from 'axios';
import { gvcPlatformApi } from '@/api/gvc-platform.api';
import type { LoginResponse } from '../interfaces/login.response';

export const loginAction = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const { data } = await gvcPlatformApi.post<LoginResponse>('/auth/login', {
      email,
      contrasena: password,
    });

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Check auth failed', {
      cause: error,
    });
  }
};
