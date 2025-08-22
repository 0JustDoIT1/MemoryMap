export const clamp = (n: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, n));

export const toFixed = (n: number, fixNum: number) => Number(n.toFixed(fixNum));

export const calcPercentTextMargin = (p: number) => {
  if (p <= 4) return {marginRight: 'auto'} as const;
  if (p >= 94) return {marginLeft: 'auto'} as const;
  return {marginLeft: `${p - 4}%`} as const;
};
