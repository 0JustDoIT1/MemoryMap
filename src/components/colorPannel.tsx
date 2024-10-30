import {View} from 'react-native';
import ColorPicker, {
  HueSlider,
  Panel1,
  Preview,
  returnedResults,
} from 'reanimated-color-picker';
interface CustomColorPannel {
  value: string;
  onChange: ((colors: returnedResults) => void) | undefined;
}
const CustomColorPannel = ({value, onChange}: CustomColorPannel) => {
  return (
    <ColorPicker value={value} onChange={onChange}>
      <View className="flex-row justify-between">
        <Panel1 style={{width: '85%'}} thumbSize={15} />
        <HueSlider vertical thumbShape="pill" thumbColor="#000000" />
      </View>
      <View className="bg-black mt-4 p-[1px] rounded-lg">
        <Preview style={{borderRadius: 8}} />
      </View>
    </ColorPicker>
  );
};
export default CustomColorPannel;
