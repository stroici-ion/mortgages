import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Image } from 'react-native';

interface AnimatedImageRotateProps {
  source: any;
  className?: string;
}

const AnimatedImageRotate: React.FC<AnimatedImageRotateProps> = ({ source, className }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateValue]);

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Map the value to degrees
  });

  return (
    <Animated.Image
      source={source}
      className={className}
      style={[
        {
          transform: [{ rotate: rotateInterpolate }], // Apply rotation transform
        },
      ]}
    />
  );
};

export default AnimatedImageRotate;
