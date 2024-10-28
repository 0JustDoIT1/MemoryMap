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
  id: string;
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
  const [tag, setTag] = useState<string[]>([]);

  const handleMapModalPress = useCallback(
    ({id, snap}: SettingMapSheet) => {
      let result: any;

      // 객체 속 원하는 값 찾기 (Defth First Search 방식, 중첩 객체도 가능)
      const DFS = (obj: any, name: any, val: any) => {
        if (obj[name] === val) result = obj;
        else
          Object.values(obj).forEach(value => {
            if (typeof value === 'object') DFS(value, name, val);
          });
      };

      DFS(KoreaRegionList, 'id', id);

      const values = result.value;
      const length = values.length;
      const title = values[length - 1];

      let tagList = [];
      for (let i = 0; i < length - 1; i++) {
        tagList.push(values[i]);
      }

      setBottomSheetTitle(title);
      setTag(tagList);
      setPoint(snap);
      bottomSheetModalRef.current?.present();
    },
    [bottomSheetTitle, tag, point],
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
  };
};

export default useCustomBottomSheet;
