import { View, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import React, { useEffect, useState } from 'react';

import ProgressBar from '@/components/multi-step-form/ProgressBar';
import useCustomGoBack from '@/hooks/useCustomGoBack';
import { router } from 'expo-router';
import { icons } from '@/constants';
import Forms from './components/multi-step-form';
import { useSelector } from 'react-redux';
import { selectLoanForm } from '@/redux/loanForm/selectors';
import { useAppDispatch } from '@/redux';
import { setLoanFormStep } from '@/redux/loanForm/slice';

const StepPage = () => {
  const form = useSelector(selectLoanForm);
  const dispatch = useAppDispatch();

  const goNext = () => {
    if (form.step < routes.length - 1) dispatch(setLoanFormStep(form.step + 1));
  };

  const setIndex = (index: number) => {
    dispatch(setLoanFormStep(index));
  };

  const goBack = () => {
    if (form.step > 0) dispatch(setLoanFormStep(form.step - 1));
    else router.back();
  };

  useCustomGoBack(goBack);

  const [routes] = useState([
    { key: 1, title: '1' },
    { key: 2, title: '2' },
    { key: 3, title: '3' },
    { key: 4, title: '4' },
    { key: 5, title: '5' },
    { key: 6, title: '6' },
    { key: 7, title: '7' },
    { key: 8, title: '8' },
  ]);

  const renderScene = SceneMap({
    1: Forms.ActionTypeForm,
    2: Forms.LocationForm,
    3: Forms.PropertyTypeForm,
    4: Forms.PriceForm,
    5: Forms.UserSituationForm,
    6: Forms.DateForm,
    7: Forms.TargetsForm,
    8: Forms.GiftFundsForm,
  });

  useEffect(() => {
    if (form.step === routes.length) {
      setLoanFormStep(0);
      router.replace('/loan-form/loan-result');
    }
  });

  const progress = ((form.step + 1) / routes.length) * 100;

  return (
    <SafeAreaView className="h-full">
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className="flex-1 bg-white h-full">
          <View className="px-5 mt-7">
            <TouchableOpacity onPress={goBack}>
              <Image source={icons.back} resizeMode="contain" className="w-6 h-6" />
            </TouchableOpacity>
            <ProgressBar progress={progress} step={form.step + 1} totalSteps={routes.length} containerStyles="mt-4" />
          </View>
          <View className="flex-1">
            <TabView
              swipeEnabled={false}
              renderTabBar={() => null}
              navigationState={{ index: form.step, routes }}
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
