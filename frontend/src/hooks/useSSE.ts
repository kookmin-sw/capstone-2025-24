import { useEffect, useState } from 'react';
import { useItemStore } from '@/stores/itemStore';
import { AlertProps } from '@/types/alert';
import { getMappedCategory } from '@/utils/categoryMapper';

export const useSSE = () => {
  const { addItem } = useItemStore();
  const [alertData, setAlertData] = useState<AlertProps | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(`${import.meta.env.VITE_SERVER_URL}api/v1/case/subscribe`);

    eventSource.addEventListener('alarm-detected', (event) => {
      try {
        const rawData = JSON.parse(event.data) as AlertProps;
        const data: AlertProps = { ...rawData, state: '미확인', category: getMappedCategory(rawData.category) };
        addItem(data);
        setAlertData(data);
      } catch (error) {
        console.error('실시간 SSE 에러 : ', error);
      }
    });

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [alertData]);

  return { alertData };
};
