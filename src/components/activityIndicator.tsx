import {ActivityIndicator} from 'react-native-paper';
import {customColor} from 'src/style/customColor';

const CustomActivityIndicator = () => {
  return <ActivityIndicator animating={true} color={customColor.brandMain} />;
};

export default CustomActivityIndicator;
