import {HelperText} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';
import {customColor} from 'src/style/customColor';

interface CustomHelperText {
  type: 'error' | 'info';
  text: string | React.JSX.Element | undefined;
  color?: string;
}

const CustomHelperText = ({type, text, color}: CustomHelperText) => {
  const textColor = color
    ? color
    : type === 'info'
    ? customColor.outline
    : customColor.error;

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
