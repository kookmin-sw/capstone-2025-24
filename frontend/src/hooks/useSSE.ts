import { useEffect, useState } from 'react';
import { useItemStore } from '@/stores/itemStore';
import { AlertProps } from '@/types/alert';
import useIsModalOpen from '@/hooks/useIsModalOpen';
import { getMappedCategory } from '@/utils/categoryMapper';

export const useSSE = () => {
  const { addItem } = useItemStore();
  const { openModal, closeModal, isModalOpen } = useIsModalOpen();
  const [alertData, setAlertData] = useState<AlertProps | null>(null);

  useEffect(() => {
    console.log('SSE 시작');
    const eventSource = new EventSource(`${import.meta.env.VITE_SERVER_URL}api/v1/case/subscribe`);

    eventSource.addEventListener('connect', (event) => {
      console.log('Connect event:', event.data);
    });

    eventSource.addEventListener('keep-alive', (event) => {
      console.log('Keep-alive:', event.data);
    });

    eventSource.addEventListener('alarm-detected', (event) => {
      try {
        const rawData = JSON.parse(event.data) as AlertProps;
        const data: AlertProps = { ...rawData, category: getMappedCategory(rawData.category) };
        console.log('SSE 실시간 알림 감지 data:', data);
        addItem(data);
        setAlertData(data);
        if (data.level == 2) {
          openModal();
        }
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

  return { alertData, isModalOpen, openModal, closeModal };
};
