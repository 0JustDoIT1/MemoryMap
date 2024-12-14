import {WebClientId} from '@env';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  GDrive,
  INFINITE_TIMEOUT,
} from '@robinbobin/react-native-google-drive-api-wrapper';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {FileSystem} from 'react-native-file-access';
import {appBackUpRoute} from 'src/constants/app';
import {AppData} from 'src/types/appData';
import {getAllKoreaMapData, updateKoreaMapData} from 'src/database/koreaMap.db';
import {addStoryByRegionId, getStoryAll} from 'src/database/story.db';
import {dateToFormatString, dateToSeoulTime} from 'src/utils/dateFormat';

const useBackUp = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Google Sign In Configure
  useEffect(() => {
    const googleSigninConfigure = GoogleSignin.configure({
      webClientId: WebClientId,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    return googleSigninConfigure;
  }, []);

  // Sign in Google Drive
  const signInGoogleDrive = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {type} = await GoogleSignin.signIn();

    const gDrive = new GDrive();
    if (type === 'success') {
      const {accessToken} = await GoogleSignin.getTokens();

      gDrive.accessToken = accessToken;
      gDrive.fetchTimeout = INFINITE_TIMEOUT;

      return gDrive;
    } else if (type === 'cancelled') {
      return;
    }
  };

  // Create BackUp folder
  const createBackUpFolder = async (gDrive: GDrive) => {
    const folderName = `${appBackUpRoute}-${dateToFormatString(new Date(), 'YYYY.MM.DD HH:mm:ss')}`;
    await gDrive.files.createIfNotExists(
      {q: `name = '${folderName}'`},
      gDrive.files.newMetadataOnlyUploader().setRequestBody({
        name: `${folderName}`,
        mimeType: 'application/vnd.google-apps.folder',
      }),
    );

    const rootFolder = await gDrive.files.list({
      q: `name contains '${appBackUpRoute}'`,
      orderBy: 'createdTime desc',
    });

    const rootFolderId = rootFolder.files[0].id;

    return rootFolderId;
  };

  // BackUp App Data -> Firebase
  const backUpAppData = async () => {
    const gDrive = await signInGoogleDrive();

    if (gDrive) {
      const koreaMapData = await getAllKoreaMapData();
      const story = await getStoryAll();
      const photoRegionArray = Object.values(koreaMapData).filter(
        item => item.type === 'photo',
      );
      const mapImage: {[key: string]: string} = {};

      for (let i = 0; i < photoRegionArray.length; i++) {
        const image = await FileSystem.readFile(
          photoRegionArray[i].imageUrl!,
          'base64',
        );
        mapImage[photoRegionArray[i].id] = image;
      }

      const appData: AppData = {
        koreaMapData: koreaMapData,
        story: story,
        image: mapImage,
      };

      await gDrive.files
        .newMultipartUploader()
        .setDataMimeType('application/json')
        .setData(JSON.stringify(appData))
        .setRequestBody({
          name:
            appBackUpRoute + dateToSeoulTime(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        })
        .execute();

      await GoogleSignin.signOut();

      return true;
    } else return false;
  };

  // Get App Data -> Firebase
  const getAppData = async () => {
    const gDrive = await signInGoogleDrive();

    if (gDrive) {
      const fileList = await gDrive.files.list({
        q: `name contains '${appBackUpRoute}'`,
        orderBy: 'createdTime desc',
      });

      const fileId = fileList.files[0].id;

      const appData: AppData = await gDrive.files.getJson(fileId);

      const koreaMapData = appData.koreaMapData;
      const story = appData.story;
      const image = appData.image;

      const koreaMapDataArray = Object.values(koreaMapData);

      for (let i = 0; i < Object.values(koreaMapData).length; i++) {
        if (koreaMapDataArray[i].type === 'photo') {
          const existImage = await FileSystem.exists(
            koreaMapDataArray[i].imageUrl!,
          );
          if (existImage)
            await FileSystem.unlink(koreaMapDataArray[i].imageUrl!);

          await FileSystem.writeFile(
            koreaMapDataArray[i].imageUrl!,
            image[koreaMapDataArray[i].id],
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

      await GoogleSignin.signOut();
      return true;
    } else return false;
  };

  return {backUpAppData, getAppData};
};

export default useBackUp;
