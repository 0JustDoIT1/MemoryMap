export const getTextColorByBackgroundColor = (hexColor: string): string => {
  let c = hexColor.substring(1); // 색상 앞의 # 제거
  if (c.length > 6) c = c.substring(0, 6);
  const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
  const r = (rgb >> 16) & 0xff; // red 추출
  const g = (rgb >> 8) & 0xff; // green 추출
  const b = (rgb >> 0) & 0xff; // blue 추출
  // const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  const luma = (r * 299 + g * 587 + b * 114) / 1000; // vscode 값 참조
  // 색상 선택

  const result = luma < 127.5 ? 'white' : 'black';
  return result; // 글자색
};

export const getTextColorByMapBackground = (hexColor: string, type: string) => {
  if (type === 'photo') return 'white';
  getTextColorByBackgroundColor(hexColor);
};
