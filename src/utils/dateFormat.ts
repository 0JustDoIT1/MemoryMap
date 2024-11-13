import {format} from 'date-fns';

export const dateToFormatString = (date: string, formatStr: string) => {
  if (date !== '') return format(new Date(date), formatStr);
  else return '';
};
