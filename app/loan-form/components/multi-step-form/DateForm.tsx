import { useSelector } from 'react-redux';
import { View } from 'react-native';
import React from 'react';

import { fetchSubmitLoanFormStep } from '@/redux/loanForm/asyncActions';
import { setForm } from '@/redux/loanForm/slice';
import DatePicker from '@/components/multi-step-form/DatePicker';
import TabContent from '@/components/multi-step-form/TabContent';
import { selectLoanForm } from '@/redux/loanForm/selectors';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/redux';
import { EFormStepType } from '@/redux/loanForm/types';

const DateForm = () => {
  const { date } = useSelector(selectLoanForm);
  const dispatch = useAppDispatch();

  const setDate = (date: string) => dispatch(setForm({ date }));

  const goNext = () => dispatch(fetchSubmitLoanFormStep([{ date }, EFormStepType.date]));

  return (
    <TabContent title="When would you like to complete the purchase?">
      <View className="flex-1">
        <DatePicker title="Purchase Date" value={date} onChange={setDate} />
      </View>
      <Button title="Continue" handlePress={goNext} />
    </TabContent>
  );
};

export default DateForm;
