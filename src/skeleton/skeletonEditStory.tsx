import ContentLoader, {Rect} from 'react-content-loader/native';

const SkeletonEditStory = () => {
  return (
    <ContentLoader width="100%" height="100%">
      <Rect x="0" y="0" rx="5" ry="5" width="100%" height="80%" />
    </ContentLoader>
  );
};

export default SkeletonEditStory;
