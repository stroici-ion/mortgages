import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

interface ListItemProps {
  title: string;
  onPress: () => void;
  subtitle?: string;
  icon?: any;
  containerStyle?: string;
  active?: boolean;
}

const CardItem: React.FC<ListItemProps> = ({ title, icon, containerStyle, onPress, active }) => {
  return (
    <TouchableOpacity
      className={`text-gray-2 border border-gray-2 px-5 py-7 rounded-xl ${
        active && 'border-primary text-black'
      } ${containerStyle}`}
      onPress={onPress}
    >
      <Image source={icon} resizeMode="contain" className="w-8 h-8" />
      <Text className="mt-5 text-xl text-inherit font-bold">{title}</Text>
    </TouchableOpacity>
  );
};

export default CardItem;
