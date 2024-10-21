import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef, useState} from 'react';

interface SettingBottomSheet {
  title: string;
  description?: string;
  contents: React.JSX.Element;
  snap: string;
}

const useCustomBottomSheet = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [bottomSheetTitle, setbottomSheetTitle] = useState<string>('');
  const [bottomSheetDescription, setBottomSheetDescription] = useState<
    string | undefined
  >('');
  const [bottomSheetContents, setbottomSheetContents] =
    useState<React.JSX.Element>(<></>);
  const [point, setPoint] = useState<string>('');

  // Bottom Sheet height setting [index0, index1]
  const snapPoints = useMemo(() => ['40%', point], [point]);
  // Bottom Sheet present event
  const handlePresentModalPress = useCallback(
    ({title, description, contents, snap}: SettingBottomSheet) => {
      setbottomSheetTitle(title);
      setBottomSheetDescription(description);
      setbottomSheetContents(contents);
      setPoint(snap);
      bottomSheetModalRef.current?.present();
    },
    [bottomSheetTitle, bottomSheetDescription, bottomSheetContents, point],
  );
  // Bottom Sheet close event
  const handleClosePress = () => bottomSheetModalRef.current?.close();
  // Bottom Sheet close event when background touch
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
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
