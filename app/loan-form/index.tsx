import { View, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import React, { Component, useEffect, useState } from 'react';

import ProgressBar from '@/components/multi-step-form/ProgressBar';
import useCustomGoBack from '@/hooks/useCustomGoBack';
import { router } from 'expo-router';
import { icons } from '@/constants';
import Forms from './components/multi-step-form';
import { useSelector } from 'react-redux';
import { selectLoanForm, selectLoanFormStep } from '@/redux/loanForm/selectors';
import { useAppDispatch } from '@/redux';
import { resetForm, setLoanFormStep } from '@/redux/loanForm/slice';
import { fetchLoan } from '@/redux/loanForm/asyncActions';
import { useMultiStepFormConfig } from '@/hooks/useMultiStepFormConfig ';

export const multiStepFormOrder = [
  { key: 0, title: 'action_type_step', component: Forms.ActionTypeForm },
  { key: 2, title: 'location_step', component: Forms.LocationForm },
  { key: 7, title: 'property_type_step', component: Forms.PropertyTypeForm },
  { key: 3, title: 'price_step', component: Forms.PriceForm },
  { key: 4, title: 'user_situation_step', component: Forms.UserSituationForm },
  { key: 5, title: 'targets_step', component: Forms.TargetsForm },
  { key: 1, title: 'date_step', component: Forms.DateForm },
  { key: 6, title: 'gift_funds_step', component: Forms.GiftFundsForm },
];

const StepPage = () => {
  const loanFormStep = useSelector(selectLoanFormStep);
  const { formCompleted, id } = useSelector(selectLoanForm);
  const dispatch = useAppDispatch();

  const setIndex = (index: number) => {
    dispatch(setLoanFormStep(index));
  };

  const goBack = () => {
    if (loanFormStep > 0) dispatch(setLoanFormStep(loanFormStep - 1));
    else router.back();
  };

  useCustomGoBack(goBack);
  const { routes, renderScene } = useMultiStepFormConfig(multiStepFormOrder);

  useEffect(() => {
    if (formCompleted && id) {
      router.replace('/loan-form/loan-result');
      dispatch(fetchLoan(id));
      dispatch(resetForm());
    }
  }, [formCompleted]);

  const progress = ((loanFormStep + 1) / routes.length) * 100;

  return (
    <SafeAreaView className="h-full">
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className="flex-1 bg-white h-full">
          <View className="px-5 mt-7">
            <TouchableOpacity onPress={goBack}>
              <Image source={icons.back} resizeMode="contain" className="w-6 h-6" />
            </TouchableOpacity>
            <ProgressBar
              progress={progress}
              step={loanFormStep + 1}
              totalSteps={routes.length}
              containerStyles="mt-4"
            />
          </View>
          <View className="flex-1">
            <TabView
              swipeEnabled={false}
              renderTabBar={() => null}
              navigationState={{ index: loanFormStep, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StepPage;
