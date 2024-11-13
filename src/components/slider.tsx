import {Slider} from '@miblanchard/react-native-slider';
import {View} from 'react-native';
import {customStyle} from 'src/style/customStyle';
import {useAppTheme} from 'src/style/paperTheme';

interface CustomSlider {
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number[]) => void;
  color?: string;
}

const CustomSlider = ({
  min,
  max,
  value,
  onValueChange,
  color,
}: CustomSlider) => {
  const theme = useAppTheme();

  return (
    <Slider
      containerStyle={customStyle().sliderContainer}
      trackStyle={customStyle().sliderTrack}
      minimumTrackStyle={customStyle().sliderMinimumTrack}
      renderThumbComponent={() => (
        <View className="w-6 h-6 rounded-full border border-gray-400 bg-white shadow-sm shadow-black" />
      )}
      minimumValue={min}
      maximumValue={max}
      value={value}
      onValueChange={onValueChange}
    />
  );
};

export default CustomSlider;
