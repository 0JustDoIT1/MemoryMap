import {Modal, Portal} from 'react-native-paper';
import {staticStyles} from 'src/style/staticStyles';
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
        style={staticStyles.modal}
        contentContainerStyle={staticStyles.modalContent}>
        {contents}
      </Modal>
    </Portal>
  );
};
export default CustomModal;
