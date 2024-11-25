import {useState} from 'react';

interface SettingBottomSheet {
  title?: string;
  description?: string;
  contents: React.JSX.Element;
}

const useCustomBottomSheet = () => {
  const [bottomSheetTitle, setBottomSheetTitle] = useState<string | undefined>(
    '',
  );
  const [bottomSheetDescription, setBottomSheetDescription] = useState<
    string | undefined
  >('');
  const [bottomSheetContents, setBottomSheetContents] =
    useState<React.JSX.Element>(<></>);

  const settingBottomSheet = ({
    title,
    description,
    contents,
  }: SettingBottomSheet) => {
    setBottomSheetTitle(title);
    setBottomSheetDescription(description);
    setBottomSheetContents(contents);
  };

  return {
    bottomSheetTitle,
    bottomSheetDescription,
    bottomSheetContents,
    settingBottomSheet,
  };
};

export default useCustomBottomSheet;
