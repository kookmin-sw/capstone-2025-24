import { LABELBYCATEGORY } from '../constants/labelList';
import { HourItem } from '@/types/chart';
import { BarDayItem, BarMonthItem } from '@/types/chart';

export const hourFormatChanger = (data: HourItem[], category: string) => {
  return category === '전체'
    ? LABELBYCATEGORY.map(({ key, text, color }) => ({
        label: text,
        data: data?.map((it) => it[key as keyof HourItem] as number),
        backgroundColor: [color],
        borderColor: [color],
        borderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 2,
      }))
    : (() => {
        const labelItem = LABELBYCATEGORY.find((item) => item.text === category);
        if (!labelItem) return [];
        return [
          {
            label: labelItem.text,
            data: data.map((it) => it[labelItem.key as keyof HourItem] as number),
            backgroundColor: [labelItem.color],
            borderColor: [labelItem.color],
            borderWidth: 2,
            pointRadius: 2,
            pointHoverRadius: 2,
          },
        ];
      })();
};

export const monthFormatChanger = (data: BarMonthItem[]) => {
  return LABELBYCATEGORY.map(({ key, text, color }) => ({
    label: text,
    data: data?.map((it) => it[key as keyof BarMonthItem] as number),
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

export const formatDate = (date: Date): string => {
  return date.toISOString().substring(0, 10);
};
