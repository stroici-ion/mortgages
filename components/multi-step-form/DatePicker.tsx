import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { formatDate } from '@/utils/formatDate';

interface DatePickerProps {
  title?: string;
  value: string;
  onChange: (date: string) => void;
  containerStyle?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ title, value, onChange, containerStyle }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const parseDate = (dateString: string): Date | null => {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  const hanldeOnChange = (date: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) onChange(formatDate(selectedDate));
    setShowDatePicker(false);
  };

  const handleShowDatePicker = () => setShowDatePicker(true);

  return (
    <View className={`${containerStyle}`}>
      {title && <Text className="text-gray-3 font-iregular text-sm">{title}</Text>}
      <View className={`h-[50px] border border-gray-2 rounded-xl mt-1 ${containerStyle}`}>
        <TouchableOpacity className="rounded-xl pl-[10px] h-full pr-0 justify-center" onPress={handleShowDatePicker}>
          <Text>{value}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            className="font-regular"
            value={parseDate(value) || new Date()}
            mode="date"
            display="default"
            onChange={hanldeOnChange}
          />
        )}
      </View>
    </View>
  );
};

export default DatePicker;
