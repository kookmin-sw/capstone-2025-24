import styled, { css } from 'styled-components';
import Lottie from 'lottie-react';
import { BiSolidCctv } from 'react-icons/bi';

// AlertModal.tsx ------------------------------------//

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div<{ highlight: boolean }>`
  position: relative;
  width: 700px;
  height: 600px;
  background: white;
  padding: 23px;
  padding-top: 30px;
  padding-bottom: 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  ${({ highlight }) =>
    highlight &&
    css`
      background-color: rgb(255, 182, 182);
      animation: highlightAnimation 1.3s steps(2, end) infinite;
    `}
  @keyframes highlightAnimation {
    0% {
      background-color: white;
    }
    100% {
      background-color: rgb(255, 182, 182);
    }
  }
`;
// IncidentModal.tsx -------------------------//

export const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

export const Title = styled.h2`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

export const InfoContainer = styled.div`
  display: flex;
  font-size: 18px;
  color: var(--gray700);
  gap: 30px;
  margin-bottom: 10px;
`;

export const InfoDiv = styled.div`
  display: flex;
  gap: 7px;

  svg {
    color: var(--primary900);
    font-size: 20px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  gap: 25px;
`;

export const Button = styled.button`
  padding: 15px 0;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 23px;
  font-weight: 600;
  &.no {
    background-color: white;
    border: 1px solid var(--primary900);
    color: var(--primary900);
  }
  &.yes {
    background-color: var(--primary900);
    border: none;
    color: white;
  }
`;

export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const CctvButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;

  background-color: rgb(250, 247, 247);
  border: none;
  border-radius: 50px;
  font-size: 12px;
  padding: 7px 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
`;

export const RecordIcon = styled(BiSolidCctv)`
  color: var(--primary900);
  width: 20px;
  height: 20px;
  margin: 0 3px;
`;

// FeedbackModal.tsx ------------------------------------

export const FeedbackLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

export const ReasonTitle = styled.h3`
  font-size: 30px;
  font-weight: 600;
  margin-top: 15px;
  text-align: center;
  line-height: 130%;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 30px;
  gap: 20px;
`;

export const WrongButton = styled.button`
  width: 100%;
  background-color: transparent;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background-color 0.2s ease;
  padding: 12px 50px;

  &.yes {
    color: var(--primary800);
    border: solid 1.5px var(--primary800);
  }
  &.no {
    color: var(--red);
    border: solid 1.5px var(--red);
  }

  &:hover {
    background-color: rgba(25, 118, 210, 0.06);
  }
  &.no:hover {
    background-color: rgba(211, 47, 47, 0.06);
  }

  &.yes:active {
    background-color: rgba(25, 118, 210, 0.2);
  }
  &.no:active {
    background-color: rgba(211, 47, 47, 0.2);
  }
`;

export const BackButton = styled.button`
  width: 100%;
  margin-top: 13px;
  background: none;
  border: none;
  font-size: 15px;
  color: var(--gray700);
  text-decoration: underline;
  cursor: pointer;
`;

// CategorySelectModal.tsx ------------------------------------//

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 40px;
`;

export const CategoryRow = styled.div`
  display: flex;
  gap: 13px;
  justify-content: center;
`;

export const Chip = styled.button<{ selected: boolean }>`
  padding: 6px 26px;
  border-radius: 75px;
  border: 1.5px solid ${({ selected }) => (selected ? 'var(--primary900)' : 'var(--gray400)')};
  background-color: ${({ selected }) => (selected ? 'var(--primary300)' : 'transparent')};
  font-size: 20px;
  font-weight: 600;
  color: ${({ selected }) => (selected ? 'var(--primary900)' : 'var(--gray700)')};
  cursor: pointer;
  transition:
    background-color 0.2s,
    border 0.2s,
    color 0.2s;

  &:hover {
    background-color: var(--primary300);
    border: 1.5px solid var(--primary900);
  }
  &:active {
    background-color: rgba(25, 118, 210, 0.2);
  }
`;

export const SelectButton = styled.button`
  padding: 8px 0;
  width: 95%;
  border: solid 1.5px var(--primary600);
  background-color: var(--primary300);
  color: var(--primary900);
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

// SubmitModal.tsx ------------------------------------//

export const SubmitLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

export const Check = styled(Lottie)`
  width: 180px;
  height: 180px;
  margin-top: 30px;
`;

export const SubmitTitle = styled.h3`
  font-size: 30px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const SubmitDescription = styled.p`
  text-align: center;
  font-size: 15px;
  color: var(--gray500);
  margin-bottom: 24px;
`;

export const CloseSubmitButton = styled.button`
  text-align: center;
  font-size: 23px;
  border-radius: 5px;
  color: white;
  background-color: var(--primary900);
  border: none;
  width: 572px;
  height: 60px;
  margin-top: 40px;
  font-weight: 600;
  cursor: pointer;

  &:active {
    background-color: #3d52af;
  }

  &:disabled {
    background-color: #f2f2f2;
    color: #b3b3b3;
  }
`;
