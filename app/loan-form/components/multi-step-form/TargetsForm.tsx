import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

import NumberInputField from '@/components/multi-step-form/PriceInputField';
import PickerField from '@/components/multi-step-form/PickerField';
import { selectLoanForm } from '@/redux/loanForm/selectors';
import { setForm, setLoanFormStep } from '@/redux/loanForm/slice';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/redux';
import TabContent from '@/components/multi-step-form/TabContent';
import { fetchSubmitLoanFormStep } from '@/redux/loanForm/asyncActions';

const TargetsForm = () => {
  const form = useSelector(selectLoanForm);
  const dispatch = useAppDispatch();

  const setMonthlyPayment = (monthlyPayment: number) => dispatch(setForm({ monthlyPayment }));
  const setXField = (xField: number) => dispatch(setForm({ xField }));
  const setLoanDuration = (value: string) => dispatch(setForm({ loanDuration: value }));
  const setRate = (rate: number) => dispatch(setForm({ rate }));

  const isCompleted = form.loanDuration && form.monthlyPayment && form.rate && form.xField;

  const handleGoNext = () => {
    if (isCompleted) {
      dispatch(fetchSubmitLoanFormStep(form));
    }
  };

  const loanDurationOptions = [
    { label: '5 Yrs', value: '5' },
    { label: '6 Yrs', value: '6' },
    { label: '7 Yrs', value: '7' },
    { label: '8 Yrs', value: '8' },
    { label: '9 Yrs', value: '9' },
    { label: '10 Yrs', value: '10' },
    { label: '11 Yrs', value: '11' },
    { label: '13 Yrs', value: '13' },
    { label: '14 Yrs', value: '14' },
    { label: '15 Yrs', value: '15' },
    { label: '16 Yrs', value: '16' },
    { label: '17 Yrs', value: '17' },
    { label: '18 Yrs', value: '18' },
    { label: '19 Yrs', value: '19' },
    { label: '20 Yrs', value: '20' },
    { label: '21 Yrs', value: '21' },
    { label: '22 Yrs', value: '22' },
    { label: '23 Yrs', value: '23' },
    { label: '24 Yrs', value: '24' },
    { label: '25 Yrs', value: '25' },
  ];

  return (
    <TabContent title="We realy want you to have the best deal possible. Do you have any targets you'd like to meet?">
      <View className="flex-1">
        <ScrollView contentContainerClassName="gap-4 pb-10">
          <PickerField
            title="Duration of Loan"
            value={`${form.loanDuration}`}
            options={loanDurationOptions}
            onChange={setLoanDuration}
          />
          <NumberInputField
            title="Monthly payment"
            value={form.monthlyPayment}
            onChange={setMonthlyPayment}
            decorator="$"
          />
          <NumberInputField title="Rate %" value={form.rate} onChange={setRate} decorator="%" maxValue={100} />
          <NumberInputField title="X Field" value={form.xField} onChange={setXField} decorator="$" />
        </ScrollView>
      </View>
      <Button title="Continue" handlePress={handleGoNext} disabled={!isCompleted} />
    </TabContent>
  );
};

export default TargetsForm;
