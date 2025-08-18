import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, View} from 'react-native';
import {customColor} from 'src/style/customColor';
import {Text} from 'react-native-paper';
import DateTimePicker from 'react-native-ui-datepicker';
import {DateType} from 'react-native-ui-datepicker/lib/typescript/src/types';
import {staticStyles} from 'src/style/staticStyles';
import {dateTypeToDate} from 'src/utils/date/dateFormat';

interface IhandleChange {
  startDate: DateType;
  endDate: DateType;
}

interface BrandCalendar {
  selectedStartDate: Date;
  selectedEndDate: Date;
  onConfirm: (startDate: Date, endDate: Date) => void;
  close?: () => void;
}

const BrandCalendar = ({
  selectedStartDate,
  selectedEndDate,
  onConfirm,
  close,
}: BrandCalendar) => {
  const [startDate, setStartDate] = useState<DateType>(selectedStartDate);
  const [endDate, setEndDate] = useState<DateType>(selectedEndDate);

  useEffect(() => setStartDate(selectedStartDate), [selectedStartDate]);
  useEffect(() => setEndDate(selectedEndDate), [selectedEndDate]);

  const handleChange = ({startDate, endDate}: IhandleChange) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const isRangeValid = useMemo(
    () => Boolean(startDate && endDate),
    [startDate, endDate],
  );

  const handleConfirm = () => {
    if (!isRangeValid) return;
    const start = dateTypeToDate(startDate!);
    const end = dateTypeToDate(endDate!);
    // 보정: start > end면 swap
    const [from, to] = start > end ? [end, start] : [start, end];
    onConfirm(from, to);
    onConfirm(dateTypeToDate(startDate), dateTypeToDate(endDate));
  };

  return (
    <View className="flex justify-center">
      <View>
        <DateTimePicker
          mode="range"
          locale="ko"
          startDate={startDate}
          endDate={endDate}
          onChange={params => handleChange(params)}
          selectedItemColor={customColor.brandMain}
          headerButtonColor={customColor.gray}
          calendarTextStyle={staticStyles.calendarText}
          headerTextStyle={staticStyles.calendarHeaderText}
          weekDaysTextStyle={staticStyles.calendarText}
          selectedTextStyle={staticStyles.calendarSelectedText}
        />
      </View>
      <View>
        <View className="flex-row justify-between items-center">
          <View className="w-1/2">
            <Pressable className="p-2" onPress={handleReset}>
              <Text className="text-brandMain">초기화</Text>
            </Pressable>
          </View>
          <View className="w-1/2 flex-row justify-end items-center">
            <Pressable className="mx-8 p-2" onPress={close}>
              <Text className="text-brandMain">취소</Text>
            </Pressable>
            <Pressable
              className="p-2"
              onPress={handleConfirm}
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
