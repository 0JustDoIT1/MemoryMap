import {DateType} from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

export const dateToFormatString = (date: DateType, format: string) => {
  if (!date) return '';
  return dayjs(date).format(format);
};
