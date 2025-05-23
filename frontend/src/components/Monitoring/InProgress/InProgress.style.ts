import styled, { css, keyframes } from 'styled-components';
import Lottie from 'lottie-react';

// InProgress.tsx ------------------------------------//

export const InProgressLayout = styled.div`
  margin-bottom: 30px;
`;

export const Title = styled.h2`
  font-size: 25px;
  font-weight: bold;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 20px;
`;

export const EmptyView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: var(--gray500);
  width: 1141px;
  height: 500px;

  img {
    width: 210px;
    height: auto;
    margin-bottom: 30px;
  }
`;

// IncidentCard.tsx ------------------------------------//

const blinkShadow = keyframes`
  0%, 100% {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 1px 1px 10px 5px var(--primary600);
  }
`;

export const FlipCard = styled.div<{ $isHighlighted: boolean }>`
  width: 288px;
  height: 214px;
  perspective: 1000px;
  border-radius: 9px;
  ${({ $isHighlighted }: { $isHighlighted: boolean }) =>
    $isHighlighted &&
    css`
      animation: ${blinkShadow} 1s ease-in-out 3;
    `}
`;

export const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;

  &.is-resolved {
    transform: rotateY(-180deg);
  }
`;

export const CardFront = styled.div`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: white;
  border-radius: 9px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

export const VideoButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: transparent;
  color: var(--primary900);
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  padding-top: 4px;

  .icon {
    font-size: 21px;
  }
`;

export const Line = styled.div`
  height: 0.8px;
  background: var(--gray400);
  margin: 11px 0;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const LocationTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 3px;
`;

export const LocationAddress = styled.p`
  font-size: 14px;
`;

export const ResolveButton = styled.button`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 0;
  border: solid 1.1px var(--primary600);
  background-color: var(--primary300);
  color: var(--primary900);
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--gray700);
  padding: 0 2px;
`;

export const CardBack = styled(CardFront)`
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// IncidentCard.tsx ------------------------------------//

export const FeedbackLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const FeedbackTitle = styled.h3`
  font-size: 17px;
  font-weight: bold;
`;

export const FeedbackDescription = styled.p`
  font-size: 11px;
  color: var(--gray500);
  margin-top: 5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-top: 15px;
  gap: 10px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px 0;
  background-color: transparent;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background-color 0.2s ease;

  &.yes {
    color: var(--primary800);
    border: solid 1.2px var(--primary800);
  }
  &.no {
    color: var(--red);
    border: solid 1.2px var(--red);
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
  font-size: 10px;
  color: var(--gray700);
  background: transparent;
  border: none;
  cursor: pointer;
  margin-top: 8px;
  text-decoration: underline;
`;

// CategorySelectCard.tsx ------------------------------------//

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0;
`;

export const CategoryRow = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
`;

export const Chip = styled.button<{ selected: boolean }>`
  padding: 6px 13px;
  border-radius: 50px;
  border: 1.2px solid ${({ selected }) => (selected ? 'var(--primary900)' : 'var(--gray400)')};
  background-color: ${({ selected }) => (selected ? 'var(--primary300)' : 'transparent')};
  font-size: 13px;
  font-weight: bold;
  color: ${({ selected }) => (selected ? 'var(--primary900)' : 'var(--gray700)')};
  cursor: pointer;
  transition:
    background-color 0.2s,
    border 0.2s,
    color 0.2s;

  &:hover {
    background-color: var(--primary300);
    border: 1.2px solid var(--primary900);
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
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    background-color: #f2f2f2;
    color: #b3b3b3;
    border: solid 1.5px var(--gray400);
  }
`;

// ResolvedCard.tsx ------------------------------------//

export const Check = styled(Lottie)`
  width: 90px;
  height: 90px;
`;

export const ResolveLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 30px;
`;

export const ResolveTitle = styled.h3`
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const ResolveDescription = styled.p`
  text-align: center;
  font-size: 12px;
  color: var(--gray500);
`;
