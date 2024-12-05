import ContentLoader, {Rect} from 'react-content-loader/native';

const SkeletonAddStory = () => {
  return (
    <ContentLoader width="100%" height="100%">
      <Rect x="0" y="0" rx="5" ry="5" width="100%" height={45} />
      <Rect x="0" y="60" rx="5" ry="5" width="100%" height={45} />
      <Rect x="0" y="120" rx="5" ry="5" width="100%" height={45} />
      <Rect x="0" y="180" rx="5" ry="5" width="100%" height={150} />
      <Rect x="0" y="365" rx="5" ry="5" width={130} height={25} />
      <Rect x="0" y="400" rx="5" ry="5" width="100%" height={60} />
    </ContentLoader>
  );
};

export default SkeletonAddStory;
