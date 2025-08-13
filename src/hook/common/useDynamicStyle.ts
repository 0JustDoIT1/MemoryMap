// useDynamicStyle.ts
import {useMemo} from 'react';
import {dynamicStyle, IDynamicStyle} from 'src/style/dynamicStyles';

// 그대로 호출 + 메모이제이션만
export const useDynamicStyle = (props?: IDynamicStyle) => {
  const {bgColor, color, width, margin, padding, border} = props ?? {};
  return useMemo(
    () => dynamicStyle({bgColor, color, width, margin, padding, border}),
    [
      bgColor,
      color,
      width,
      margin?.marginLeft,
      margin?.marginRight,
      padding?.paddingBottom,
      border?.bottom,
    ],
  );
};
