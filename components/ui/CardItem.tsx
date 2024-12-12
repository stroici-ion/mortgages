import { Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

import Icon from './Icon';

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
      <Icon source={icon} />
      <Text className="mt-3 text-xl text-inherit font-imedium">{title}</Text>
    </TouchableOpacity>
  );
};

export default CardItem;
