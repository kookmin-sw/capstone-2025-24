// 카테고리 드롭다운
export const CATEGORY_OPTIONS = ['전체', '화재', '연기', '폭행', '쓰러짐', '흉기난동', '군중밀집'];

// 연도 드롭다운
const now = new Date();
const nowYear = now.getFullYear();
export const YEAR_OPTIONS = Array.from({ length: nowYear - 2024 + 1 }, (_, i) => (nowYear - i).toString());

// 월 드롭다운
export const MONTH_OPTIONS = ['전체', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
export const MONTH_PLACEHOLDER = '월';
