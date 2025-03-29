import { axiosInstance } from '@/apis/axiosInstance';
import { AlertProps } from '@/types/alert';

export const getTotalAlert = async (): Promise<AlertProps[]> => {
  try {
    const response = await axiosInstance.get('api/v1/case/ready');
    return response.data;
  } catch (error) {
    console.log('alert get 에러', error);
    return []; // promise로 객체 지정 -> catch 에러 발생 시에도 반환 값은 있어야 함
  }
};
