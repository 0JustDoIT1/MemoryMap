import {DateType} from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

// DateType을 원하는 형식 String으로 변환
export const dateToFormatString = (date: DateType, format: string) => {
  if (!date) return '';
  return dayjs(date).format(format);
};

// DateType을 Date로 변환
export const dateToDB = (date: DateType) => {
  return dayjs(date).toDate();
};

// 해당 조건에 맞는 시작 날짜 반환
export const dateToStartOf = (date: DateType, start: dayjs.OpUnitType) => {
  return dayjs(date).startOf(start);
};
