const normalizeHex = (hex: string): string | null => {
  if (!hex) return null;
  let c = hex.replace('#', '').toLowerCase(); // 색상 앞의 # 제거

  // 3자리(hex) → 6자리(hex) 변환
  if (c.length === 3) {
    c = c
      .split('')
      .map(ch => ch + ch)
      .join('');
  }

  // 8자리(hex: RGBA) → 6자리만 사용
  if (c.length === 8) {
    c = c.substring(0, 6);
  }

  return /^[0-9a-f]{6}$/.test(c) ? c : null;
};

export const getTextColorByBackgroundColor = (hexColor: string): string => {
  const c = normalizeHex(hexColor);
  if (!c) return 'black'; // fallback

  const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
  const r = (rgb >> 16) & 0xff; // red 추출
  const g = (rgb >> 8) & 0xff; // green 추출
  const b = rgb & 0xff; // blue 추출

  // ITU-R BT.709 기준 (더 정확한 명암대비 계산)
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luma < 128 ? 'white' : 'black';
};
