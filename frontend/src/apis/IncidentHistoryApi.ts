import { axiosInstance } from '@/apis/axiosInstance';

export const getIncidentList = async (
  category: string | null,
  startDate: string | null,
  endDate: string | null,
  order: string,
  page: number,
) => {
  try {
    const response = await axiosInstance.get('api/v1/auth', {
      params: {
        category,
        startDate,
        endDate,
        order,
        page,
      },
    });
    console.log(response.data, "여기데이터<<<<");
    return response.data;
  } catch (error) {
    console.error('사건 리스트 조회 실패', error);
  }
};