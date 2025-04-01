import styled from 'styled-components';
import { IoCloseOutline } from 'react-icons/io5';
import { Map } from 'react-kakao-maps-sdk';

// IncidentDetailsModal.tsx------------------------//
export const Layout = styled.div`
  width: 1030px;
  height: 639px;
  border-radius: 20px;
  padding: 19px 44px;
  background-color: white;
`;

export const TitleP = styled.p`
  font-size: 25px;
  font-weight: 700;
  margin: 15px 0;
`;

export const InfoMapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;
export const VideoMemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
`;

export const WrapperContainer = styled.div`
  display: flex;
  gap: 22px;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const XBtn = styled(IoCloseOutline)`
  width: 30px;
  height: 30px;
  pointer-events: auto;
  cursor: pointer;
`;

export const TitleBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Information.tsx---------------------------------//
export const InformationLayout = styled.div`
  box-shadow: 0px 0px 4px 0px rgb(0, 0, 0, 0.2);
  color: black;
  width: 332px;
  height: 165px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 23px 22px;
`;

export const NameP = styled.p`
  font-size: 16px;
  font-weight: 600;
  width: 20%;
`;

export const ValueP = styled.p`
  font-size: 16px;
  width: 80%;
`;

export const InfoContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 7.5px 0;
`;

// Memo.tsx---------------------------------//
export const MemoLayout = styled.div`
  width: 587px;
`;

export const MemoP = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 10px 0;
`;

export const MemoInput = styled.textarea`
  width: 100%;
  height: 108px;
  border: 0.5px solid var(--gray600);
  border-radius: 8px;
  padding: 13px 11px;
  resize: none;
  font-size: 13px;
  outline: none;
`;

// Map.tsx---------------------------------//
export const MapDiv = styled(Map)`
  width: 332px;
  height: 328px;
  border-radius: 8px;
`;