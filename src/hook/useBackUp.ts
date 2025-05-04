import {WebClientId} from '@env';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {FileSystem} from 'react-native-file-access';
import {appBackUpRoute} from 'src/constants/app';
import {AppData} from 'src/types/appData';
import {getAllKoreaMapData, updateKoreaMapData} from 'src/utils/koreaMap.db';
import {addStoryByRegionId, getStoryAll} from 'src/utils/story.db';
import {decryptData, encryptData} from 'src/utils/crypto';
import {
  CloudStorage,
  CloudStorageProvider,
  CloudStorageScope,
} from 'react-native-cloud-storage';

const useBackUp = () => {
  // Access the client
  const queryClient = useQueryClient();

  // const [accessToken, setAccessToken] = useState<string | null>(null);

  // Google Sign In Configure
  useEffect(() => {
    const googleSigninConfigure = GoogleSignin.configure({
      webClientId: WebClientId,
      scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/drive.appdata',
      ],
      offlineAccess: true,
    });
    return googleSigninConfigure;
  }, []);

  // // CloudStorage Setting
  // useEffect(() => {
  //   if (
  //     accessToken &&
  //     CloudStorage.getProvider() === CloudStorageProvider.GoogleDrive
  //   ) {
  //     CloudStorage.setProviderOptions({
  //       accessToken: accessToken,
  //       strictFilenames: true,
  //       scope: CloudStorageScope.AppData,
  //     });
  //   }
  // }, [accessToken]);

  // Sign in Google
  const googleSignIn = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {type} = await GoogleSignin.signIn();

    if (type === 'success') {
      const {accessToken} = await GoogleSignin.getTokens();
      // setAccessToken(accessToken);
      const googleCloud = new CloudStorage(CloudStorageProvider.GoogleDrive, {
        accessToken: accessToken,
        strictFilenames: true,
        scope: CloudStorageScope.AppData,
      });

      return googleCloud;
    } else if (type === 'cancelled') {
      return;
    }
  };

  // Create backup data & encrypt
  const createBackupData = async () => {
    const koreaMapData = await getAllKoreaMapData();
    const story = await getStoryAll();
    const photoRegionArray = Object.values(koreaMapData).filter(
      item => item.type === 'photo',
    );
    const mapImage: {[key: string]: string} = {};
    const zoomImage: {[key: string]: string} = {};

    for (let i = 0; i < photoRegionArray.length; i++) {
      const image1 = await FileSystem.readFile(
        photoRegionArray[i].imageUrl!,
        'base64',
      );
      const image2 = await FileSystem.readFile(
        photoRegionArray[i].zoomImageUrl!,
        'base64',
      );
      mapImage[photoRegionArray[i].id] = image1;
      zoomImage[photoRegionArray[i].id] = image2;
    }

    const appData: AppData = {
      koreaMapData: koreaMapData,
      story: story,
      mapImage: mapImage,
      zoomImage: zoomImage,
    };

    const encryptAppData = encryptData(JSON.stringify(appData));

    return encryptAppData;
  };

  // BackUp App Data
  const backupAppData = async () => {
    const googleCloud = await googleSignIn();
    if (googleCloud) {
      const data = await createBackupData();
      await googleCloud.writeFile(`/${appBackUpRoute}.txt`, data);
      await GoogleSignin.signOut();
    } else throw new Error('Google Drive에 연결하지 못했습니다.');
  };

  // Get Backup data & decrypt
  const getBackupData = async (data: string) => {
    const appData: AppData = JSON.parse(decryptData(data));

    const koreaMapData = appData.koreaMapData;
    const story = appData.story;
    const mapImage = appData.mapImage;
    const zoomImage = appData.zoomImage;

    const koreaMapDataArray = Object.values(koreaMapData);

    for (let i = 0; i < Object.values(koreaMapData).length; i++) {
      if (koreaMapDataArray[i].type === 'photo') {
        const existMapImage = await FileSystem.exists(
          koreaMapDataArray[i].imageUrl!,
        );
        const existZoomImage = await FileSystem.exists(
          koreaMapDataArray[i].zoomImageUrl!,
        );
        if (existMapImage)
          await FileSystem.unlink(koreaMapDataArray[i].imageUrl!);
        if (existZoomImage)
          await FileSystem.unlink(koreaMapDataArray[i].zoomImageUrl!);

        await FileSystem.writeFile(
          koreaMapDataArray[i].imageUrl!,
          mapImage[koreaMapDataArray[i].id],
          'base64',
        );
        await FileSystem.writeFile(
          koreaMapDataArray[i].zoomImageUrl!,
          zoomImage[koreaMapDataArray[i].id],
          'base64',
        );
      }
      await updateKoreaMapData(koreaMapDataArray[i]);
    }

    if (story.length >= 1) {
      story.forEach(async item => await addStoryByRegionId(item));
    }

    await queryClient.invalidateQueries({
      queryKey: ['koreaMapData'],
      refetchType: 'all',
    });
    await queryClient.invalidateQueries({
      queryKey: ['story'],
      refetchType: 'all',
    });
    await queryClient.invalidateQueries({
      queryKey: ['colorMapList'],
      refetchType: 'all',
    });
    await queryClient.invalidateQueries({
      queryKey: ['viewStory'],
      refetchType: 'all',
    });
    await queryClient.invalidateQueries({
      queryKey: ['dashboardKoreaMap'],
      refetchType: 'all',
    });
    await queryClient.invalidateQueries({
      queryKey: ['dashboardStory'],
      refetchType: 'all',
    });
  };

  // Get Backup Data
  const getAppData = async () => {
    const googleCloud = await googleSignIn();
    if (googleCloud) {
      const exist = await googleCloud.exists(`/${appBackUpRoute}.txt`);
      if (exist) {
        const data = await googleCloud.readFile(`/${appBackUpRoute}.txt`);
        await getBackupData(data);
        await GoogleSignin.signOut();
        return true;
      } else return false;
    } else throw new Error('Google Drive에 연결하지 못했습니다.');
  };

  return {backupAppData, getAppData};
};

export default useBackUp;
