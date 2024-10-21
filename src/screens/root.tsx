import {useEffect} from 'react';
import {RootProps} from 'src/types/stack';
import useCheckAuth from 'src/hook/useCheckAuth';
import {Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Root = ({navigation}: RootProps) => {
  const {onAuthStateChanged} = useCheckAuth();

  useEffect(() => {
    onAuthStateChanged(navigation);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Image
        className="w-screen h-screen"
        source={require('assets/images/launch_screen.png')}
      />
    </SafeAreaView>
  );
};

export default Root;
