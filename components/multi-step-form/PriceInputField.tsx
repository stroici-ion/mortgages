import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React from 'react';

interface PriceInputFieldProps {
  value: number;
  onChange: (value: number) => void;
  title?: string;
  containerStyle?: string;
  inactive?: boolean;
  decorator?: string;
  maxValue?: number;
}

const PriceInputField: React.FC<PriceInputFieldProps> = ({
  title,
  value,
  onChange,
  containerStyle,
  inactive = false,
  decorator = '',
  maxValue,
}) => {
  const displayValue = (value: number) => {
    let text = value + '';
    if (text.length > 1 && text[0] === '0') text = text.slice(1, text.length);
    if (text === '') return '0';

    const displayText = [''];
    let k = 0;
    for (let i = text.length - 1; i >= 0; i--) {
      displayText.unshift(text[i]);
      k++;
      if (k === 3 && i > 0) {
        displayText.unshift(',');
        k = 0;
      }
    }
    return displayText.join('');
  };

  const handleSetIntegerValue = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const newValue = +e.nativeEvent.text.replace(/\D/g, '').replaceAll(',', '');
    if (maxValue && maxValue < newValue) {
      onChange(maxValue);
      return;
    }
    onChange(newValue);
  };

  return (
    <View className="w-full">
      {title && <Text className="text-gray-3">{title}</Text>}
      <View
        className={`h-[50px] border border-gray-2 rounded-xl flex-row items-center ${decorator && 'pl-3'} ${
          title && 'mt-1'
        } ${containerStyle}`}
      >
        {decorator && <Text className={`text-[15px] font-bold text-gray-4`}>{decorator}</Text>}
        <TextInput
          editable={!inactive}
          value={displayValue(value)}
          className={`rounded-xl pl-[10px] h-full pr-2 flex-1 order-2`}
          keyboardType="number-pad"
          onChange={handleSetIntegerValue}
        />
      </View>
    </View>
  );
};

export default PriceInputField;
