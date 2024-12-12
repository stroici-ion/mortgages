import { View, Image, ImageSourcePropType } from 'react-native';
import React from 'react';

interface IconProps {
  source: ImageSourcePropType;
  className?: string;
  containerClassName?: string;
}

const Icon: React.FC<IconProps> = ({ source, className, containerClassName }) => {
  return (
    <View className={`w-12 h-12 items-center justify-center rounded-full bg-primary-1 ${containerClassName}`}>
      <Image source={source} resizeMode="contain" className={`w-5 h-5 ${className}`} />
    </View>
  );
};

export default Icon;
