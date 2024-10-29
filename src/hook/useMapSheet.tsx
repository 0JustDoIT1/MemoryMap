import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef, useState} from 'react';
import {KoreaRegionList} from 'src/constants/regionList';

const useMapSheet = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [bottomSheetTitle, setBottomSheetTitle] = useState<string>('');
  const [tag, setTag] = useState<string[]>([]);
  const [id, setId] = useState<string>('');

  // Bottom Sheet height setting [index0, index1]
  const snapPoints = useMemo(() => ['30%', '40%'], []);

  const handleMapModalPress = useCallback(
    (id: string) => {
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
      setId(result.id);
      bottomSheetModalRef.current?.present();
    },
    [bottomSheetTitle, tag],
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
    tag,
    id,
    handleMapModalPress,
    handleClosePress,
    renderBackdrop,
  };
};

export default useMapSheet;
