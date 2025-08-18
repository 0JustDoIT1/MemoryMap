import {DateType} from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
// import {Timestamp} from '@react-native-firebase/firestore';

// // Date를 Firebase Timestamp로 변환
// export const dateToTimestamp = (date: Date) => {
//   return Timestamp.fromDate(date);
// };

// // string to Firebase Timestamp
// export const stringToTimeStamp = (date: string) => {
//   const json = JSON.parse(date);

//   return new Timestamp(json.seconds, json.nanoseconds);
// };

// // Firebase Timestamp를 Date로 변환
// export const timestampToDate = (timestamp: Timestamp) => {
//   return timestamp.toDate();
// };

// DateType을 원하는 형식 String으로 변환
export const dateToFormatString = (date: DateType, format: string) => {
  if (!date) return '';
  return dayjs(date).format(format);
};

// calendar에서 DateType을 Date로 변환
export const dateTypeToDate = (date: DateType) => {
  return dayjs(date).toDate();
};
