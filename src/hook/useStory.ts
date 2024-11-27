import {useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {appUserState, storyState} from 'src/recoil/atom';
import {AppStory, StoryData, Story} from 'src/types/story';
import {_deleteDoc, _getDoc, _setDoc} from 'src/utils/firestore';
import {_readRealtime, _updateRealtime} from 'src/utils/realtime';
import {dateToTimestamp} from 'src/utils/dateFormat';

const useStory = () => {
  const appUser = useRecoilValue(appUserState);
  const [story, setStory] = useRecoilState(storyState);

  const [regionId, setRegionId] = useState<string>('');
  const [regionTitle, setRegionTitle] = useState<string>('');

  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [point, setPoint] = useState<number>(0);

  // 로그인 시 firebase에서 데이터 불러오고 recoil에 세팅
  const getStoryFromFirebase = async (uid: string) => {
    const story = await _getDoc(uid).then(res => res?.story);

    setStory(story);
  };

  // 회원가입 시 firebase에 데이터 저장하고 recoil에 세팅
  const setStoryFromFirebase = async (uid: string) => {
    const appStoryInit: AppStory = {
      uid: uid,
      story: {},
    };

    await _setDoc(appStoryInit);

    setStory({});
  };

  // 스토리 추가
  const addStoryByRegionId = async () => {
    if (
      regionId === '' ||
      !selectedStartDate ||
      !selectedEndDate ||
      title === '' ||
      contents === '' ||
      point === 0
    )
      throw new Error('스토리 미완성');

    const storyData: StoryData = {
      _id: `${regionId}_${Number(new Date())}`,
      regionId: regionId,
      startDate: dateToTimestamp(selectedStartDate),
      endDate: dateToTimestamp(selectedEndDate),
      title: title,
      contents: contents,
      point: point,
      createdAt: dateToTimestamp(new Date()),
    };

    const updateStory = {
      ...story!,
      [storyData._id]: storyData,
    };

    const appStory: AppStory = {
      uid: appUser?.uid!,
      story: updateStory,
    };

    await _setDoc(appStory).then(() => {
      setStory(appStory.story);
    });
  };

  // 스토리 저장 및 수정 -> Firebase & Recoil
  const updateStoryById = async (id: string) => {
    if (
      regionId === '' ||
      !selectedStartDate ||
      !selectedEndDate ||
      title === '' ||
      contents === '' ||
      point === 0
    )
      throw new Error('스토리 미완성');

    const storyData: StoryData = {
      _id: story![id]._id,
      regionId: regionId,
      startDate: dateToTimestamp(selectedStartDate),
      endDate: dateToTimestamp(selectedEndDate),
      title: title,
      contents: contents,
      point: point,
      createdAt: story![id].createdAt,
      updatedAt: dateToTimestamp(new Date()),
    };

    const updateStory = {
      ...story!,
      [storyData._id]: storyData,
    };

    const appStory: AppStory = {
      uid: appUser?.uid!,
      story: updateStory,
    };

    await _setDoc(appStory).then(() => {
      setStory(appStory.story);
    });
  };

  // 특정 스토리 삭제 -> Firebase & Recoil
  const deleteStoryById = async (id: string) => {
    const updateStory = {
      ...story,
    };
    delete updateStory[id];

    const appStory: AppStory = {
      uid: appUser?.uid!,
      story: updateStory,
    };

    await _setDoc(appStory).then(() => {
      setStory(appStory.story);
    });
  };

  // region Id에 해당하는 스토리를 제거한 후 Json 반환
  const getFilterStoryJson = (regionId: string) => {
    let updateStory: Story = {};

    const storyJson = {
      ...story,
    };

    const filterStoryArr = Object.values(storyJson).filter(
      item => item.regionId !== regionId,
    );
    filterStoryArr.forEach(item => {
      updateStory[item._id] = {...item};
    });

    return updateStory;
  };

  // 삭제해야 될 스토리 Json에서 개수 반환
  const getDeleteStoryCount = (regionId: string) => {
    const updateStory = getFilterStoryJson(regionId);

    const deleteCount =
      Object.values({...story}).length - Object.values(updateStory).length;

    return deleteCount * -1;
  };

  // region id에 해당하는 스토리를 제거 -> Firebase & Recoil
  const deleteStoryByRegionId = async (regionId: string) => {
    const updateStory = getFilterStoryJson(regionId);

    const appStory: AppStory = {
      uid: appUser?.uid!,
      story: updateStory,
    };

    await _setDoc(appStory).then(() => {
      setStory(appStory.story);
    });
  };

  // 스토리 초기화
  const resetStory = async () => {
    await _deleteDoc(appUser?.uid!).then(() => {
      setStory({});
    });
  };

  return {
    story,
    setStory,
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
    getStoryFromFirebase,
    setStoryFromFirebase,
    addStoryByRegionId,
    updateStoryById,
    deleteStoryById,
    getDeleteStoryCount,
    deleteStoryByRegionId,
    resetStory,
  };
};

export default useStory;
