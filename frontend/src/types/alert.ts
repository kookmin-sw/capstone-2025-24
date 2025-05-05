export interface AlertProps {
  id: number;
  level: number;
  category: string | null;
  address: string;
  date: string;
  state: '미확인' | '확인' | '미출동' | '출동' | '완료';
  police_name?: string;
  police_rank?: string;
  video?: string;
  memo?: string;
}

export interface IncidentCardProps {
  onClose: () => void;
  id: number;
}
