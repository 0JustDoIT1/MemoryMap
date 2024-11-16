import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef, useState} from 'react';

interface SettingBottomSheet {
  title?: string;
  description?: string;
  contents: React.JSX.Element;
  snap: string;
}

const useCustomBottomSheet = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [bottomSheetTitle, setBottomSheetTitle] = useState<string | undefined>(
    '',
  );
  const [bottomSheetDescription, setBottomSheetDescription] = useState<
    string | undefined
  >('');
  const [bottomSheetContents, setBottomSheetContents] =
    useState<React.JSX.Element>(<></>);
  const [point, setPoint] = useState<string>('');

  // Bottom Sheet height setting [index0, index1]
  const snapPoints = useMemo(() => ['40%', point], [point]);

  // Bottom Sheet present event
  const handlePresentModalPress = useCallback(
    ({title, description, contents, snap}: SettingBottomSheet) => {
      setBottomSheetTitle(title);
      setBottomSheetDescription(description);
      setBottomSheetContents(contents);
      setPoint(snap);
      bottomSheetModalRef.current?.present();
    },
    [
      bottomSheetModalRef,
      bottomSheetTitle,
      bottomSheetDescription,
      bottomSheetContents,
      point,
    ],
  );

  // Bottom Sheet close event
  const handleClosePress = () => bottomSheetModalRef.current?.close();

  // Bottom Sheet close event when background touch
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [bottomSheetModalRef],
  );

  return {
    bottomSheetModalRef,
    snapPoints,
    bottomSheetTitle,
    bottomSheetDescription,
    bottomSheetContents,
    handlePresentModalPress,
    handleClosePress,
    renderBackdrop,
  };
};

export default useCustomBottomSheet;
