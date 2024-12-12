import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { View, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';

interface CountryPickerFieldProps {
  title: string;
  country: string;
  onChange: (country: string) => void;
  containerStyle?: string;
}

const CountryPickerField: React.FC<CountryPickerFieldProps> = ({ title, country, containerStyle, onChange }) => {
  //@ts-ignore
  const googlePlacesRef = useRef<GooglePlacesAutocomplete | null>(null);
  const handleAddressSelect = (data: any, details: GooglePlaceDetail | null) => {
    if (details?.geometry?.location) {
      const country = details?.address_components.find((component: any) =>
        component.types.includes('country')
      )?.long_name;
      if (country) onChange(country);
    }
  };

  useEffect(() => {
    if (googlePlacesRef.current && country) {
      googlePlacesRef.current.setAddressText(country);
    }
  }, [googlePlacesRef.current]);

  return (
    <View className={`${containerStyle}`}>
      <Text className="text-gray-3 font-iregular text-sm">{title}</Text>
      <View className={`h-[50px] border border-gray-2 rounded-xl mt-1`}>
        <GooglePlacesAutocomplete
          ref={googlePlacesRef}
          placeholder="Search Country"
          fetchDetails={true}
          onPress={handleAddressSelect}
          query={{
            key: 'AIzaSyDOmJVyW02UYiCLQPXSKZ6kxHfNCpVQRBY',
            language: 'en',
            type: 'country',
          }}
          styles={{
            container: {
              flex: 0,
              zIndex: 10,
            },
            textInputContainer: {
              zIndex: 10,
            },
            textInput: {
              height: 48,
              paddingLeft: 10,
              borderRadius: 15,
            },
            listView: {
              backgroundColor: 'white',
              zIndex: 999,
              elevation: 10,
              position: 'absolute',
              top: 55,
              left: '-1%',
              width: '102%',
              borderRadius: 10,
            },
          }}
        />
      </View>
    </View>
  );
};

export default CountryPickerField;
