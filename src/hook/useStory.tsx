import {useCallback, useState} from 'react';
import {DateType} from 'react-native-ui-datepicker';
import {useRecoilState, useRecoilValue} from 'recoil';
import {appUserState, storyState} from 'src/recoil/atom';
import {AppStory, Story} from 'src/types/story';
import {dateToDB} from 'src/utils/dateFormat';
import {_setCollection} from 'src/utils/firestore';
import {_update} from 'src/utils/realtime';

const useStory = () => {
  const [story, setStory] = useRecoilState(storyState);
  const appUser = useRecoilValue(appUserState);

  const [regionId, setRegionId] = useState<string>('');
  const [regionTitle, setRegionTitle] = useState<string>('');

  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [selectedStartDate, selectedSetStartDate] = useState<DateType>(null);
  const [selectedEndDate, selectedSetEndDate] = useState<DateType>(null);
  const [point, setPoint] = useState<number>(0);

  // 스토리 데이터 검증 및 DB 타입에 맞게 가공
  const onSettingStoryData = useCallback(() => {
    if (
      regionId === '' ||
      !selectedStartDate ||
      !selectedEndDate ||
      title === '' ||
      contents === '' ||
      point === 0
    )
      return false;

    const storyData: Story = {
      id: regionId,
      startDate: dateToDB(selectedStartDate),
      endDate: dateToDB(selectedEndDate),
      title: title,
      contents: contents,
      point: point,
      createdAt: dateToDB(new Date()),
    };

    return storyData;
  }, [regionId, selectedStartDate, selectedEndDate, title, contents, point]);

  // 스토리 저장
  const onUpdateStory = async () => {
    const data = onSettingStoryData();
    if (data) {
      const newStory = [...story!, data];

      const appStory: AppStory = {
        uid: appUser?.uid!,
        story: newStory,
      };

      await _setCollection(appStory).then(() => {
        setStory(appStory.story);
      });
    }
  };

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
    selectedSetStartDate,
    selectedEndDate,
    selectedSetEndDate,
    point,
    setPoint,
    onUpdateStory,
  };
};

export default useStory;
