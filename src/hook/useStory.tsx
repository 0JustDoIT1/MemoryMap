import {useState} from 'react';
import {DateType} from 'react-native-ui-datepicker';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  appUserState,
  koreaMapDataState,
  regionCountState,
  storyState,
} from 'src/recoil/atom';
import {AppStory, Story} from 'src/types/story';
import {_setDoc} from 'src/utils/firestore';
import {_update} from 'src/utils/realtime';
import {KoreaMapData} from 'src/types/koreaMap';
import {AppData} from 'src/types/account';
import {addStoryCountInKoreaMapData, countingStory} from 'src/utils/story';
import {updateRegionCountById} from 'src/utils/koreaMap';
import {dateToTimestamp} from 'src/utils/dateFormat';

const useStory = () => {
  const appUser = useRecoilValue(appUserState);
  const [koreaMapData, setKoreaMapData] = useRecoilState(koreaMapDataState);
  const [story, setStory] = useRecoilState(storyState);
  const [regionCount, setRegionCount] = useRecoilState(regionCountState);

  const [regionId, setRegionId] = useState<string>('');
  const [regionTitle, setRegionTitle] = useState<string>('');

  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [point, setPoint] = useState<number>(0);

  // 스토리 데이터 검증 및 DB 타입에 맞게 가공
  const onSettingStoryData = (edit: boolean, id?: string) => {
    if (
      regionId === '' ||
      !selectedStartDate ||
      !selectedEndDate ||
      title === '' ||
      contents === '' ||
      point === 0
    )
      throw new Error('스토리 미완성');

    let storyData: Partial<Story> = {
      regionId: regionId,
      startDate: dateToTimestamp(selectedStartDate),
      endDate: dateToTimestamp(selectedEndDate),
      title: title,
      contents: contents,
      point: point,
    };

    if (edit && id && id !== '') {
      storyData = {
        ...storyData,
        _id: story![id]._id,
        createdAt: story![id].createdAt,
        updatedAt: dateToTimestamp(new Date()),
      };
    } else {
      storyData = {
        ...storyData,
        _id: `${regionId}_${Number(new Date())}`,
        createdAt: dateToTimestamp(new Date()),
      };
    }

    return storyData as Story;
  };

  // 스토리 저장 및 수정
  const updateStoryById = async (edit: boolean, id?: string) => {
    const data = onSettingStoryData(edit, id);

    if (data) {
      const updateStory = {
        ...story!,
        [data._id]: data,
      };

      const updateKoreaMapData: KoreaMapData = addStoryCountInKoreaMapData(
        koreaMapData,
        data.regionId,
        1,
      );

      const updateCount = updateRegionCountById(
        regionCount,
        data.regionId,
        0,
        1,
      );

      const appStory: AppStory = {
        uid: appUser?.uid!,
        story: updateStory,
      };

      const appData: AppData = {
        uid: appUser?.uid!,
        email: appUser?.email!,
        koreaMapData: updateKoreaMapData,
        regionCount: updateCount,
      };
      await _setDoc(appStory).then(async () => {
        if (!edit) {
          await _update(appData).then(() => {
            setKoreaMapData(appData.koreaMapData);
            setRegionCount(appData.regionCount);
          });
        }
        setStory(appStory.story);
      });
    }
  };

  const getStoryById = (storyId: string) => {
    return story![storyId];
  };

  // 특정 스토리 삭제
  const deleteStoryById = async (regionId: string, id: string) => {
    const updateStory = {
      ...story,
    };
    delete updateStory[id];
    const updateKoreaMapData: KoreaMapData = addStoryCountInKoreaMapData(
      koreaMapData,
      regionId,
      -1,
    );
    const updateCount = updateRegionCountById(regionCount, regionId, 0, -1);

    const appStory: AppStory = {
      uid: appUser?.uid!,
      story: updateStory,
    };

    const appData: AppData = {
      uid: appUser?.uid!,
      email: appUser?.email!,
      koreaMapData: updateKoreaMapData,
      regionCount: updateCount,
    };

    await _setDoc(appStory).then(async () => {
      await _update(appData).then(() => {
        setKoreaMapData(appData.koreaMapData);
        setRegionCount(appData.regionCount);
        setStory(appStory.story);
      });
    });
  };

  return {
    koreaMapData,
    story,
    regionId,
    setRegionId,
    regionTitle,
    setRegionTitle,
    title,
    setTitle,
    contents,
    setContents,
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
    point,
    setPoint,
    updateStoryById,
    getStoryById,
    deleteStoryById,
    countingStory,
  };
};

export default useStory;
