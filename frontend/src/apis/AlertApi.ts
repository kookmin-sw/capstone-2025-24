import { axiosInstance } from '@/apis/axiosInstance';
import { AlertProps } from '@/types/alert';

export const getTotalAlert = async (): Promise<AlertProps[]> => {
  try {
    const response = await axiosInstance.get('api/v1/case/ready', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log('alert get 에러', error);
    return []; // promise로 객체 지정 -> catch 에러 발생 시에도 반환 값은 있어야 함
  }
};

export const getVideo = async (id: number): Promise<{ video: string }> => {
  try {
    const response = await axiosInstance.get(`api/v1/case/ready/${id}`);
    return response.data;
  } catch (error) {
    console.log('alert video get 에러', error);
    return { video: '' };
  }
};

export const putAlertState = async (id: number, state: string): Promise<Pick<AlertProps, 'id' | 'state'>> => {
  try {
    const response = await axiosInstance.put(`/api/v1/case/ready/${id}`, { state });
    return response.data;
  } catch (error) {
    console.error('Error updating alert state:', error);
    throw error;
  }
};
