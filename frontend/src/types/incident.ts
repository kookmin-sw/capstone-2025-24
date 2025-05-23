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
  address?: string | null;
  police?: string | null;
  order: string;
  page: number;
}

export interface IncidentModalInfo{
  memo: string;
  latitude: number;
  longitude: number;
  videourl: string;
}

export interface FilteringInfo{
  category: string;
  startDate: Date;
  endDate: Date;
  searchType: string;
  searchWord: string;
}