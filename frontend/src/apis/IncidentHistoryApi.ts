import { axiosInstance } from '@/apis/axiosInstance';

export const getIncidentList = async ({
  category,
  startDate,
  endDate,
  location,
  police,
  order,
  page,
}: {
  category: string | null;
  startDate: string | null;
  endDate: string | null;
  location?: string | null;
  police?: string | null;
  order: string;
  page: number;
}) => {
  try {
    const response = await axiosInstance.get('api/v1/log', {
      params: {
        category,
        startDate,
        endDate,
        location,
        police,
        order,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error('사건 리스트 조회 실패', error);
  }
};
