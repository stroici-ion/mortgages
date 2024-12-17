import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

import { setForm, setLoanFormStep } from '@/redux/loanForm/slice';
import TabContent from '@/components/multi-step-form/TabContent';
import { selectLoanForm } from '@/redux/loanForm/selectors';
import { EFormStepType, ELoanPropertyType } from '@/redux/loanForm/types';
import ListItem from '@/components/ui/ListItem';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/redux';
import { icons } from '@/constants';
import { fetchSubmitLoanFormStep } from '@/redux/loanForm/asyncActions';
import { getPropertyTypeValue } from '@/utils/getPropertyTypeValue';

const PropertyTypeForm = () => {
  const dispatch = useAppDispatch();
  const { propertyType } = useSelector(selectLoanForm);

  const goNext = () => dispatch(fetchSubmitLoanFormStep([{ propertyType }, EFormStepType.property_type]));

  const setActionType = (propertyType: ELoanPropertyType) => dispatch(setForm({ propertyType }));

  const propertyTypesList = [
    {
      type: ELoanPropertyType.SINGLE_FAMILY,
      title: getPropertyTypeValue(ELoanPropertyType.SINGLE_FAMILY),
      icon: icons.home,
    },
    {
      type: ELoanPropertyType.TOWM_HOME,
      title: getPropertyTypeValue(ELoanPropertyType.TOWM_HOME),
      icon: icons.townhome,
    },
    {
      type: ELoanPropertyType.CONDOMINIUM,
      title: getPropertyTypeValue(ELoanPropertyType.CONDOMINIUM),
      icon: icons.condomium,
    },
    {
      type: ELoanPropertyType.APARTAMENT,
      title: getPropertyTypeValue(ELoanPropertyType.APARTAMENT),
      icon: icons.apartment,
    },
    {
      type: ELoanPropertyType.OTHER_2_4,
      title: getPropertyTypeValue(ELoanPropertyType.OTHER_2_4),
      icon: icons.building,
    },
  ];

  return (
    <TabContent title="What kind of a property is it?">
      <FlatList
        className="mb-5"
        contentContainerClassName="gap-4 pb-10"
        data={propertyTypesList}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            icon={item.icon}
            onPress={() => setActionType(item.type)}
            containerStyle={`${propertyType === item.type && 'border-primary text-black'}`}
          />
        )}
      />
      <Button title="Continue" handlePress={goNext} />
    </TabContent>
  );
};

export default PropertyTypeForm;
