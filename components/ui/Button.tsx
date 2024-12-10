import { TouchableOpacity, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

import useKeyboardState from '@/hooks/useKeyboardState';
import { colors } from '@/constants';

interface ButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, handlePress, containerStyles, textStyles, isLoading, disabled }) => {
  const { isKeyboardActive } = useKeyboardState();

  if (isKeyboardActive) return null;
  return (
    <View className={`h-[62px] rounded-xl overflow-hidden ${containerStyles}`}>
      <TouchableOpacity activeOpacity={0.7} onPress={handlePress} disabled={isLoading || disabled}>
        <LinearGradient
          colors={[colors.prymary, colors.buttonGradientEndColor]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className={`h-full w-full ${isLoading || disabled ? 'opacity-50' : ''}`}
        />
      </TouchableOpacity>
      <View className="absolute w-full h-full items-center justify-center">
        <View pointerEvents="none">
          <Text className={` text-white font-psemibold text-xl font-bold ${textStyles}`}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default Button;
