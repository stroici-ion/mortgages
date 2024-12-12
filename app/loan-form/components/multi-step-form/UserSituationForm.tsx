import { useSelector } from 'react-redux';
import { FlatList, View } from 'react-native';
import React from 'react';

import { setForm } from '@/redux/loanForm/slice';
import TabContent from '@/components/multi-step-form/TabContent';
import { selectLoanForm } from '@/redux/loanForm/selectors';
import { EUserSituation } from '@/redux/loanForm/types';
import ListItem from '@/components/ui/ListItem';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/redux';
import { icons } from '@/constants';
import { fetchSubmitLoanFormStep } from '@/redux/loanForm/asyncActions';

const UserSituationForm = () => {
  const form = useSelector(selectLoanForm);
  const dispatch = useAppDispatch();

  const setActionType = (userSituationType: EUserSituation) => dispatch(setForm({ userSituationType }));

  const goNext = () => dispatch(fetchSubmitLoanFormStep(form));

  const userSituation = [
    {
      type: EUserSituation.HOSPITALITIST,
      title: 'Practicing Hospitalist',
      subtitle: 'Practicing hospitalist with W2 paystubs',
      icon: icons.medicalCross,
    },
    {
      type: EUserSituation.EXITING_RESIDENCY,
      title: 'Exiting Residency',
      icon: icons.building,
    },
    {
      type: EUserSituation.EXITING_FELLOESHIP,
      title: 'Exiting Fellowship',
      icon: icons.friends,
    },
    {
      type: EUserSituation.SELF_EMPLOYED,
      title: 'Self-employed Clinician',
      icon: icons.user,
    },
  ];

  return (
    <TabContent title="Next, tell us a little about your own situation.">
      <FlatList
        contentContainerClassName="gap-4 pb-10"
        data={userSituation}
        renderItem={({ item }) => (
          <>
            <ListItem
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              onPress={() => setActionType(item.type)}
              containerStyle={`${form.userSituationType === item.type && 'border-primary text-black'}`}
            />
          </>
        )}
      />
      <Button title="Continue" handlePress={goNext} />
    </TabContent>
  );
};

export default UserSituationForm;
