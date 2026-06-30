import axios from 'axios';
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
    if (axios.isAxiosError<{ message: string }>(error)) {
      throw new Error(error.response?.data?.message ?? 'Login failed', { cause: error });
    }

    throw error;
  }
};
