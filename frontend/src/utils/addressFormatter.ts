export const addressFormatter = (target: string | undefined) => {
  const titleLength = target?.split(' ').length || 2;
  return target?.split(' ').slice(2, titleLength).join(' ');
};
