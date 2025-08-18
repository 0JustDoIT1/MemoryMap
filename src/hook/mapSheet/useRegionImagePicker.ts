import {useCallback} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {MAP_SVG_DATA} from 'src/constants/koreaMapData';

export const useRegionImagePicker = (regionId: string, title: string) => {
  const pick = useCallback(async () => {
    const {width, height} = MAP_SVG_DATA[regionId].regionSvgStyle;
    const img = await ImagePicker.openPicker({
      width,
      height,
      cropping: true,
      mediaType: 'photo',
      compressImageQuality: 0.9,
      cropperToolbarTitle: title,
    });
    return img.path as string;
  }, [regionId, title]);

  return {pick};
};
