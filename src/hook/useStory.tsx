import {useCallback, useState} from 'react';
import {DateType} from 'react-native-ui-datepicker';
import {useRecoilState, useRecoilValue} from 'recoil';
import {appUserState, storyState} from 'src/recoil/atom';
import {AppStory, Story} from 'src/types/story';
import {_setDoc} from 'src/utils/firestore';
import {_update} from 'src/utils/realtime';
import useKoreaMap from './useKoreaMap';

const useStory = () => {
  const [story, setStory] = useRecoilState(storyState);
  const appUser = useRecoilValue(appUserState);

  const {countingStory} = useKoreaMap();

  const [regionId, setRegionId] = useState<string>('');
  const [regionTitle, setRegionTitle] = useState<string>('');

  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [selectedStartDate, setSelectedStartDate] = useState<DateType>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<DateType>(null);
  const [point, setPoint] = useState<number>(0);

  // 스토리 데이터 검증 및 DB 타입에 맞게 가공
  const onSettingStoryData = useCallback(
    (edit: boolean, id?: string) => {
      if (
        regionId === '' ||
        !selectedStartDate ||
        !selectedEndDate ||
        title === '' ||
        contents === '' ||
        point === 0
      )
        throw Error;

      let storyData: Partial<Story> = {
        regionId: regionId,
        startDate: selectedStartDate.toString(),
        endDate: selectedEndDate.toString(),
        title: title,
        contents: contents,
        point: point,
      };

      if (edit && id) {
        storyData = {
          ...storyData,
          _id: story![id]._id,
          createdAt: story![id].createdAt,
          updatedAt: new Date().toString(),
        };
      } else {
        storyData = {
          ...storyData,
          _id: `${regionId}_${Number(new Date())}`,
          createdAt: new Date().toString(),
        };
      }

      return storyData as Story;
    },
    [regionId, selectedStartDate, selectedEndDate, title, contents, point],
  );

  // 스토리 저장 및 수정
  const updateStory = useCallback(
    async (edit: boolean, id?: string) => {
      const data = onSettingStoryData(edit, id);

      if (data) {
        const newStory = {
          ...story!,
          [data._id]: data,
        };

        const appStory: AppStory = {
          uid: appUser?.uid!,
          story: newStory,
        };

        await _setDoc(appStory).then(async () => {
          if (edit) {
            setStory(appStory.story);
          } else {
            await countingStory(data.regionId, 1).then(() => {
              setStory(appStory.story);
            });
          }
        });
      }
    },
    [story],
  );

  const deleteStory = useCallback(
    async (regionId: string, id: string) => {
      const newStory = {
        ...story,
      };

      delete newStory[id];

      const appStory: AppStory = {
        uid: appUser?.uid!,
        story: newStory,
      };

      await _setDoc(appStory).then(async () => {
        await countingStory(regionId, -1).then(() => {
          setStory(appStory.story);
        });
      });
    },
    [story],
  );

  return {
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
    updateStory,
    deleteStory,
  };
};

export default useStory;
