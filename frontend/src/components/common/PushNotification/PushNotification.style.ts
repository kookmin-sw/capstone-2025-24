import styled from 'styled-components';

// PushNotification.tsx -------------------------//
export const PushNotificationLayout = styled.div`
  width: 498px;
  height: 96px;
  background-color: #fffaee;
  border: 1.5px solid var(--yellow);
  border-radius: 10px;
  box-shadow: 0px 2px 7px 0px rgb(0, 0, 0, 0.2);
  display: flex;
  padding: 21px 23px;
  gap: 26px;
`;

export const ExclamationMark = styled.img`
  width: 54px;
  height: 54px;
`;

export const ContentP = styled.p<{ $fontColor: string }>`
  font-size: 22px;
  font-weight: 700;
  color: ${({ $fontColor }) => $fontColor};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
`;
