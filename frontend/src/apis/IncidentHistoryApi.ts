import { axiosInstance } from '@/apis/axiosInstance';
import { GetIncidentListParams } from '@/types/incident';

export const getIncidentList = async ({
  category,
  startDate,
  endDate,
  address,
  police,
  order,
  page,
}: GetIncidentListParams) => {
  try {
    const response = await axiosInstance.get('api/v1/log', {
      params: {
        category,
        startDate,
        endDate,
        address,
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

export const getIncidentInfo = async (id: number) => {
  try {
    const response = await axiosInstance.get(`api/v1/log/${id}`);
    return response.data;
  } catch (error) {
    console.error('사건 정보 조회 실패', error);
  }
};

export const putMemo = async (id: number, memo: string) => {
  try {
    const response = await axiosInstance.put(`api/v1/log/${id}`, {
      memo,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('메모 업데이트 실패', error);
  }
};
