import styled from 'styled-components';

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

export const Card = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
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
  border: solid 1.5px var(--primary600);;
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