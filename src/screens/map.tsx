import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Pressable} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import {MapProps} from 'src/types/stack';
import {showBottomToast} from 'src/utils/showToast';
import useDialog from 'src/hook/useDialog';
import {onCaptureAndSave, onCaptureAndShare} from 'src/utils/screenshot';
import useAuth from 'src/hook/useAuth';
import {resetMapData} from 'src/utils/koreaMap.db';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppTheme} from 'src/style/paperTheme';
import {customStyle} from 'src/style/customStyle';
import KoreaMapSvg from 'src/components/koreaMapSvg';
import CustomAlert from 'src/components/alert';
import useButton from 'src/hook/useButton';

// Screen width & height
const {width, height} = Dimensions.get('screen');

// Limit a value within a specified range.
const clamp = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max);
};

const MapScreen = ({navigation}: MapProps) => {
  console.log('맵');
  const theme = useAppTheme();

  const {visibleDialog, showDialog, hideDialog} = useDialog();
  const {isDisabled, disabledButton, abledButton} = useButton();
  const {appUser} = useAuth();

  const uid = appUser?.uid!;
  const viewShotRef = useRef<ViewShot>(null);

  // Access the client
  const queryClient = useQueryClient();

  // React-Query Mutation
  const resetMapMutation = useMutation({
    mutationFn: (uid: string) => resetMapData(uid),
  });

  // Setting map animation value
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const scale = useSharedValue(1);
  const startScale = useSharedValue(0);

  // Pinch Animation(scale)
  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate(event => {
      scale.value = clamp(
        startScale.value * event.scale,
        0.5,
        Math.min(width / 80, height / 80),
      );
    })
    .onEnd(() => {
      if (scale.value <= 1) {
        scale.value = 1;
        translationX.value = 0;
        translationY.value = 0;
      }
    })
    .runOnJS(true);

  // Pan Animation(move)
  const pan = Gesture.Pan()
    .averageTouches(true)
    .onStart(() => {
      if (scale.value > 1) {
        prevTranslationX.value = translationX.value;
        prevTranslationY.value = translationY.value;
      }
    })
    .onUpdate(event => {
      if (scale.value > 1) {
        const maxTranslateX = width / 2 - 70;
        const maxTranslateY = height / 2 - 70;

        translationX.value = clamp(
          prevTranslationX.value + event.translationX,
          -maxTranslateX,
          maxTranslateX,
        );
        translationY.value = clamp(
          prevTranslationY.value + event.translationY,
          -maxTranslateY,
          maxTranslateY,
        );
      }
    })
    .onEnd(() => {
      if (scale.value <= 1) {
        scale.value = 1;
        translationX.value = 0;
        translationY.value = 0;
      }
    })
    .runOnJS(true);

  // Animation Style
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: translationX.value},
      {translateY: translationY.value},
    ],
  }));

  // Pinch + Pan Animation
  const composed = Gesture.Simultaneous(pinch, pan);

  // Reset Map & RegionCount
  const onResetMap = async () => {
    try {
      disabledButton();
      await resetMapMutation.mutateAsync(uid);

      await queryClient.invalidateQueries({
        queryKey: ['koreaMapData', uid],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['addStory', uid],
        refetchType: 'all',
      });

      onResetMapSuccess();
    } catch (error) {
      abledButton();
      return;
    }
  };

  const onResetMapSuccess = () => {
    hideDialog();
    abledButton();
    showBottomToast('info', '지도를 새로 채워보세요!');
  };

  // Header button
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable className="px-6" onPress={() => showDialog()}>
          <MaterialCommunityIcons
            name="refresh"
            color={theme.colors.darkGray}
            size={28}
          />
        </Pressable>
      ),
      headerRight: () => (
        <React.Fragment>
          <Pressable
            className="pr-4"
            onPress={() => onCaptureAndSave(viewShotRef)}>
            <MaterialCommunityIcons
              name="camera-outline"
              color={theme.colors.darkGray}
              size={28}
            />
          </Pressable>
          <Pressable
            className="pr-6"
            onPress={() => onCaptureAndShare(viewShotRef, '나만의 여행지도')}>
            <MaterialCommunityIcons
              name="share-variant"
              color={theme.colors.darkGray}
              size={26}
            />
          </Pressable>
        </React.Fragment>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView
      className="flex-1 justify-start items-center bg-white"
      edges={['left', 'right']}>
      <ViewShot
        ref={viewShotRef}
        style={customStyle().mapViewShot}
        options={{fileName: 'MemoryMap', format: 'jpg', quality: 1}}>
        <GestureDetector gesture={composed}>
          <Animated.View style={[customStyle().mapBox, animatedStyles]}>
            <KoreaMapSvg uid={uid} />
          </Animated.View>
        </GestureDetector>
      </ViewShot>
      <CustomAlert
        visible={visibleDialog}
        title="지도를 초기화하시겠습니까?"
        buttonText="초기화"
        isDisabled={isDisabled}
        buttonOnPress={onResetMap}
        hideAlert={hideDialog}
      />
    </SafeAreaView>
  );
};

export default MapScreen;
