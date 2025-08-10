import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomBottomSheet from '../common/bottomSheet';
import BrandCalendar from '../common/calendar';

interface IAddStoryCalendarSheet {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  start: Date;
  end: Date;
  onPick: (start: Date, end: Date) => void;
  onClose: () => void | undefined;
}

export default function AddStoryCalendarSheet({
  bottomSheetRef,
  start,
  end,
  onPick,
  onClose,
}: IAddStoryCalendarSheet) {
  return (
    <CustomBottomSheet
      ref={bottomSheetRef}
      snap="60%"
      contents={
        <BrandCalendar
          selectedStartDate={start}
          selectedEndDate={end}
          onDatePicker={onPick}
          close={onClose}
        />
      }
    />
  );
}
