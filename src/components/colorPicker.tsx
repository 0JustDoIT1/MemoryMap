import {View} from 'react-native';
import ColorPicker, {
  HueSlider,
  Panel1,
  Preview,
  returnedResults,
} from 'reanimated-color-picker';

interface CustomColorPicker {
  value: string;
  onComplete: ((colors: returnedResults) => void) | undefined;
}

const CustomColorPicker = ({value, onComplete}: CustomColorPicker) => {
  return (
    <ColorPicker value={value} onComplete={onComplete}>
      <View className="flex-row justify-between">
        <Panel1 style={{width: '85%'}} thumbSize={15} />
        <HueSlider vertical thumbShape="pill" thumbColor="#000000" />
      </View>
      <Preview style={{marginTop: 10}} />
    </ColorPicker>
  );
};

export default CustomColorPicker;
