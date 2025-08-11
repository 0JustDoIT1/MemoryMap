import {useCallback, useMemo, useState} from 'react';
import {returnedResults} from 'reanimated-color-picker';
import {customStyle} from 'src/style/customStyle';
import {IKoreaRegionData} from 'src/types/koreaMap';
import {getTextColorByBackgroundColor} from 'src/utils/getTextColorByBackgroundColor';

export const useRegionColorPicker = (regionData: IKoreaRegionData) => {
  // 초기 색상 (지역이 color면 배경색, 아니면 #fff)
  const initialHex = useMemo(
    () => (regionData.type === 'color' ? regionData.background : '#ffffff'),
    [regionData],
  );

  const [mode, setMode] = useState(false);
  const [hex, setHex] = useState(initialHex);

  // 미리보기 스타일 메모
  const prevLeftStyle = useMemo(
    () =>
      customStyle({
        bgColor: initialHex,
        color: getTextColorByBackgroundColor(initialHex),
      }).colorPickerPreview,
    [initialHex],
  );

  const prevRightStyle = useMemo(
    () =>
      customStyle({
        bgColor: hex,
        color: getTextColorByBackgroundColor(hex),
      }).colorPickerPreview,
    [hex],
  );

  // Change ColorPicker mode(swatch <=> pannel)
  const onChangeMode = useCallback(() => setMode(prev => !prev), []);
  // Select Color
  const onColorSelect = useCallback((color: returnedResults) => {
    setHex(color.hex);
  }, []);

  return {
    mode,
    hex,
    initialHex,
    prevLeftStyle,
    prevRightStyle,
    onChangeMode,
    onColorSelect,
    setHex,
  };
};
