import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {BrandContainedButton} from './button';

interface NotFound {
  icon: React.JSX.Element;
  title: string;
  description?: string;
  onPress?: () => void;
}

const NotFound = ({icon, title, description, onPress}: NotFound) => {
  return (
    <View className="w-full h-full flex justify-center items-center">
      <View className="rounded-full bg-white shadow shadow-black p-4">
        {icon}
      </View>
      <View className="mt-6">
        <Text className="text-lg text-outline text-center">{title}</Text>
        <Text className="text-sm text-outline text-center">{description}</Text>
      </View>
      {onPress && (
        <View className="mt-8">
          <BrandContainedButton
            text="색칠하기"
            classes="px-6 rounded-md"
            onPress={onPress}
          />
        </View>
      )}
    </View>
  );
};

export default NotFound;
