import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Icon from './Icon';

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
      className={`flex-row items-center gap-4 text-gray-2 border border-gray-2 px-5 py-4 rounded-xl ${containerStyle}`}
      onPress={onPress}
    >
      <Icon source={icon} />
      <View>
        <Text className="text-inherit font-imedium">{title}</Text>
        {subtitle && <Text className="text-xs text-gray-3 font-iregular">{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
