import styled from 'styled-components';

// InProgress.tsx ------------------------------------

export const InProgressLayout = styled.div``;

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

// IncidentCard.tsx ------------------------------------

export const FlipCard = styled.div`
  width: 367px;
  height: 268px;
  perspective: 1000px;
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
  margin: 16px 0;
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
  margin-top: 37px;
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

// IncidentCard.tsx ------------------------------------

export const FeedbackTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
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
  transition: background-color 0.3s ease;

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

  &:active::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: rgba(25, 118, 210, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: ripple 0.3s ease-out;
  }
  &.no:active::after {
    background-color: rgba(211, 47, 47, 0.2);
  }

  @keyframes ripple {
    from {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    to {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }
`;
