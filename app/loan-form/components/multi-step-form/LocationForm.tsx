import { View, Text } from 'react-native';
import React, { useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

import AddressPickerFiled from '@/components/multi-step-form/AddressPickerFiled';
import CountryPickerField from '@/components/multi-step-form/CountryPickerField';
import ZipCodeInputField from '@/components/multi-step-form/ZipCodeInputField';
import { setLoanFormStep, setLocation } from '@/redux/loanForm/slice';
import TabContent from '@/components/multi-step-form/TabContent';
import { IAddress, ICoordinates } from '@/redux/loanForm/types';
import { selectLoanForm } from '@/redux/loanForm/selectors';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/redux';
import { fetchSubmitLoanFormStep } from '@/redux/loanForm/asyncActions';

const FormLocation = () => {
  const form = useSelector(selectLoanForm);
  const { country, address, latitude, longitude, latitudeDelta, longitudeDelta, zipCode } = form.location;

  const dispatch = useAppDispatch();
  const mapRef = useRef<MapView | null>(null);

  const onChangeCountry = (country: string) => dispatch(setLocation({ country }));
  const onChangeZipCode = (zipCode: string) => dispatch(setLocation({ zipCode }));
  const onChangeAddress = (geoLocation: ICoordinates & IAddress) => dispatch(setLocation({ ...geoLocation }));

  const isCompleted = !!country.length && !!address.length && zipCode.length > 4;

  const handleGoNext = () => {
    if (isCompleted) {
      dispatch(fetchSubmitLoanFormStep(form));
    }
  };

  React.useEffect(() => {
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
        value={address}
        country={country}
        containerStyle="mt-2"
        onChange={onChangeAddress}
      />
      <ZipCodeInputField title="Zip Code" containerStyle="mt-2" value={zipCode} onChange={onChangeZipCode} />
      <View className="mt-3 flex-1 mb-3">
        <Text className="text-gray-3">Location</Text>
        <View className="relative flex-1 mt-1 rounded-xl overflow-hidden">
          <MapView
            style={{ width: '100%', height: '100%' }}
            ref={mapRef}
            region={{
              latitude,
              longitude,
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
