import { axiosInstance } from '@/apis/axiosInstance';

export const getOverview = async () => {
  try {
    const res = await axiosInstance.get('api/v1/stats/overview');
    return res.data;
  } catch (error) {
    console.log('overview 에러');
  }
};

export const getDataPerCategory = async (period: string) => {
  try {
    const res = await axiosInstance.get(`api/v1/stats/category?period=${period}`);
    return res.data;
  } catch (error) {
    console.log('카테고리별그래프 에러');
  }
};

export const getDataPerLocation = async (period: string) => {
  try {
    const res = await axiosInstance.get(`api/v1/stats/location?period=${period}`);
    return res.data;
  } catch (error) {
    console.log('장소별사건수 에러');
  }
};

export const getDataPerYearMonth = async (year: string, month: string | undefined, category: string) => {
  try {
    const baseUrl = `api/v1/stats/date?year=${year}&category=${category}`;
    const url = month ? `${baseUrl}&month=${month}` : baseUrl;
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (error) {
    console.log('일월별사건수 에러');
  }
};

export const getDataPerTime = async (category: string, date: string) => {
  try {
    // /api/v1/stats/hour?date={yyyy-MM-DD}&category={category}
    const res = await axiosInstance.get(`api/v1/stats/hour?date=${date}&category=${category}`);
    return res.data;
  } catch (error) {
    console.log('시간대별사건수 에러');
  }
};

export const getClusterData = async () => {
  try {
    const res = await axiosInstance.get(`api/v1/stats/map`);
    return res.data;
  } catch (error) {
    console.log('클러스터 에러');
  }
};
