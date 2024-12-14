import {useState} from 'react';

const useLoading = () => {
  const [onLoading, setOnLoading] = useState<boolean>(false);

  const startLoading = () => setOnLoading(true);
  const endLoading = () => setOnLoading(false);

  return {
    onLoading,
    startLoading,
    endLoading,
  };
};

export default useLoading;
