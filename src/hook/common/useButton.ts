import {useState} from 'react';

const useButton = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const disabledButton = () => setIsDisabled(true);
  const abledButton = () => setIsDisabled(false);

  return {
    isDisabled,
    disabledButton,
    abledButton,
  };
};

export default useButton;
