export interface AlertProps {
  id: number;
  level: number;
  category: string | null;
  cctvId: number;
  address: string;
  date: string;
  state: '미확인' | '확인' | '미출동' | '출동' | '완료';
  policeName?: string;
  policeRank?: string;
  video?: string;
  memo?: string;
}

export interface IncidentCardProps {
  onClose: () => void;
  id: number;
}
