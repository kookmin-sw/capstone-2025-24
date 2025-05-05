import { useModalStore } from '@/stores/modalStore';

export const useModal = () => {
  const openModal = useModalStore((s) => s.open);
  const closeModal = useModalStore((s) => s.close);
  const currentItem = useModalStore((s) => s.currentItem);

  return { openModal, closeModal, currentItem };
};
