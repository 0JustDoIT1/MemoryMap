import {useCallback} from 'react';
import {Keyboard} from 'react-native';

interface IUseStoryCalendar {
  setSelectedStartDate: (d: Date) => void;
  setSelectedEndDate: (d: Date) => void;
  handlePresentPress: () => void;
  handleClosePress: () => void;
}

export const useStoryCalendar = ({
  setSelectedStartDate,
  setSelectedEndDate,
  handlePresentPress,
  handleClosePress,
}: IUseStoryCalendar) => {
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
