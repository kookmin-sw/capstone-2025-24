import styled from 'styled-components';

// AlertModal.tsx ------------------------------------

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

export const ModalContainer = styled.div`
  position: relative;
  width: 736px;
  height: 647px;
  background: white;
  padding: 23px;
  padding-top: 30px;
  padding-bottom: 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

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
    background-color: transparent;
    border: 1px solid var(--primary900);
    color: var(--primary900);
  }
  &.yes {
    background-color: var(--primary900);
    border: none;
    color: white;
  }
`;

// NoDispatchModal.tsx ------------------------------------

export const ReasonLayout = styled.div`
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
