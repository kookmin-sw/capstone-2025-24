import { axiosInstance } from '@/apis/axiosInstance';

export const getOverview = async () => {
  try {
    const res = await axiosInstance.get('api/v1/stats/overview');
    return res.data;
  } catch (error) {
    console.error('overview 에러', error);
  }
};

// 유형 별 사건수
export const getDataPerCategory = async (period: string) => {
  try {
    const res = await axiosInstance.get(`api/v1/stats/category?period=${period}`);
    return res.data;
  } catch (error) {
    console.error('유형별 사건수 에러', error);
  }
};

// 장소별 사건 수
export const getDataPerLocation = async (period: string) => {
  try {
    const res = await axiosInstance.get(`api/v1/stats/location?period=${period}`);
    return res.data;
  } catch (error) {
    console.error('장소 별 사건수 에러', error);
  }
};

// 일월별 사건 수
export const getDataPerYearMonth = async (year: string, month: string | undefined, category: string | undefined) => {
  try {
    const baseUrl = `api/v1/stats/date?year=${year}`;
    const baseCate = category ? `${baseUrl}&category=${category}` : baseUrl;
    const finalUrl = month ? `${baseCate}&month=${month}` : baseCate;
    const res = await axiosInstance.get(finalUrl);
    return res.data;
  } catch (error) {
    console.error('일월 별 사건수 에러', error);
  }
};

export const getDataPerTime = async (category: string | undefined, date: string) => {
  try {
    const baseUrl = `api/v1/stats/hour?date=${date}`;
    const url = category ? `${baseUrl}&category=${category}` : baseUrl;
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (error) {
    console.error('시간대 별 사건수 에러', error);
  }
};

export const getClusterData = async () => {
  try {
    const res = await axiosInstance.get(`api/v1/stats/map`);
    return res.data;
  } catch (error) {
    console.error('클러스터 에러', error);
  }
};
