import {useState} from 'react';
import {Story} from 'src/types/story';

const useStory = (uid: string) => {
  const [regionId, setRegionId] = useState<string>('');
  const [regionTitle, setRegionTitle] = useState<string>('');

  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [point, setPoint] = useState<number>(0);

  // Setting story data
  const settingStoryData = (edit: boolean, data?: Story) => {
    if (
      regionId === '' ||
      !selectedStartDate ||
      !selectedEndDate ||
      title === '' ||
      contents === '' ||
      point === 0
    )
      throw new Error('스토리 미완성');

    const id = edit ? data!.id : `${uid}_${Number(new Date())}`;
    const createdAt = edit ? data!.createdAt : new Date().toString();

    const story: Story = {
      id: id,
      uid: uid,
      regionId: regionId,
      startDate: selectedStartDate.toString(),
      endDate: selectedEndDate.toString(),
      title: title,
      contents: contents,
      point: point,
      createdAt: createdAt,
      updatedAt: new Date().toString(),
    };

    return story;
  };

  return {
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
    settingStoryData,
  };
};

export default useStory;
