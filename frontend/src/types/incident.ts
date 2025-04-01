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

export interface GetIncidentListParams {
  category: string | null;
  startDate: string | null;
  endDate: string | null;
  location?: string | null;
  police?: string | null;
  order: string;
  page: number;
}
