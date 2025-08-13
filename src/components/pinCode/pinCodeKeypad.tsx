import {View} from 'react-native';
import PinCodeNumber from './pinCodeNumber';
import {useDynamicStyle} from 'src/hook/common/useDynamicStyle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Digit = string | number;

interface IPinCodeKeypad {
  keyPad: Digit[][];
  onPressDigit: (d: Digit) => void;
}

const PinCodeKeypad = ({keyPad, onPressDigit}: IPinCodeKeypad) => {
  const insets = useSafeAreaInsets();

  const pinTyping = useDynamicStyle({
    padding: {paddingBottom: insets.bottom},
  });

  return (
    <View className="w-full h-1/3 bg-white" style={pinTyping.pinCodeTyping}>
      {keyPad.map((row, rowIdx) => (
        <View key={rowIdx} className="w-full h-1/4 flex-row">
          {row.map((digit, colIdx) => (
            <PinCodeNumber
              key={`${rowIdx}-${colIdx}`}
              item={digit}
              onPress={() => onPressDigit(digit)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
export default PinCodeKeypad;
