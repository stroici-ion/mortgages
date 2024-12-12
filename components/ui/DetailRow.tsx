import { View, Text } from 'react-native';
import React from 'react';

interface DetailRowProps {
  title: string;
  value: string;
  containerStyle?: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ title, value, containerStyle }) => {
  return (
    <View className={`flex-row justify-between items-center border-b border-gray-2 py-5 ${containerStyle}`}>
      <Text className="text-gray-3 text-sm font-iregular">{title}</Text>
      <Text className="text-sm font-imedium">{value}</Text>
    </View>
  );
};

export default DetailRow;
