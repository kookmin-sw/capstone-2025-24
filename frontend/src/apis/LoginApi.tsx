import { axiosInstance } from '@/apis/axiosInstance';

export const getLogin = async (userId: string, password: string) => {
  try {
    const response = await axiosInstance.post('api/v1/auth', {
      userId,
      password,
    });
    console.log('로그인 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('로그인 에러:', error);
  }
};
