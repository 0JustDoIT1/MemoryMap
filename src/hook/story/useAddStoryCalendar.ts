import {useCallback} from 'react';
import {Keyboard} from 'react-native';

interface IUseAddStoryCalendar {
  setSelectedStartDate: (d: Date) => void;
  setSelectedEndDate: (d: Date) => void;
  handlePresentPress: () => void;
  handleClosePress: () => void;
}

export const useAddStoryCalendar = ({
  setSelectedStartDate,
  setSelectedEndDate,
  handlePresentPress,
  handleClosePress,
}: IUseAddStoryCalendar) => {
  // BottomSheet opens when date is selected
  const onPressDate = useCallback(() => {
    Keyboard.dismiss();
    handlePresentPress();
  }, [handlePresentPress]);

  // Select Date
  const onDatePicker = useCallback(
    (start: Date, end: Date) => {
      setSelectedStartDate(start);
      setSelectedEndDate(end);
      handleClosePress();
    },
    [setSelectedStartDate, setSelectedEndDate, handleClosePress],
  );

  return {
    onPressDate,
    onDatePicker,
  };
};
