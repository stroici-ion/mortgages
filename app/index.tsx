import { View, Text, SafeAreaView, Image, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { router } from 'expo-router';

import { icons } from '../constants';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/redux';
import { setLoanFormStep } from '@/redux/loanForm/slice';
import { useSelector } from 'react-redux';
import { selectLoanFormState } from '@/redux/loanForm/selectors';
import { fetchLoans } from '@/redux/loanForm/asyncActions';

const App = () => {
  const dispatch = useAppDispatch();
  const mortgages = useSelector(selectLoanFormState);

  const handleTakeOutALoan = () => {
    router.push('/loan-form');
  };

  useEffect(() => {
    dispatch(fetchLoans());
  }, []);

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-row items-center justify-center mt-10 gap-5">
        <Image source={icons.logo} resizeMode="contain" className="w-20 h-20" />
        <Text className="text-2xl font-imedium">Mortgages</Text>
      </View>
      <FlatList
        className="w-full p-10 flex-1"
        contentContainerClassName=""
        data={mortgages.loans}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="border border-gray-2 rounded-xl p-3 items-start mt-2"
            onPress={() => router.push('/loan-form/loan-result')}
          >
            <Text className="text-center">{item.address}</Text>
          </TouchableOpacity>
        )}
      />
      {mortgages.form.id && <Text className="text-xs text-gray-3 text-center">You have an uncompleted loan form</Text>}
      <Button
        title={mortgages.form.id ? 'Continue to form' : 'Request for Mortgage'}
        containerStyles="m-5 mb-10"
        handlePress={handleTakeOutALoan}
      />
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default App;
