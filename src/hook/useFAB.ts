import {useState} from 'react';

const useFAB = () => {
  const [open, setOpen] = useState<boolean>(false);

  const openFAB = () => setOpen(true);
  const closeFAB = () => setOpen(false);
  const onChangeFAB = () => setOpen(!open);

  return {open, openFAB, closeFAB, onChangeFAB};
};

export default useFAB;
