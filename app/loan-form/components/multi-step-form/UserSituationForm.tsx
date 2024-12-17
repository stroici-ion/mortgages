import { useSelector } from 'react-redux';
import { FlatList, View } from 'react-native';
import React from 'react';

import { setForm } from '@/redux/loanForm/slice';
import TabContent from '@/components/multi-step-form/TabContent';
import { selectLoanForm } from '@/redux/loanForm/selectors';
import { EFormStepType, EUserSituation } from '@/redux/loanForm/types';
import ListItem from '@/components/ui/ListItem';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/redux';
import { icons } from '@/constants';
import { fetchSubmitLoanFormStep } from '@/redux/loanForm/asyncActions';
import { getUserSituationValue } from '@/utils/getUserSituationValue';

const UserSituationForm = () => {
  const { userSituation } = useSelector(selectLoanForm);
  const dispatch = useAppDispatch();

  const setActionType = (userSituation: EUserSituation) => dispatch(setForm({ userSituation }));

  const goNext = () => dispatch(fetchSubmitLoanFormStep([{ userSituation }, EFormStepType.user_situation]));

  const userSituationTypes = [
    {
      type: EUserSituation.HOSPITALITIST,
      ...getUserSituationValue(EUserSituation.HOSPITALITIST),
      icon: icons.medicalCross,
    },
    {
      type: EUserSituation.EXITING_RESIDENCY,
      ...getUserSituationValue(EUserSituation.EXITING_RESIDENCY),
      icon: icons.building,
    },
    {
      type: EUserSituation.EXITING_FELLOESHIP,
      ...getUserSituationValue(EUserSituation.EXITING_FELLOESHIP),
      icon: icons.friends,
    },
    {
      type: EUserSituation.SELF_EMPLOYED,
      ...getUserSituationValue(EUserSituation.SELF_EMPLOYED),
      icon: icons.user,
    },
  ];

  return (
    <TabContent title="Next, tell us a little about your own situation.">
      <FlatList
        contentContainerClassName="gap-4 pb-10"
        data={userSituationTypes}
        renderItem={({ item }) => (
          <>
            <ListItem
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              onPress={() => setActionType(item.type)}
              containerStyle={`${userSituation === item.type && 'border-primary text-black'}`}
            />
          </>
        )}
      />
      <Button title="Continue" handlePress={goNext} />
    </TabContent>
  );
};

export default UserSituationForm;
