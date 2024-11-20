import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PinCodeProps} from 'src/types/stack';
import {customColor} from 'src/style/customColor';
import {useRecoilState} from 'recoil';
import {appPinCodeState} from 'src/recoil/atom';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PinCodeNumber from 'src/components/pinCodeNumber';
import {useState} from 'react';

const PinCodeScreen = ({navigation}: PinCodeProps) => {
  const pinCodeArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['', 0, 'delete'],
  ];

  const pinLength = 4;

  const [code, setCode] = useState<number[]>([]);
  const [reCode, setReCode] = useState<number[]>([]);

  const onNumberPress = (item: string | number) => {
    if (typeof item === 'number') setCode([...code, item].splice(0, pinLength));
    else if (item === 'delete') setCode(code.splice(0, code.length - 1));
  };

  const [appPinCode, setAppPinCode] = useRecoilState(appPinCodeState);

  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen h-screen bg-white">
      <View className="w-full h-2/3 flex items-center justify-center bg-brandLight">
        <View className="w-16 h-16 flex justify-center items-center rounded-full bg-white">
          <MaterialCommunityIcons
            name="lock"
            size={40}
            color={customColor.brandLight}
          />
        </View>
        <View className="w-1/2 flex items-center mt-12">
          <Text className="text-white/80">암호를 입력해 주세요.</Text>
        </View>
        <View className="w-2/5 flex-row justify-around items-center mt-6">
          {[...Array(pinLength)].map((item, index) => {
            item = !!code[index];

            return (
              <MaterialCommunityIcons
                key={index}
                name="circle"
                size={22}
                color={item ? customColor.white : customColor.whiteOpacity}
              />
            );
          })}
        </View>
      </View>
      <View className="w-full h-1/3">
        {pinCodeArray.map(array => (
          <View key={array[0]} className="w-full h-1/4 flex-row">
            {array.map(item => {
              return (
                <PinCodeNumber
                  key={item}
                  item={item}
                  onPress={() => onNumberPress(item)}
                />
              );
            })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default PinCodeScreen;
