import {SafeAreaView} from 'react-native-safe-area-context';
import {TPinCodeEnter} from 'src/types/stack';
import usePinCodeEnter from 'src/hook/setting/usePinCodeEnter';
import PinCodeKeypad from 'src/components/pinCode/pinCodeKeypad';
import PinCodeTopPanel from 'src/components/pinCode/pinCodeTopPanel';

const PinCodeEnterScreen = ({navigation, route}: TPinCodeEnter) => {
  const {pinCodeArray, dotsFilled, animatedStyle, onNumberPressEnter} =
    usePinCodeEnter(navigation, route);

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-brandLight"
      edges={['left', 'right']}>
      <PinCodeTopPanel
        title="암호를 입력해 주세요."
        dotsFilled={dotsFilled}
        animatedStyle={animatedStyle}
      />
      <PinCodeKeypad keyPad={pinCodeArray} onPressDigit={onNumberPressEnter} />
    </SafeAreaView>
  );
};

export default PinCodeEnterScreen;
