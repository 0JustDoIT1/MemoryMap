import {SafeAreaView} from 'react-native-safe-area-context';
import {TPinCodeSetting} from 'src/types/stack';
import useBackButton from 'src/hook/common/useBackButton';
import usePinCodeSetting from 'src/hook/setting/usePinCodeSetting';
import PinCodeTopPanel from 'src/components/pinCode/pinCodeTopPanel';
import PinCodeKeypad from 'src/components/pinCode/pinCodeKeypad';

const PinCodeSettingScreen = ({navigation}: TPinCodeSetting) => {
  useBackButton(() => navigation.goBack());
  const {
    pinCodeArray,
    reEnter,
    dotsFilled,
    title,
    animatedStyle,
    onNumberPressSetting,
  } = usePinCodeSetting(navigation);

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-brandLight"
      edges={['left', 'right']}>
      <PinCodeTopPanel
        reEnter={reEnter}
        title={title}
        dotsFilled={dotsFilled}
        animatedStyle={animatedStyle}
      />
      <PinCodeKeypad
        keyPad={pinCodeArray}
        onPressDigit={onNumberPressSetting}
      />
    </SafeAreaView>
  );
};

export default PinCodeSettingScreen;
