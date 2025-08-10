import {Pressable, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {customColor} from 'src/style/customColor';
import SelectPoint from '../common/selectPoint';
import {storyPointArray} from 'src/constants/point';
import {memo} from 'react';

interface IAddStoryContent {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  contents: string;
  setContents: React.Dispatch<React.SetStateAction<string>>;
  point: number;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
  dateLabel: string;
  onPressDate: () => void;
}

const AddStoryContent = ({
  title,
  setTitle,
  contents,
  setContents,
  point,
  setPoint,
  dateLabel,
  onPressDate,
}: IAddStoryContent) => {
  return (
    <>
      <View className="w-full flex-row justify-between items-center mt-2">
        <Pressable className="w-full" onPress={onPressDate}>
          <TextInput
            className="w-full bg-white"
            mode="outlined"
            label="여행일자"
            activeOutlineColor={customColor.brandMain}
            editable={false}
            value={dateLabel}
          />
        </Pressable>
      </View>
      <View className="w-full mt-2">
        <TextInput
          className="w-full bg-white"
          mode="outlined"
          label="제목"
          placeholder="(10자)"
          activeOutlineColor={customColor.brandMain}
          value={title}
          maxLength={10}
          onChangeText={setTitle}
        />
        <TextInput
          className="w-full bg-white h-40 mt-2"
          mode="outlined"
          label="내용"
          placeholder="(100자)"
          activeOutlineColor={customColor.brandMain}
          multiline={true}
          value={contents}
          maxLength={100}
          onChangeText={setContents}
        />
      </View>
      <View className="mt-8">
        <Text className="text-sm ml-2">여행은 즐거우셨나요?</Text>
        <View className="w-full mt-4 flex-row justify-between items-center">
          {storyPointArray.map(item => (
            <SelectPoint
              key={item.point}
              item={item}
              point={point}
              setPoint={setPoint}
            />
          ))}
        </View>
      </View>
    </>
  );
};

export default memo(AddStoryContent);
