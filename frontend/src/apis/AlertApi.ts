import { axiosInstance } from '@/apis/axiosInstance';
import { AlertProps } from '@/types/alert';

export const getTotalIncidents = async (): Promise<AlertProps[]> => {
  try {
    const response = await axiosInstance.get('api/v1/case');
    console.log('전체 알림, 사건 리스트 : ', response.data);
    return response.data;
  } catch (error) {
    console.log('전체 알림, 사건 리스트 get 에러', error);
    return [];
  }
};

export const getVideo = async (id: number): Promise<{ video: string }> => {
  try {
    const response = await axiosInstance.get(`api/v1/case/${id}`);
    console.log('알림, 사건 video 보기 : ', response.data);
    return response.data;
  } catch (error) {
    console.log('알림, 사건 video get 에러', error);
    return { video: '' };
  }
};

export const putAlertState = async (id: number, state: string): Promise<Pick<AlertProps, 'id' | 'state'>> => {
  try {
    const response = await axiosInstance.put(`api/v1/case/ready/${id}`, { state });
    console.log('출동 or 미출동 : ', response.data);
    return response.data;
  } catch (error) {
    console.error('alert state put 에러:', error);
    throw error;
  }
};

export const putIncidentResolve = async (
  id: number,
  state: '미출동' | '출동',
  category: string | null,
): Promise<Pick<AlertProps, 'id' | 'state' | 'category'>> => {
  try {
    const response = await axiosInstance.put(`api/v1/case/complete/${id}`, { state, category });
    console.log('사건 해결 완료 : ', response.data);
    return response.data;
  } catch (error) {
    console.error('사건 해결 put 에러:', error);
    throw error;
  }
};
