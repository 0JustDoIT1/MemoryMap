import {useCallback, useMemo, useState} from 'react';
import {appShowRegionNameKey} from 'src/constants/app';
import {useAppShowRegionName} from 'src/store/appShowRegionName';
import {IAppShowRegionName} from 'src/types/app';
import {setAsyncStorage} from 'src/utils/asyncStorage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TStackParamList} from 'src/types/stack';
import {useActionLock} from '../common/useActionLock';

const useMapTextSetting = (
  navigation: NativeStackNavigationProp<
    TStackParamList,
    'MapTextSetting',
    undefined
  >,
) => {
  const appShowRegionName = useAppShowRegionName(
    state => state.appShowRegionName,
  );
  const setAppShowRegionName = useAppShowRegionName(
    state => state.setAppShowRegionName,
  );

  const {isDisabled, onLoading, wrap} = useActionLock();

  const [select, setSelect] = useState<IAppShowRegionName>(appShowRegionName);

  const isDirty = useMemo(
    () => select !== appShowRegionName,
    [select, appShowRegionName],
  );

  const save = useCallback(
    async (value: IAppShowRegionName) => {
      await setAsyncStorage(appShowRegionNameKey, value);
      setAppShowRegionName(value);
    },
    [setAppShowRegionName],
  );

  // Save map region text
  const onShowRegionName = useMemo(
    () =>
      wrap(async () => {
        if (!isDirty) return;
        await save(select);
        navigation.goBack();
      }),
    [wrap, isDirty, save, select, navigation],
  );

  return {isDisabled, onLoading, select, setSelect, isDirty, onShowRegionName};
};

export default useMapTextSetting;
