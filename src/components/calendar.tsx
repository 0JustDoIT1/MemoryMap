import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {customColor} from 'src/style/customColor';
import {Text} from 'react-native-paper';
import DateTimePicker from 'react-native-ui-datepicker';
import {DateType} from 'react-native-ui-datepicker/lib/typescript/src/types';
import {customStyle} from 'src/style/customStyle';
import {dateTypeToDate} from 'src/utils/dateFormat';

interface BrandCalendar {
  selectedStartDate: Date;
  selectedEndDate: Date;
  onDatePicker: (startDate: Date, endDate: Date) => void;
  close?: () => void;
}

const BrandCalendar = ({
  selectedStartDate,
  selectedEndDate,
  onDatePicker,
  close,
}: BrandCalendar) => {
  const [startDate, setStartDate] = useState<DateType>(selectedStartDate);
  const [endDate, setEndDate] = useState<DateType>(selectedEndDate);

  const onDateChange = ({
    startDate,
    endDate,
  }: {
    startDate: DateType;
    endDate: DateType;
  }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const onDateReset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const onSelectDate = () => {
    if (startDate && endDate)
      onDatePicker(dateTypeToDate(startDate), dateTypeToDate(endDate));
  };

  return (
    <View className="flex justify-center">
      <View>
        <DateTimePicker
          mode="range"
          locale="ko"
          startDate={startDate}
          endDate={endDate}
          onChange={params => onDateChange(params)}
          selectedItemColor={customColor.brandMain}
          headerButtonColor={customColor.gray}
          calendarTextStyle={customStyle().calendarText}
          headerTextStyle={customStyle().calendarHeaderText}
          weekDaysTextStyle={customStyle().calendarText}
          selectedTextStyle={customStyle().calendarSelectedText}
        />
      </View>
      <View>
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
              disabled={!startDate || !endDate}>
              <Text
                className={`${
                  !startDate || !endDate ? 'text-gray-400' : 'text-brandMain'
                }`}>
                선택
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BrandCalendar;
