import {KeyChainPinCode} from '@env';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSetRecoilState} from 'recoil';
import {appShowRegionNameKey} from 'src/constants/app';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {saveKoreaMapDataToDB} from 'src/database/create';
import {countData, getDBConnection} from 'src/database/sqlite';
import {TableName} from 'src/database/table';
import {appPinCodeState, appShowRegionNameState} from 'src/recoil/atom';
import {StackParamList} from 'src/types/stack';
import {getAsyncStorage, saveAsyncStorage} from 'src/utils/asyncStorage';
import {getSecureValue} from 'src/utils/keyChain';

const useRoot = () => {
  const setAppPinCode = useSetRecoilState(appPinCodeState);
  const appShowRegionName = useSetRecoilState(appShowRegionNameState);

  const checkVersion = async () => {
    // const androidPackageName = VersionCheck.getPackageName(); //com.memorymap

    // const currentVersion = VersionCheck.getCurrentVersion();
    // const latestVersion = await VersionCheck.getLatestVersion({
    //   provider: 'playStore',
    //   packageName: androidPackageName,
    // })
    //   .then(value => value)
    //   .catch(error => console.error('Error fetching latest version: ', error));

    // if (latestVersion && latestVersion > currentVersion) return false;
    // else return true;

    // 임시
    return true;
  };

  // Get pincode in KeyChain
  const _getPinCodeToKeyChainCheck = async () => {
    return await getSecureValue(KeyChainPinCode).then(value => value?.username);
  };

  // Check exist SQLite data & Setting Data when no exist
  const _checkSQLiteData = async () => {
    const db = await getDBConnection();
    // Check SQLite
    const mapNum = await countData(db, TableName.map).then(
      res => res[0].rows.item(0)['count'],
    );

    if (mapNum === 0) {
      console.log('SQLite 초기 없어유');
      // SQLite
      koreaMapDataInit.forEach(
        async item => await saveKoreaMapDataToDB(db, item),
      );
    }
  };

  // Show map text
  const checkShowMapText = async () => {
    const showMapText = await getAsyncStorage(appShowRegionNameKey);
    if (!showMapText) {
      await saveAsyncStorage(appShowRegionNameKey, 'show');
      appShowRegionName('show');
    } else {
      appShowRegionName(showMapText as 'show' | 'condition' | 'hide');
    }
  };

  // Data Setting & Check pincode when AppUser Exists
  const checkPincode = async (
    navigation: NativeStackNavigationProp<StackParamList, 'Root', undefined>,
  ) => {
    await _checkSQLiteData();
    // Check pincode settings
    const pinCodeLock = await _getPinCodeToKeyChainCheck();
    if (pinCodeLock && pinCodeLock === KeyChainPinCode) {
      setAppPinCode(true);
      // Pincode, navigate to the Lock screen
      navigation.replace('PinCodeEnter', {route: 'Map'});
    } else {
      // No pincode, navigate to the Main screen
      navigation.replace('Main', {screen: 'Map'});
    }
  };

  return {checkVersion, checkShowMapText, checkPincode};
};

export default useRoot;
