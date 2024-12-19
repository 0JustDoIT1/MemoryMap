import {useEffect, useState} from 'react';
import {Story} from 'src/types/story';
import {dateToFormatString, dateTypeToDate} from 'src/utils/dateFormat';
import {getRegionTitleById} from 'src/utils/koreaMap.util';

const useStoryInput = (edit: boolean, data: Story) => {
  const [regionId, setRegionId] = useState<string>('');
  const [regionTitle, setRegionTitle] = useState<string>('');

  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [point, setPoint] = useState<number>(0);

  // Set state to region id
  useEffect(() => {
    if (edit) {
      setRegionId(data.regionId);
      setRegionTitle(getRegionTitleById(data.regionId));
      setTitle(data.title);
      setContents(data.contents);
      setSelectedStartDate(dateTypeToDate(data.startDate));
      setSelectedEndDate(dateTypeToDate(data.endDate));
      setPoint(data.point);
    } else if (!edit && data.regionId !== '') {
      setRegionId(data.regionId);
      setRegionTitle(getRegionTitleById(data.regionId));
    }
  }, [edit, data]);

  // Setting story data
  const settingStoryData = () => {
    if (
      regionId === '' ||
      !selectedStartDate ||
      !selectedEndDate ||
      title === '' ||
      contents === '' ||
      point === 0
    )
      throw new Error('스토리 미완성');

    const id = edit ? data!.id : `${regionId}_${Number(new Date())}`;
    const createdAt = edit
      ? data!.createdAt
      : dateToFormatString(new Date(), 'YYYY-MM-DD HH:mm:ss');

    const story: Story = {
      id: id,
      regionId: regionId,
      startDate: dateToFormatString(selectedStartDate, 'YYYY-MM-DD HH:mm:ss'),
      endDate: dateToFormatString(selectedEndDate, 'YYYY-MM-DD HH:mm:ss'),
      title: title,
      contents: contents,
      point: point,
      createdAt: createdAt,
      updatedAt: dateToFormatString(new Date(), 'YYYY-MM-DD HH:mm:ss'),
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

export default useStoryInput;
