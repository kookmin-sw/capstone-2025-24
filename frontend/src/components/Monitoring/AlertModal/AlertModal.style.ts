import styled from 'styled-components';

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
