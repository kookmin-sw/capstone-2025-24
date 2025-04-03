import { useEffect } from 'react';
import { useItemStore } from '@/stores/itemStore';
import { AlertProps } from '@/types/alert';

export const useSSE = () => {
  const { addItem } = useItemStore();

  useEffect(() => {
    console.log('SSE 시작');
    const eventSource = new EventSource(`${import.meta.env.VITE_SERVER_URL}api/v1/case/subscribe`);

    eventSource.addEventListener('alarm-detected', (event) => {
      try {
        const data = JSON.parse(event.data) as AlertProps;
        addItem(data);
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
  }, []);
};
