import { View, Text } from 'react-native';
import React, { useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

import AddressPickerFiled from '@/components/multi-step-form/AddressPickerFiled';
import CountryPickerField from '@/components/multi-step-form/CountryPickerField';
import ZipCodeInputField from '@/components/multi-step-form/ZipCodeInputField';
import TabContent from '@/components/multi-step-form/TabContent';
import { EFormStepType, IAddress, ICoordinates } from '@/redux/loanForm/types';
import { selectLoanForm } from '@/redux/loanForm/selectors';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/redux';
import { fetchSubmitLoanFormStep } from '@/redux/loanForm/asyncActions';
import { setForm } from '@/redux/loanForm/slice';

const FormLocation = () => {
  const { country, address, latitude, longitude, latitudeDelta, longitudeDelta, zipCode } = useSelector(selectLoanForm);

  const dispatch = useAppDispatch();
  const mapRef = useRef<MapView | null>(null);

  const onChangeCountry = (newCountryValue: string) => {
    if (country !== newCountryValue) dispatch(setForm({ country, address: newCountryValue + ', ' }));
    else dispatch(setForm({ country: newCountryValue }));
  };

  const onChangeZipCode = (zipCode: string) => dispatch(setForm({ zipCode }));
  const onChangeAddress = (geoLocation: ICoordinates & { address: string; newCountryValue: string }) => {
    if (country !== geoLocation.newCountryValue) {
      dispatch(setForm({ ...geoLocation, country: geoLocation.newCountryValue }));
    } else {
      dispatch(setForm({ ...geoLocation }));
    }
  };

  const isCompleted = !!country?.length && !!address?.length && zipCode?.length > 4;

  const handleGoNext = () => {
    if (isCompleted) {
      dispatch(
        fetchSubmitLoanFormStep([
          { country, address, latitude, longitude, latitudeDelta, longitudeDelta, zipCode },
          EFormStepType.location,
        ])
      );
    }
  };

  React.useEffect(() => {
    console.log('Latitude Delta and longitude inside LocationUse effect,', latitudeDelta, longitudeDelta);

    if (mapRef.current && latitude && longitude) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      });
    }
  }, [latitude, longitude]);

  return (
    <TabContent title="Refering to the home you would like to by, where is it located?">
      <CountryPickerField
        title="Country/Not requires"
        country={country}
        onChange={onChangeCountry}
        containerStyle="mt-2"
      />
      <AddressPickerFiled
        title="Address"
        country={country}
        value={address}
        containerStyle="mt-2"
        onChange={onChangeAddress}
      />
      <ZipCodeInputField title="Zip Code" containerStyle="mt-2" value={zipCode} onChange={onChangeZipCode} />
      <View className="mt-3 flex-1 mb-3">
        <Text className="text-gray-3 font-iregular text-sm">Location</Text>
        <View className="relative flex-1 mt-1 rounded-xl overflow-hidden">
          <MapView
            style={{ width: '100%', height: '100%' }}
            ref={mapRef}
            region={{
              latitude: latitude || 47.0105,
              longitude: longitude || 28.8638,
              latitudeDelta,
              longitudeDelta,
            }}
          >
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              title="Selected Location"
            />
          </MapView>
        </View>
      </View>
      <Button title="Continue" handlePress={handleGoNext} disabled={!isCompleted} />
    </TabContent>
  );
};

export default FormLocation;
