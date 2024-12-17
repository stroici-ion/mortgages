import { useSelector } from 'react-redux';
import { ScrollView, View } from 'react-native';
import React from 'react';

import NumberInputField from '../../../../components/multi-step-form/PriceInputField';
import { fetchSubmitLoanFormStep } from '@/redux/loanForm/asyncActions';
import TabContent from '@/components/multi-step-form/TabContent';
import { selectLoanForm } from '@/redux/loanForm/selectors';
import { setForm } from '@/redux/loanForm/slice';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/redux';
import { EFormStepType } from '@/redux/loanForm/types';

const GiftFundsForm = () => {
  const dispatch = useAppDispatch();
  const { giftFunds } = useSelector(selectLoanForm);

  const setGiftFunds = (giftFunds: number) => dispatch(setForm({ giftFunds }));
  const goNext = () => dispatch(fetchSubmitLoanFormStep([{ giftFunds }, EFormStepType.gift_funds]));

  return (
    <TabContent title="Tell us if you have gift funds you'd like to use twards your purchase?">
      <View className="flex-1">
        <ScrollView contentContainerClassName="gap-4 pb-10">
          <NumberInputField value={giftFunds} onChange={setGiftFunds} decorator="$" />
        </ScrollView>
      </View>
      <Button title="Continue" handlePress={goNext} />
    </TabContent>
  );
};

export default GiftFundsForm;
