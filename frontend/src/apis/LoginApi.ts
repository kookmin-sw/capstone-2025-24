import { axiosInstance } from '@/apis/axiosInstance';

export const getLogin = async (userId: string, password: string) => {
  try {
    const response = await axiosInstance.post('api/v1/auth', {
      userId,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('로그인 에러:', error);
  }
};
