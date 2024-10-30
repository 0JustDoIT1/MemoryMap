import {View} from 'react-native';
import ColorPicker, {
  Preview,
  returnedResults,
  Swatches,
} from 'reanimated-color-picker';
interface CustomColorSwatch {
  value: string;
  onChange: ((colors: returnedResults) => void) | undefined;
}
const CustomColorSwatch = ({value, onChange}: CustomColorSwatch) => {
  return (
    <ColorPicker value={value} onChange={onChange}>
      <Swatches />
      <View className="bg-black mt-4 p-[1px] rounded-lg">
        <Preview style={{borderRadius: 8}} />
      </View>
    </ColorPicker>
  );
};
export default CustomColorSwatch;
