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
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
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
  width: 367px;
  height: 270px;
  perspective: 1000px;
  border-radius: 10px;
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
  border-radius: 10px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
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
  font-size: 24px;
  font-weight: bold;
`;

export const VideoButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: transparent;
  color: var(--primary900);
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  padding-top: 6px;

  .icon {
    font-size: 21px;
  }
`;

export const Line = styled.div`
  height: 1px;
  background: var(--gray400);
  margin: 15px 0;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const LocationTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 3px;
`;

export const LocationAddress = styled.p`
  font-size: 18px;
`;

export const ResolveButton = styled.button`
  width: 100%;
  margin-bottom: 15px;
  padding: 8px 0;
  border: solid 1.5px var(--primary600);
  background-color: var(--primary300);
  color: var(--primary900);
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
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

export const FeedbackTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 8px;
`;

export const FeedbackDescription = styled.p`
  font-size: 15px;
  color: var(--gray500);
  margin-bottom: 36px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const Button = styled.button`
  background-color: transparent;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background-color 0.2s ease;

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
  font-size: 12px;
  color: var(--gray700);
  background: transparent;
  border: none;
  cursor: pointer;
  margin-top: 10px;
`;

// CategorySelectCard.tsx ------------------------------------//

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 16px 0;
`;

export const CategoryRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export const Chip = styled.button<{ selected: boolean }>`
  padding: 8px 20px;
  border-radius: 75px;
  border: 1.5px solid ${({ selected }) => (selected ? 'var(--primary900)' : 'var(--gray400)')};
  background-color: ${({ selected }) => (selected ? 'var(--primary300)' : 'transparent')};
  font-size: 15px;
  font-weight: bold;
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

// ResolvedCard.tsx ------------------------------------//

export const Check = styled(Lottie)`
  width: 120px;
  height: 120px;
`;

export const ResolveLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 30px;
`;

export const ResolveTitle = styled.h3`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const ResolveDescription = styled.p`
  text-align: center;
  font-size: 14px;
  color: var(--gray500);
`;
