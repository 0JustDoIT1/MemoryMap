import {HelperText} from 'react-native-paper';
import {useAppTheme} from 'src/style/paperTheme';

interface CustomHelperText {
  type?: 'error' | 'info';
  text: string | React.JSX.Element | undefined;
  color?: string;
}

const CustomHelperText = ({type, text, color}: CustomHelperText) => {
  const theme = useAppTheme();
  const textColor = color
    ? color
    : type === 'info'
    ? theme.colors.outline
    : theme.colors.brandMain;

  return (
    <HelperText
      type={type ? type : 'info'}
      className="w-full"
      style={{
        color: textColor,
      }}>
      {text}
    </HelperText>
  );
};

export default CustomHelperText;
