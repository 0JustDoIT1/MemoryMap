import {DateType} from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

// DateType을 원하는 형식 String으로 변환
export const dateToFormatString = (date: DateType, format: string) => {
  if (!date) return '';
  return dayjs(date).format(format);
};

// DateType을 DB에 넣기 위해 동일한 Date 타입으로 변환
export const dateToDB = (date: DateType) => {
  return dayjs(date).toDate();
};

//
export const dateToStartOf = (date: DateType, start: dayjs.OpUnitType) => {
  return dayjs(date).startOf(start);
};
