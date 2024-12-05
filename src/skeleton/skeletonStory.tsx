import ContentLoader, {Rect} from 'react-content-loader/native';

const SkeletonStory = () => {
  return (
    <ContentLoader width="100%" height={160}>
      <Rect x="0" y="0" rx="10" ry="10" width="65" height={40} />
      <Rect x="75" y="0" rx="10" ry="10" width="80" height={40} />
      <Rect x="0" y="50" rx="10" ry="10" width="100%" height={110} />
    </ContentLoader>
  );
};

export default SkeletonStory;
