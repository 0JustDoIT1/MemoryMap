import {DateType} from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import {Timestamp} from '@react-native-firebase/firestore';

export const dateToTimestamp = (date: Date) => {
  return Timestamp.fromDate(date);
};

export const timestampToDate = (timestamp: Timestamp) => {
  return timestamp.toDate();
};

// DateType을 원하는 형식 String으로 변환
export const dateToFormatString = (date: DateType, format: string) => {
  if (!date) return '';
  return dayjs(date).format(format);
};

// calendar에서 DateType을 Date로 변환
export const dateTypeToDate = (date: DateType) => {
  return dayjs(date).toDate();
};
