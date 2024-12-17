import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';

import { ICoordinates } from '@/redux/loanForm/types';

interface AddressPickerFiledProps {
  title: string;
  value: string;
  country: string;
  onChange: (geoLocation: ICoordinates & { address: string; newCountryValue: string }) => void;
  containerStyle?: string;
}

const AddressPickerFiled: React.FC<AddressPickerFiledProps> = ({ title, value, country, containerStyle, onChange }) => {
  //@ts-ignore
  const googlePlacesRef = useRef<GooglePlacesAutocomplete | null>(null);

  const parseAddressComponents = (components: any[]) => {
    const getComponent = (type: string) => components.find((component) => component.types.includes(type))?.long_name;

    return {
      street: getComponent('route'),
      streetNumber: getComponent('street_number'),
      city: getComponent('locality'),
      countryValue: getComponent('country'),
    };
  };

  const handleAddressSelect = (data: any, details: GooglePlaceDetail | null) => {
    if (details?.geometry?.location) {
      const { lat, lng } = details.geometry.location;

      const { street, streetNumber, city, countryValue } = parseAddressComponents(details.address_components);

      let address = `${countryValue}${city ? ', ' + city : ''}${street ? ', ' + street : ''},${
        streetNumber ? ', ' + streetNumber : ''
      }`;

      if (address[address.length - 1] === ',') {
        address = address.slice(0, address.length - 1);
      }

      onChange({
        address,
        newCountryValue: countryValue,
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    }
  };

  useEffect(() => {
    if (googlePlacesRef.current) {
      if (!value && country) googlePlacesRef.current.setAddressText(country + ', ');
      else googlePlacesRef.current.setAddressText(value);
    }
  }, [value, googlePlacesRef.current]);

  return (
    <View className={`${containerStyle}`}>
      <Text className="text-gray-3 text-sm font-iregular">{title}</Text>
      <View className={`h-[50px] border border-gray-2 rounded-xl mt-1 ${containerStyle}`}>
        <GooglePlacesAutocomplete
          ref={googlePlacesRef}
          placeholder="Search for an address"
          fetchDetails={true}
          onPress={handleAddressSelect}
          query={{
            key: 'AIzaSyDOmJVyW02UYiCLQPXSKZ6kxHfNCpVQRBY',
            language: 'en',
            componentRestrictions: {
              country: 'Moldova', // Replace 'US' with the country code you want (e.g., 'IN' for India)
            },
          }}
          styles={{
            container: {
              flex: 0,
              zIndex: 1,
            },
            textInput: {
              height: 48,
              paddingLeft: 10,
              borderRadius: 15,
              fontFamily: 'Inter-Regular',
            },
            listView: {
              backgroundColor: 'white',
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

export default AddressPickerFiled;
