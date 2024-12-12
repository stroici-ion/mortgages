import { View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

import TabContent from '@/components/multi-step-form/TabContent';
import { selectLoanForm } from '@/redux/loanForm/selectors';
import { ELoanActionType } from '@/redux/loanForm/types';
import { setForm } from '@/redux/loanForm/slice';
import { useAppDispatch } from '@/redux';
import { icons } from '@/constants';
import Button from '@/components/ui/Button';
import CardItem from '@/components/ui/CardItem';
import { fetchSubmitLoanFormStep } from '@/redux/loanForm/asyncActions';

const ActionTypeForm = () => {
  const dispatch = useAppDispatch();
  const form = useSelector(selectLoanForm);

  const setActionType = (actionType: ELoanActionType) => dispatch(setForm({ actionType }));
  const goNext = () => dispatch(fetchSubmitLoanFormStep(form));

  const actionTypes = [
    {
      type: ELoanActionType.BUY,
      title: 'Buy a new home',
      icon: icons.moneySend,
    },
    {
      type: ELoanActionType.REFINANCE,
      title: 'Refinance my home loan',
      icon: icons.moneyRecieve,
    },
  ];

  return (
    <TabContent title="What would you like to do today?">
      <View className="flex-row gap-2 items-start flex-1">
        {actionTypes.map((a) => (
          <CardItem
            key={a.type}
            title={a.title}
            icon={a.icon}
            onPress={() => setActionType(a.type)}
            active={form.actionType === a.type}
            containerStyle="flex-[50%]"
          />
        ))}
      </View>
      <Button title="Continue" handlePress={goNext} />
    </TabContent>
  );
};

export default ActionTypeForm;
