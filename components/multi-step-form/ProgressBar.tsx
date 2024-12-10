import { View, Text } from 'react-native';
import React from 'react';
import { colors } from '@/constants';

interface ProgressBarProps {
  progress: number;
  step: number;
  totalSteps: number;
  containerStyles?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, step, totalSteps, containerStyles }) => {
  return (
    <View className={`flex-row items-center ${containerStyles}`}>
      <View className="flex-1 mh-20 h-[7px] bg-gray-1 rounded-xl overflow-hidden">
        <View
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: colors.prymary,
          }}
        />
      </View>
      <Text className="ml-3 text-gray-3">
        <Text className="text-black">{step}</Text>/{totalSteps}
      </Text>
    </View>
  );
};

export default ProgressBar;
