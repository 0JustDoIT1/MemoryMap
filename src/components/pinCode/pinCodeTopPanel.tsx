import {View} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated from 'react-native-reanimated';
import {customColor} from 'src/style/customColor';
import {staticStyles} from 'src/style/staticStyles';

interface IPinCodeTopPanel {
  reEnter?: boolean;
  title: string;
  dotsFilled: boolean[];
  animatedStyle: any;
}

const PinCodeTopPanel = ({
  reEnter,
  title,
  dotsFilled,
  animatedStyle,
}: IPinCodeTopPanel) => {
  const iconName = reEnter ? 'lock-check' : 'lock';

  return (
    <View className="w-full h-2/3 flex items-center justify-center bg-brandLight">
      <Animated.View style={[staticStyles.pinCodeTopContainer, animatedStyle]}>
        <View className="w-16 h-16 flex justify-center items-center rounded-full bg-white">
          <MaterialCommunityIcons
            name={iconName}
            size={40}
            color={customColor.brandLight}
          />
        </View>
        <View className="w-2/3 flex items-center mt-6">
          <Text className="text-sm text-white/80">{title}</Text>
        </View>
        <View className="w-2/5 flex-row justify-around items-center mt-6">
          {dotsFilled.map((pin, idx) => (
            <MaterialCommunityIcons
              key={idx}
              name="circle"
              size={22}
              color={pin ? customColor.white : customColor.whiteOpacity}
              accessibilityLabel={pin ? '입력됨' : '입력안됨'}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

export default PinCodeTopPanel;
