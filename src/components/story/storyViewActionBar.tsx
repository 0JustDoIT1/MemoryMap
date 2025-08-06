import {Pressable, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IStoryViewActionBar {
  onEdit: () => void;
  onSave: () => void;
  onShare: () => void;
  onDelete: () => void;
}

const StoryViewActionBar = ({
  onEdit,
  onSave,
  onShare,
  onDelete,
}: IStoryViewActionBar) => {
  return (
    <View className="w-full flex-row justify-end items-center mt-2">
      <Pressable className="ml-4" onPress={onEdit}>
        <MaterialCommunityIcons
          name="square-edit-outline"
          size={25}
          color="#000000"
        />
      </Pressable>
      <Pressable className="ml-4" onPress={onSave}>
        <MaterialCommunityIcons
          name="file-download-outline"
          size={25}
          color="#000000"
        />
      </Pressable>
      <Pressable className="ml-4" onPress={onShare}>
        <MaterialCommunityIcons
          name="share-variant"
          size={23}
          color="#000000"
        />
      </Pressable>
      <Pressable className="ml-4" onPress={onDelete}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={25}
          color="#000000"
        />
      </Pressable>
    </View>
  );
};

export default StoryViewActionBar;
