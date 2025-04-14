import { axiosInstance } from '@/apis/axiosInstance';

export const getCctvInfo = async () => {
  try {
    const response = await axiosInstance.get(`api/v1/cctv`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('사건 정보 조회 실패', error);
  }
};