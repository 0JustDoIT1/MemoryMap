import {HelperText} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';
import {useAppTheme} from 'src/style/paperTheme';

interface CustomHelperText {
  type: 'error' | 'info';
  text: string | React.JSX.Element | undefined;
  color?: string;
}

const CustomHelperText = ({type, text, color}: CustomHelperText) => {
  const theme = useAppTheme();
  const textColor = color
    ? color
    : type === 'info'
    ? theme.colors.outline
    : theme.colors.error;

  return (
    <HelperText
      type={type}
      className="w-full"
      style={customStyle({color: textColor}).helperText}>
      {text}
    </HelperText>
  );
};

export default CustomHelperText;
