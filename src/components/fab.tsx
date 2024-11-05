import {FAB, Portal} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {customStyle} from 'src/style/customStyle';
import {useAppTheme} from 'src/style/paperTheme';

interface CustomFAB {
  open: boolean;
  visible: boolean;
  onChangeFAB: () => void;
  icon1: IconSource;
  icon2: IconSource;
  label1: string;
  label2: string;
  onPress1: () => void;
  onPress2: () => void;
}

const CustomFAB = ({
  open,
  visible,
  onChangeFAB,
  icon1,
  label1,
  icon2,
  label2,
  onPress1,
  onPress2,
}: CustomFAB) => {
  const theme = useAppTheme();

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible={visible}
        icon={open ? 'close' : 'plus'}
        fabStyle={customStyle().fabMain}
        color="#ffffff"
        actions={[
          {
            icon: icon1,
            label: label1,
            onPress: onPress1,
            color: '#ffffff',
            labelTextColor: theme.colors.brandMain,
            containerStyle: customStyle().fabContainer,
            style: customStyle().fab,
          },
          {
            icon: icon2,
            label: label2,
            onPress: onPress2,
            color: '#ffffff',
            labelTextColor: theme.colors.brandMain,
            containerStyle: customStyle().fabContainer,
            style: customStyle().fab,
          },
        ]}
        onStateChange={onChangeFAB}
      />
    </Portal>
  );
};

export default CustomFAB;
