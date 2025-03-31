import { EVENT_CATEGORY} from '@/constants/EventCategory';
import { LABELBYCATEGORY } from '../constants/labelList';
import { HourItem } from '../mocks/LineData';
import { BarDayItem, BarMonthItem } from '../mocks/BarData';
export const hourFormatChanger = (data: HourItem[]) => {
  return LABELBYCATEGORY.map(({ key, text, color }) => ({
    label: text,
    data: data?.map((it) => it[key as keyof HourItem] as number),
    backgroundColor: [color],
    borderColor: [color],
    borderWidth: 2,
    pointRadius: 2,
    pointHoverRadius: 2,
  }));
};

export const monthFormatChanger = (data: BarMonthItem[]) => {
  return LABELBYCATEGORY.map(({ key, text, color }) => ({
    label: text,
    data: data.map((it) => it[key as keyof BarMonthItem] as number),
    backgroundColor: [color],
  }));
};

export const dayFormatChanger = (data: BarDayItem[]) => {
  return LABELBYCATEGORY.map(({ key, text, color }) => ({
    label: text,
    data: data.map((it) => it[key as keyof BarDayItem] as number),
    backgroundColor: [color],
  }));
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getKeyCategory = (koreanCategory: string): string | undefined => {
  return Object.keys(EVENT_CATEGORY).find((key) => EVENT_CATEGORY[key] === koreanCategory);
};
