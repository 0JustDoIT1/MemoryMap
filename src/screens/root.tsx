import {useEffect} from 'react';
import useDialog from 'src/hook/useDialog';
import {TRoot} from 'src/types/stack';
import {onOpenStoreLink} from 'src/utils/openStoreLink';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native';
import CustomConfirmAlert from 'src/components/alert/confirmAlert';
import useRoot from 'src/hook/useRoot';

const RootScreen = ({navigation}: TRoot) => {
  const {visibleDialog, showDialog} = useDialog();
  const {checkVersion, checkPincode, checkShowMapText} = useRoot();

  // App version check & Check existing SignIn status
  useEffect(() => {
    checkVersion().then(check => {
      if (!check) return showDialog();
      else {
        checkShowMapText();
        checkPincode(navigation);
      }
    });
  }, []);

  return (
    <SafeAreaView className="flex-1" edges={['left', 'right']}>
      <Image
        className="w-screen h-screen"
        source={require('assets/images/root_screen.png')}
      />
      <CustomConfirmAlert
        visible={visibleDialog}
        title="최신 버전 업데이트"
        description={`최신 버전 앱으로 업데이트를 위해\n스토어로 이동합니다.`}
        buttonText="확인"
        buttonOnPress={onOpenStoreLink}
        dismissable={false}
      />
    </SafeAreaView>
  );
};

export default RootScreen;
