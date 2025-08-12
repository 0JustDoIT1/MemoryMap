import {Text} from 'react-native-paper';

interface IBottomSheetDesc {
  description?: string;
}

const BottomSheetDesc = ({description = ''}: IBottomSheetDesc) => {
  return (
    <Text className="text-xs text-outline text-center mb-8">{description}</Text>
  );
};

export default BottomSheetDesc;
