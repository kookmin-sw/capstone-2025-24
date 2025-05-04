import { axiosInstance } from '@/apis/axiosInstance';
import { ProfileType, FailType } from '@/types/profile';

export const postLogin = async (userId: string, password: string): Promise<ProfileType | FailType | undefined>=> {
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