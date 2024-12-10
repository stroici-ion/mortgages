import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert } from 'react-native';

interface ZipCodeInputFieldProps {
  title: string;
  value: string;
  onChange: (zipCode: string) => void;
  containerStyle?: string;
}

const ZipCodeInputField: React.FC<ZipCodeInputFieldProps> = ({ title, value, containerStyle, onChange }) => {
  const handleZipCodeChange = (value: string) => {
    const cleanedValue = value.replace(/[^0-9]/g, '');
    onChange(cleanedValue);
  };

  const validateZipCode = () => {
    const zipCodeRegex = /^[0-9]{5}$/;
    if (!zipCodeRegex.test(value)) {
      return false;
    }
    return true;
  };

  return (
    <View className={`${containerStyle}`}>
      <Text className="text-gray-3">{title}</Text>
      <View className={`h-[50px] border border-gray-2 rounded-xl mt-1 ${containerStyle}`}>
        <TextInput
          className="pl-[10px] h-full"
          value={value}
          onChangeText={handleZipCodeChange}
          keyboardType="numeric"
          maxLength={5}
          placeholder="Enter ZIP code"
          onBlur={validateZipCode}
        />
      </View>
    </View>
  );
};

export default ZipCodeInputField;
