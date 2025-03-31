export interface Incident {
    id: number;
    policeId: number;
    policeName: string;
    cctvId: number;
    address: string;
    date: string;
    category: string;
    memo: string | null;
  }