import { LABELBYCATEGORY } from "../constants/labelList";
import { HourItem } from "../mocks/LineData";

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
