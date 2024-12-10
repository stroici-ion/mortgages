import { View, Text, Image } from 'react-native';
import React from 'react';
import { icons } from '@/constants';
import AnimatedImageRotate from '../animated/AnimatedImageRotate';
import AnimatedImageScale from '../animated/AnimatedImageScale';

interface IStepStatus {
  title?: string;
  status: string;
  step: number;
  containerStyle?: string;
}

const StepStatus: React.FC<IStepStatus> = ({ title, status, step, containerStyle }) => {
  return (
    <View className={`flex-row gap-3 items-center ${containerStyle}`}>
      {status === 'fullfilled' && <AnimatedImageScale source={icons.completed} className="w-8 h-8 m-1" />}
      {status === 'pending' && <AnimatedImageRotate source={icons.loading} className="w-10 h-10" />}
      {status === 'awaiting' && (
        <View className="w-10 h-10 rounded-full bg-gray-2 items-center justify-center">
          <Text className="w-full text-center text-gray-3 font-bold text-xl">{step}</Text>
        </View>
      )}
      <View>
        <Text className="text-gray-3 text-sm">STEP {step}</Text>
        <Text className="font-semibold">{title}</Text>
      </View>
    </View>
  );
};

export default StepStatus;
