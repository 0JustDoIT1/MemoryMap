import {useState} from 'react';

const useDialog = () => {
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const showDialog = () => setVisibleDialog(true);
  const hideDialog = () => setVisibleDialog(false);
  return {visibleDialog, showDialog, hideDialog};
};

export default useDialog;
