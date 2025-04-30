// import { useEffect } from 'react';
// import { useSSE } from '@/hooks/useSSE';
// import AlertModal from '../Monitoring/AlertModal/AlertModal';
// import PushNotification from './PushNotification/PushNotification';
// // import { useHighlightStore } from '@/stores/highlightStore';
// import { useModalStore } from '@/stores/modalStore';

// const RealTimeAlert = () => {
//   const { alertData } = useSSE();
//   // const { highlights, setHighlight } = useHighlightStore();
//   const open = useModalStore((s) => s.open);
//   const close = useModalStore((s) => s.close);
//   const current = useModalStore((s) => s.current);

//   useEffect(() => {
//     if (alertData?.level === 2) {
//       // setHighlight(true);
//       open(alertData, true);
//     }
//   }, [alertData, open]);

//   //   const handleModalClose = () => {
//   //     setHighlight(false);
//   //     // closeModal();
//   //     close();
//   //   };

//   //   if (!alertData) return null;

//   //   const { id, level, category, date, address, state, video } = alertData;

//   //   return (
//   //     <div>
//   //       {level === 2 && (
//   //         <AlertModal
//   //           onClose={handleModalClose}
//   //           alertItem={{ id, level, category, date, address, state, video }}
//   //           highlight={!!highlight}
//   //         />
//   //       )}

//   //       {level === 1 && <PushNotification key={id} id={id} category={category} />}
//   //     </div>
//   //   );
//   // };
//   if (!current) return null;

//   const { alert, highlight } = current;

//   return alert.level === 2 ? (
//     <AlertModal
//       onClose={close} // 이제는 modalStore.close()
//       highlight={highlight}
//       alertItem={alert}
//     />
//   ) : (
//     <PushNotification id={alert.id} category={alert.category} />
//   );
// };

// export default RealTimeAlert;

import { useEffect, useState } from 'react';
import { useSSE } from '@/hooks/useSSE';
import { useModalStore } from '@/stores/modalStore';
import AlertModal from '@/components/Monitoring/AlertModal/AlertModal';
import PushNotification from './PushNotification/PushNotification';
import { AlertProps } from '@/types/alert';

export default function RealTimeAlert() {
  const { alertData } = useSSE();
  const open = useModalStore((s) => s.open);
  const close = useModalStore((s) => s.close);
  const current = useModalStore((s) => s.current);

  const [pushAlert, setPushAlert] = useState<AlertProps | null>(null);

  useEffect(() => {
    if (!alertData) return;

    if (alertData.level === 2) {
      open(alertData, true); // 2단계 : queue 삽입, 모달 open
    } else {
      setPushAlert(alertData); // 1단계 푸쉬 알림
    }
  }, [alertData, open]);

  return (
    <>
      {pushAlert && <PushNotification key={pushAlert.id} id={pushAlert.id} category={pushAlert.category} />}

      {current?.alert.level === 2 && (
        <AlertModal onClose={close} highlight={current.highlight} alertItem={current.alert} />
      )}
    </>
  );
}
