import {KeyChainPinCode} from '@env';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {appShowRegionNameKey, appTableName} from 'src/constants/app';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {saveKoreaMapDataToDB} from 'src/database/create';
import {countData, getDBConnection} from 'src/database/sqlite';
import {StackParamList} from 'src/types/stack';
import {getAsyncStorage, setAsyncStorage} from 'src/utils/asyncStorage';
import {getSecureValue} from 'src/utils/keyChain';
import VersionCheck from 'react-native-version-check';
import {useAppPinCode} from 'src/store/appPinCode';
import {useAppShowRegionName} from 'src/store/appShowRegionName';

const useRoot = () => {
  const setAppPinCode = useAppPinCode(state => state.setAppPinCode);
  const setAppShowRegionName = useAppShowRegionName(
    state => state.setAppShowRegionName,
  );

  const checkVersion = async () => {
    const androidPackageName = VersionCheck.getPackageName(); //com.memorymap

    const currentVersion = VersionCheck.getCurrentVersion();
    const latestVersion = await VersionCheck.getLatestVersion({
      provider: 'playStore',
      packageName: androidPackageName,
    })
      .then(value => value)
      .catch(error => console.error('Error fetching latest version: ', error));

    if (latestVersion && latestVersion !== currentVersion) return false;
    else return true;
  };

  // Get pincode in KeyChain
  const _getPinCodeToKeyChainCheck = async () => {
    return await getSecureValue(KeyChainPinCode).then(value => value?.username);
  };

  // Check exist SQLite data & Setting Data when no exist
  const _checkSQLiteData = async () => {
    const db = await getDBConnection();
    // Check SQLite
    const mapNum = await countData(db, appTableName.map).then(
      res => res[0].rows.item(0)['count'],
    );

    if (mapNum === 0) {
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
      await setAsyncStorage(appShowRegionNameKey, 'show');
      setAppShowRegionName('show');
    } else {
      setAppShowRegionName(showMapText as 'show' | 'condition' | 'hide');
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
