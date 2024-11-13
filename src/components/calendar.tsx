import {useState} from 'react';
import {Pressable, View} from 'react-native';
import CalendarPicker, {
  ChangedDate,
  DateParsable,
} from 'react-native-calendar-picker';
import {customStyle} from 'src/style/customStyle';
import {useAppTheme} from 'src/style/paperTheme';
import {Divider, Text} from 'react-native-paper';

interface BrandCalendar {
  selectedStartDate: DateParsable;
  selectedEndDate: DateParsable;
  onDatePicker: (startDate: Date, endDate: Date) => void;
  close?: () => void;
}

const BrandCalendar = ({
  selectedStartDate,
  selectedEndDate,
  onDatePicker,
  close,
}: BrandCalendar) => {
  const theme = useAppTheme();

  const [startDate, setStartDate] = useState<DateParsable>(selectedStartDate);
  const [endDate, setEndDate] = useState<DateParsable>(selectedEndDate);

  const onDateChange = (date: Date, type: ChangedDate) => {
    if (type === 'END_DATE') {
      setEndDate(date);
    }
    if (type === 'START_DATE') {
      setStartDate(date);
      setEndDate('');
    }
  };

  const onDateReset = () => {
    setStartDate('');
    setEndDate('');
  };

  const onSelectDate = () => {
    if (startDate !== '' && endDate !== '')
      onDatePicker(startDate as Date, endDate as Date);
  };

  return (
    <View className="flex justify-center">
      <CalendarPicker
        allowRangeSelection={true}
        weekdays={['일', '월', '화', '수', '목', '금', '토']}
        months={[
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '11월',
          '12월',
        ]}
        nextTitleStyle={customStyle().calendarNextTitleStyle}
        previousTitleStyle={customStyle().calendarPreviousTitleStyle}
        yearTitleStyle={customStyle().calendarYearTitleStyle}
        monthTitleStyle={customStyle().calendarMonthTitleStyle}
        textStyle={customStyle().calendarTextStyle}
        previousTitle="&lt;"
        nextTitle="&gt;"
        todayBackgroundColor={theme.colors.info}
        selectedDayColor={theme.colors.brandMain}
        selectedDayTextColor="#FFFFFF"
        selectedStartDate={startDate}
        selectedEndDate={endDate}
        onDateChange={onDateChange}
      />

      <View className="px-4">
        <Divider className="w-full my-4 bg-blur" />
        <View className="flex-row justify-between items-center">
          <View className="w-1/2">
            <Pressable className="p-2" onPress={onDateReset}>
              <Text className="text-brandMain">초기화</Text>
            </Pressable>
          </View>
          <View className="w-1/2 flex-row justify-end items-center">
            <Pressable className="mx-8 p-2" onPress={close}>
              <Text className="text-brandMain">취소</Text>
            </Pressable>
            <Pressable
              className="p-2"
              onPress={onSelectDate}
              disabled={startDate === '' || endDate === ''}>
              <Text className="text-brandMain">선택</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BrandCalendar;
