import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';

import NumberInputField from '../../../../components/multi-step-form/PriceInputField';
import SliderField from '../../../../components/ui/SliderField';
import { selectLoanForm } from '@/redux/loanForm/selectors';
import { setForm } from '@/redux/loanForm/slice';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/redux';
import TabContent from '@/components/multi-step-form/TabContent';
import { fetchSubmitLoanFormStep } from '@/redux/loanForm/asyncActions';
import { EFormStepType } from '@/redux/loanForm/types';

const PriceForm = () => {
  const dispatch = useAppDispatch();
  const { price, downPaymentRate } = useSelector(selectLoanForm);

  const [sliderValue, setSliderValue] = useState(downPaymentRate);

  const onChangeSliderValue = (value: number) => {
    setSliderValue(value);
  };

  const setPrice = (price: number) => dispatch(setForm({ price }));
  const setDownPayment = (downPaymentRate: number) => dispatch(setForm({ downPaymentRate }));

  const isCompleted = downPaymentRate && price;

  const handleGoNext = () => {
    if (isCompleted) {
      dispatch(fetchSubmitLoanFormStep([{ price, downPaymentRate }, EFormStepType.price]));
    }
  };

  return (
    <TabContent title="How much do you want to buy your home for?">
      <View className="flex-1">
        <ScrollView contentContainerClassName="gap-1 pb-10">
          <View className="flex-row mt-4">
            <NumberInputField value={price} onChange={setPrice} decorator="$" />
          </View>
          <Text className="text-xl font-imedium mt-4">How much down payment can you put towards your home?</Text>
          <Text className="text-gray-3 mt-1 text-sm">Tipicaly people can around 0-25%</Text>
          <View className="flex-row mt-5">
            <NumberInputField
              inactive={true}
              value={Math.floor((price * sliderValue) / 100)}
              onChange={() => {}}
              decorator="$"
            />
          </View>
          <SliderField
            value={sliderValue}
            onChange={onChangeSliderValue}
            onSlidingComplete={setDownPayment}
            minimumValue={0}
            maximumValue={100}
            measurement="%"
          />
        </ScrollView>
      </View>
      <Button title="Continue" handlePress={handleGoNext} disabled={!isCompleted} />
    </TabContent>
  );
};

export default PriceForm;
