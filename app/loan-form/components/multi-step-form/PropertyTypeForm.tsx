import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

import { setForm, setLoanFormStep } from '@/redux/loanForm/slice';
import TabContent from '@/components/multi-step-form/TabContent';
import { selectLoanForm } from '@/redux/loanForm/selectors';
import { ELoanPropertyType } from '@/redux/loanForm/types';
import ListItem from '@/components/ui/ListItem';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/redux';
import { icons } from '@/constants';
import { fetchSubmitLoanFormStep } from '@/redux/loanForm/asyncActions';

const PropertyTypeForm = () => {
  const dispatch = useAppDispatch();
  const form = useSelector(selectLoanForm);

  const goNext = () => dispatch(fetchSubmitLoanFormStep(form));

  const setActionType = (propertyType: ELoanPropertyType) => dispatch(setForm({ propertyType }));

  const propertyTypesList = [
    {
      type: ELoanPropertyType.SINGLE_FAMILY,
      title: 'Single family home',
      icon: icons.home,
    },
    {
      type: ELoanPropertyType.TOWM_HOME,
      title: 'Town Home',
      icon: icons.townhome,
    },
    {
      type: ELoanPropertyType.CONDOMINIUM,
      title: 'Condominium',
      icon: icons.condomium,
    },
    {
      type: ELoanPropertyType.APARTAMENT,
      title: 'Apartament',
      icon: icons.apartment,
    },
    {
      type: ELoanPropertyType.OTHER_2_4,
      title: 'Other 2-4 unit',
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
            containerStyle={`${form.propertyType === item.type && 'border-primary text-black'}`}
          />
        )}
      />
      <Button title="Continue" handlePress={goNext} />
    </TabContent>
  );
};

export default PropertyTypeForm;
