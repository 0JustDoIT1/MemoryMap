import ContentLoader, {Rect} from 'react-content-loader/native';

const SkeletonDashboard = () => {
  return (
    <ContentLoader width="100%" height="100%">
      <Rect x="0" y="0" rx="5" ry="5" width="100%" height={300} />
      <Rect x="25" y="360" rx="5" ry="5" width={340} height={105} />
      <Rect x="25" y="480" rx="5" ry="5" width={340} height={105} />
      <Rect x="25" y="600" rx="5" ry="5" width={340} height={105} />
    </ContentLoader>
  );
};

export default SkeletonDashboard;
