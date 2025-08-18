import {KeyChainPinCode} from '@env';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MAP_DATA_INIT} from 'src/constants/koreaMapData';
import {saveKoreaMapDataToDB} from 'src/database/create';
import {countData, getDBConnection} from 'src/database/sqlite';
import {TStackParamList} from 'src/types/stack';
import {getAsyncStorage, setAsyncStorage} from 'src/utils/storage/asyncStorage';
import {getSecureValue} from 'src/utils/security/keyChain';
import VersionCheck from 'react-native-version-check';
import {useAppPinCode} from 'src/store/appPinCode';
import {useAppShowRegionName} from 'src/store/appShowRegionName';
import {APP_TABLE_NAME} from 'src/constants/db';
import {STORAGE_KEYS} from 'src/constants/storage';

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
    const mapNum = await countData(db, APP_TABLE_NAME.map);

    if (mapNum === 0) {
      // SQLite
      MAP_DATA_INIT.forEach(async item => await saveKoreaMapDataToDB(db, item));
    }
  };

  // Show map text
  const checkShowMapText = async () => {
    const showMapText = await getAsyncStorage(STORAGE_KEYS.showRegionName);
    if (!showMapText) {
      await setAsyncStorage(STORAGE_KEYS.showRegionName, 'show');
      setAppShowRegionName('show');
    } else {
      setAppShowRegionName(showMapText as 'show' | 'condition' | 'hide');
    }
  };

  // Data Setting & Check pincode when AppUser Exists
  const checkPincode = async (
    navigation: NativeStackNavigationProp<TStackParamList, 'Root', undefined>,
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
