import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface PickerFieldProps {
  title?: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  containerStyle?: string;
}

const PickerField: React.FC<PickerFieldProps> = ({ title, value, onChange, options, containerStyle }) => {
  return (
    <View className={`${containerStyle}`}>
      {title && <Text className="text-gray-3">{title}</Text>}
      <View className={`h-[50px] border border-gray-2 rounded-xl mt-1 justify-center ${containerStyle}`}>
        <Picker selectedValue={value} onValueChange={onChange}>
          {options.map((option) => (
            <Picker.Item key={option.value} {...option} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default PickerField;
