import React from 'react';
import {FlatList} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStory from 'src/hook/useStory';
import {customStyle} from 'src/style/customStyle';
import {StoryProps} from 'src/types/stack';

const StoryScreen = ({navigation}: StoryProps) => {
  const {story} = useStory();

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white p-4">
      <FlatList
        className="w-full"
        contentContainerStyle={customStyle().storyFlatListContainer}
        columnWrapperStyle={customStyle().storyFlatListColumnWrapper}
        numColumns={2}
        data={story}
        keyExtractor={item => item.createdAt.toString()}
        renderItem={({item}) => (
          <Card className="w-[49.5%]">
            <Card.Content>
              <Text>{item.contents}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

export default StoryScreen;
