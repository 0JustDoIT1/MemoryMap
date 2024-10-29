import {Modal, Portal} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';
interface CustomModal {
  visible: boolean;
  hideModal: () => void;
  contents: React.JSX.Element;
}
const CustomModal = ({visible, hideModal, contents}: CustomModal) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={customStyle().modalContentStyle}>
        {contents}
      </Modal>
    </Portal>
  );
};
export default CustomModal;
