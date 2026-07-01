import { gvcPlatformApi } from '@/api/gvc-platform.api';
import type { AxiosError } from 'axios';

export interface ExportNovedadesCsvResponse {
  blob: Blob;
  filename: string;
}

const getFilenameFromContentDisposition = (contentDisposition?: string) => {
  if (!contentDisposition) {
    return 'novedades.csv';
  }

  const filenameMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i);
  const rawFilename = filenameMatch?.[1] ?? filenameMatch?.[2];

  if (!rawFilename) {
    return 'novedades.csv';
  }

  return decodeURIComponent(rawFilename);
};

export const exportNovedadesCsvAction = async (): Promise<ExportNovedadesCsvResponse> => {
  try {
    const response = await gvcPlatformApi.get('/novedad/export', {
      responseType: 'blob',
    });

    const contentDisposition = response.headers['content-disposition'] as string | undefined;

    return {
      blob: response.data as Blob,
      filename: getFilenameFromContentDisposition(contentDisposition),
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Error exporting novedades CSV', {
      cause: error,
    });
  }
};