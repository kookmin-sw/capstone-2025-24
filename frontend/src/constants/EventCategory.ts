export const EVENT_CATEGORY = {
    FIRE: "화재",
    FAINT: "쓰러짐",
    CROWD: "군중밀집",
    WEAPON: "흉기난동",
    ASSAULT: "폭행",
} as const;

export const CATEGORY:String[] = ["화재", "쓰러짐", "군중밀집", "흉기난동", "폭행"];
export type EventCategory = (typeof EVENT_CATEGORY)[keyof typeof EVENT_CATEGORY];