import {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';
import {Button} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';
import {customColor} from 'src/style/customColor';
import {useCallback, useRef} from 'react';

type Variant = 'contained' | 'outlined' | 'text';

interface IButtonType {
  text: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  accessibilityLabel?: string;
  onPress?: (e: GestureResponderEvent) => void;
}

const BrandButton = ({
  text,
  className,
  style,
  disabled = false,
  loading = false,
  variant = 'contained',
  accessibilityLabel,
  onPress,
}: IButtonType) => {
  // 빠른 연속 탭 방지 (선택)
  const lockedRef = useRef(false);
  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      if (lockedRef.current || disabled || loading) return;
      lockedRef.current = true;
      try {
        onPress?.(e);
      } finally {
        setTimeout(() => (lockedRef.current = false), 350);
      }
    },
    [onPress, disabled, loading],
  );

  const isContained = variant === 'contained';
  const isOutlined = variant === 'outlined';

  const buttonColor = isContained ? customColor.brandMain : undefined;

  const textColor =
    isOutlined || variant === 'text' ? customColor.brandMain : undefined;

  const outlinedStyle = isOutlined
    ? customStyle().brandOutlinedButton
    : undefined;

  return (
    <Button
      mode={variant}
      className={className}
      style={[outlinedStyle, style]}
      buttonColor={buttonColor}
      textColor={textColor}
      disabled={disabled}
      loading={loading}
      onPress={handlePress}
      accessibilityLabel={accessibilityLabel ?? text}
      accessibilityRole="button">
      {text}
    </Button>
  );
};

export default BrandButton;
