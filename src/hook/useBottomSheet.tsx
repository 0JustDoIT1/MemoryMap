import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef, useState} from 'react';
import {KoreaRegionList} from 'src/constants/regionList';

interface SettingBottomSheet {
  title: string;
  description?: string;
  contents: React.JSX.Element;
  snap: string;
}

interface SettingMapSheet {
  title: string;
  code: string;
  snap: string;
}

const useCustomBottomSheet = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [bottomSheetTitle, setBottomSheetTitle] = useState<string>('');
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
    [bottomSheetTitle, bottomSheetDescription, bottomSheetContents, point],
  );
  // Bottom Sheet close event
  const handleClosePress = () => bottomSheetModalRef.current?.close();
  // Bottom Sheet close event when background touch
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  /** --------------------Map Bottom Sheet--------------------------- */
  const [tag, setTag] = useState<string[] | undefined>([]);
  const [code, setCode] = useState<string>('');

  const handleMapModalPress = useCallback(
    ({title, code, snap}: SettingMapSheet) => {
      const length = code.split('-').length - 1;
      const tagList = [];
      for (let i = 0; i < length; i++) {
        tagList.push(KoreaRegionList[code].value);
      }
      setBottomSheetTitle(title);
      setTag(tagList);
      setCode(code);
      setPoint(snap);
      bottomSheetModalRef.current?.present();
    },
    [bottomSheetTitle, tag, code, point],
  );

  return {
    bottomSheetModalRef,
    snapPoints,
    bottomSheetTitle,
    bottomSheetDescription,
    bottomSheetContents,
    handlePresentModalPress,
    handleMapModalPress,
    handleClosePress,
    renderBackdrop,
    tag,
    code,
  };
};

export default useCustomBottomSheet;
