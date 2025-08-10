import {useEffect, useMemo, useState} from 'react';
import {IStory} from 'src/types/story';
import {dateToFormatString, dateTypeToDate} from 'src/utils/dateFormat';
import {getRegionTitleById} from 'src/utils/koreaMap.util';

const useStoryInput = (edit: boolean, data: IStory) => {
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

    const story: IStory = {
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

  // 저장 버튼 비활성화 조건
  const isSaveDisabled = useMemo(
    () =>
      regionId === '' ||
      !selectedStartDate ||
      !selectedEndDate ||
      title.trim() === '' ||
      contents.trim() === '' ||
      point === 0,
    [regionId, selectedStartDate, selectedEndDate, title, contents, point],
  );

  // 날짜 label
  const dateLabel = useMemo(() => {
    if (selectedStartDate && selectedEndDate) {
      return `${dateToFormatString(selectedStartDate, 'YYYY.MM.DD (ddd)')} ~ ${dateToFormatString(selectedEndDate, 'YYYY.MM.DD (ddd)')}`;
    }
    return '';
  }, [selectedStartDate, selectedEndDate]);

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
    isSaveDisabled,
    dateLabel,
  };
};

export default useStoryInput;
