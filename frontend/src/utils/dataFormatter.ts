import { LABELBYCATEGORY } from '../constants/labelList';
import { HourItem } from '../mocks/LineData';
import { CategoryItem } from '../mocks/DoughnutData';
import { BarDayItem, BarMonthItem } from '../mocks/BarData';
export const hourFormatChanger = (data: HourItem[]) => {
  return LABELBYCATEGORY.map(({ key, text, color }) => ({
    label: text,
    data: data.map((it) => it[key as keyof HourItem] as number),
    backgroundColor: [color],
    borderColor: [color],
    borderWidth: 2,
    pointRadius: 2,
    pointHoverRadius: 2,
  }));
};

export const categoryFormatChanger = (data: CategoryItem) => {
  return Object.values(data);
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
