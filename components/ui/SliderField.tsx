import { View, Text, Animated, PanResponder, LayoutChangeEvent } from 'react-native';
import React, { useRef, useState } from 'react';

interface SliderFieldProps {
  value: number;
  minimumValue: number;
  maximumValue: number;
  showMinMaxValues?: boolean;
  measurement?: string;
  step?: number;
  onChange: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  title?: string;
  containerStyle?: string;
}

const SliderField: React.FC<SliderFieldProps> = ({
  value,
  minimumValue = 0,
  maximumValue = 100,
  showMinMaxValues = true,
  measurement = undefined,
  step = 1,
  onChange,
  onSlidingComplete,
  title,
  containerStyle,
}) => {
  const [trackWidth, setTrackWidth] = useState<number>(0);
  const trackRef = useRef<View>(null);

  const getPositionFromValue = (val: number): number =>
    ((val - minimumValue) / (maximumValue - minimumValue)) * (trackWidth - 20);

  const getValueFromPosition = (pos: number): number => {
    const rawValue = (pos / trackWidth) * (maximumValue - minimumValue) + minimumValue;
    const snappedValue = Math.round(rawValue / step) * step;
    return Math.min(Math.max(snappedValue, minimumValue), maximumValue);
  };

  const handleLayout = (event: LayoutChangeEvent): void => {
    const { width } = event.nativeEvent.layout;
    setTrackWidth(width);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, gestureState) => {
      if (trackRef.current) {
        trackRef.current.measure((x, y, width, height, pageX) => {
          const newValue = getValueFromPosition(gestureState.x0 - pageX);
          onChange(newValue);
        });
      }
    },
    onPanResponderMove: (_, gestureState) => {
      if (trackRef.current) {
        trackRef.current.measure((x, y, width, height, pageX) => {
          const newValue = getValueFromPosition(gestureState.moveX - pageX);
          onChange(newValue);
        });
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      onChange(value);
      onSlidingComplete?.(value);
    },
  });

  const thumbPosition = trackWidth ? getPositionFromValue(value) : 10;

  return (
    <View className={`w-full ${containerStyle}`}>
      {title && <Text className="text-gray-3">{title}</Text>}
      <View className="mt-8 mb-2 flex-1 justify-center items-center">
        <View
          ref={trackRef}
          className="w-[100%] h-[10px] bg-gray-1 rounded-xl relative mx-2"
          onLayout={handleLayout}
          {...panResponder.panHandlers}
        >
          <View style={{ width: thumbPosition + 10 }} className="h-[10px] bg-primary rounded-xl" />
          <Animated.View
            style={{ left: thumbPosition }}
            className="w-[20px] h-[20px] border-2 border-white bg-secondary rounded-full absolute top-[-5px]"
          />
        </View>
      </View>
      {showMinMaxValues && (
        <View className="flex-row justify-between mt-2">
          <Text className="text-gray-3">
            {minimumValue}
            {measurement}
          </Text>
          <Text className="text-gray-3">
            {maximumValue}
            {measurement}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SliderField;
