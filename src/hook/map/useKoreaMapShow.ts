import {useEffect, useState} from 'react';
import {InteractionManager} from 'react-native';

export const useKoreaMapShow = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => setShow(true));
    return () => task.cancel();
  }, []);

  return {show};
};
