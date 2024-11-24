import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';
import {koreaMapDataState, regionCountState, storyState} from 'src/recoil/atom';
import {PointWithCount} from 'src/types/story';
import {getRegionTitleById, getTitleByRegionList} from 'src/utils/koreaMap';

const useDashboard = () => {
  const koreaMapData = useRecoilValue(koreaMapDataState);
  const story = useRecoilValue(storyState);
  const regionCount = useRecoilValue(regionCountState);

  // 색칠된 지역 숫자
  const regionCountNumber = useMemo(() => {
    const colorList = Object.values(koreaMapData).filter(
      region => region.type !== 'init',
    );
    return colorList.length;
  }, [koreaMapData]);

  // 총 스토리 수
  const allCountStoryNum = useMemo(() => {
    let count: number = 0;

    Object.values(koreaMapData).forEach(item => {
      count += item.story;
    });

    return count;
  }, [koreaMapData]);

  // 총 색깔로 색칠된 수
  const allCountColorNum = useMemo(() => {
    let count: number = 0;

    Object.values(koreaMapData).forEach(item => {
      if (item.type === 'color') {
        count += 1;
      }
    });

    return count;
  }, [koreaMapData]);

  // 총 사진으로 색칠된 수
  const allCountPhotoNum = useMemo(() => {
    let count: number = 0;

    Object.values(koreaMapData).forEach(item => {
      if (item.type === 'photo') {
        count += 1;
      }
    });

    return count;
  }, [koreaMapData]);

  // 색칠만 되고 스토리는 없는 지역 수
  const noStoryRegionNumber = useMemo(
    () =>
      Object.values(koreaMapData).filter(
        item => item.type !== 'init' && item.story === 0,
      ).length,
    [koreaMapData],
  );

  // 가장 많이 색칠된 메인 지역의 id 배열, 지역명, 스토리 수 반환
  const mostColoredMainRegion = () => {
    const colorNumArr = Object.values(regionCount).map(item => item.color);
    const MathColorNum = Math.max(...colorNumArr);

    const regionIdArr =
      MathColorNum !== 0
        ? Object.keys(regionCount).filter(
            key => regionCount[key].color === MathColorNum,
          )
        : [];

    const regionTitle: string =
      regionIdArr.length >= 1 ? getTitleByRegionList(regionIdArr[0]) : '';

    return {regionIdArr, regionTitle, MathColorNum};
  };

  // 스토리 수가 가장 많은 메인 지역의 id 배열, 지역명, 스토리 수 반환
  const mostStoryMainRegion = () => {
    const storyNumArr = Object.values(koreaMapData).map(item => item.story);
    const MathStoryNum = Math.max(...storyNumArr);

    const regionIdArr =
      MathStoryNum !== 0
        ? Object.keys(koreaMapData).filter(
            key => koreaMapData[key].story === MathStoryNum,
          )
        : [];

    const regionTitle: string =
      regionIdArr.length >= 1
        ? getRegionTitleById(koreaMapData, regionIdArr[0])
        : '';

    return {regionIdArr, regionTitle, MathStoryNum};
  };

  // 평균 평점 높은 지역
  const maxPointRegion = () => {
    let pointJson: PointWithCount = {};

    if (story && JSON.stringify(story) !== '{}') {
      Object.values(story!).forEach(item => {
        if (pointJson[item.regionId]) {
          pointJson[item.regionId] = {
            id: item.regionId,
            point: pointJson[item.regionId].point + item.point,
            count: pointJson[item.regionId].count! + 1,
          };
        } else {
          pointJson[item.regionId] = {
            id: item.regionId,
            point: item.point,
            count: 1,
          };
        }
      });

      Object.values(pointJson).forEach(item => {
        pointJson[item.id] = {
          id: item.id,
          point: Number((item.point / item.count!).toFixed(2)),
        };
      });
    }

    const pointArr = Object.values(pointJson).map(item => item.point);
    const mathPointNum = pointArr.length >= 1 ? Math.max(...pointArr) : 0;

    const regionIdArr =
      mathPointNum !== 0
        ? Object.keys(pointJson).filter(
            key => pointJson[key].point === mathPointNum,
          )
        : [];

    const regionTitle: string =
      regionIdArr.length >= 1
        ? getRegionTitleById(koreaMapData, regionIdArr[0])
        : '';

    return {regionIdArr, regionTitle, mathPointNum};
  };

  return {
    koreaMapData,
    regionCountNumber,
    allCountStoryNum,
    allCountColorNum,
    allCountPhotoNum,
    noStoryRegionNumber,
    mostColoredMainRegion,
    mostStoryMainRegion,
    maxPointRegion,
  };
};

export default useDashboard;
