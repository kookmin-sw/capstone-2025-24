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
  startDate: string | null | Date;
  endDate: string | null | Date;
  location?: string | null;
  police?: string | null;
  order: string;
  page: number;
}) => {
  try {
    const response = await axiosInstance.get('api/v1/auth', {
      params: {
        category,
        startDate: startDate,
        endDate: endDate,
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
