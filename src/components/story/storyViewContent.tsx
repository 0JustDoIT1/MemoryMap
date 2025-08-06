import {Image, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';

interface IStoryViewContent {
  image: any;
  title: string;
  contents: string;
}

const StoryViewContent = ({image, title, contents}: IStoryViewContent) => {
  return (
    <View className="w-full h-4/5 flex items-center border border-t-0 border-gray-400 rounded-b-lg">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex items-center mt-8 mx-4">
          <View className="w-[180px] h-[180px] bg-white rounded-full">
            <Image style={{width: 180, height: 180}} source={image} />
          </View>
        </View>

        <View className="flex items-center my-8 mx-4">
          <Text className="text-lg">{title}</Text>
          <Text className="text-center text-gray-500 mt-2 leading-6">
            {contents}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default StoryViewContent;
