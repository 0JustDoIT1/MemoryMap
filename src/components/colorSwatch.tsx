import {View} from 'react-native';
import ColorPicker, {
  Preview,
  returnedResults,
  Swatches,
} from 'reanimated-color-picker';
interface CustomColorSwatch {
  value: string;
  onComplete: ((colors: returnedResults) => void) | undefined;
}
const CustomColorSwatch = ({value, onComplete}: CustomColorSwatch) => {
  return (
    <ColorPicker value={value} onChange={onComplete}>
      <Swatches />
      <View className="bg-black mt-2 p-[1px] rounded-lg">
        <Preview style={{borderRadius: 8}} />
      </View>
    </ColorPicker>
  );
};
export default CustomColorSwatch;
