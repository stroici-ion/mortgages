import { View, Text } from 'react-native';
import React from 'react';

interface TabContentProps {
  title?: string;
  children?: React.ReactNode;
  containerStyle?: string;
}

const TabContent: React.FC<TabContentProps> = ({ title, children, containerStyle }) => {
  return (
    <View className="flex-1 px-5 py-3 pb-7">
      {!!title && <Text className="text-[25px] font-bold mb-4">{title}</Text>}

      <View className={`flex-1 ${containerStyle}`}>{children}</View>
    </View>
  );
};

export default TabContent;
