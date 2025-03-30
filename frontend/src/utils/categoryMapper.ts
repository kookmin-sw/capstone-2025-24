import { EVENT_CATEGORY } from '@/constants/EventCategory';

export const getMappedCategory = (category: string): string => EVENT_CATEGORY[category] || category;
