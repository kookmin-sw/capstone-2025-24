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

// 일월별 사건 수
export const getDataPerYearMonth = async (year: string | undefined, month: string | undefined, category: string | undefined) => {
  try {
    const baseUrl = year || month || category ? `api/v1/stats/date?` : `api/v1/stats/date`;
    const baseCate = category ? `${baseUrl}category=${category}` : baseUrl;
    const baseYear = year ? `${baseCate}&year=${year}` : baseCate;
    const finalUrl = month ? `${baseYear}&month=${month}` : baseYear;
    const res = await axiosInstance.get(finalUrl);
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
