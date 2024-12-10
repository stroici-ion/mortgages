import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

interface ListItemProps {
  title: string;
  onPress: () => void;
  subtitle?: string;
  icon?: any;
  containerStyle?: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, subtitle, icon, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center gap-4 text-gray-2 border border-gray-2 px-5 py-7 rounded-xl ${containerStyle}`}
      onPress={onPress}
    >
      <Image source={icon} resizeMode="contain" className="w-7 h-7" />
      <View>
        <Text className="text-lg text-inherit font-bold">{title}</Text>
        {subtitle && <Text className="text-sm text-gray-3">{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
