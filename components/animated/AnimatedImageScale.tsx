import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

interface AnimatedImageScaleProps {
  source: any;
  className?: string;
}

const AnimatedImageScale: React.FC<AnimatedImageScaleProps> = ({ source, className }) => {
  const scaleAnim = useRef(new Animated.ValueXY({ x: 0, y: 1 })).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: { x: 1, y: 1 },
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.Image
      source={source}
      className={className}
      style={[
        {
          transform: [{ scaleX: scaleAnim.x }, { scaleY: scaleAnim.y }],
        },
      ]}
    />
  );
};

export default AnimatedImageScale;
