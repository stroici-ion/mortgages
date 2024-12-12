import { View, Text, SafeAreaView, Image, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

import { icons } from '../constants';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/redux';
import { setLoanFormStep } from '@/redux/loanForm/slice';
import { useSelector } from 'react-redux';
import { selectLoanFormState } from '@/redux/loanForm/selectors';

const App = () => {
  const dispatch = useAppDispatch();
  const mortgages = useSelector(selectLoanFormState);

  const handleTakeOutALoan = () => {
    dispatch(setLoanFormStep(0));
    router.push('/loan-form');
  };

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
            className="border border-gray-2 rounded-xl p-3 items-center justify-center"
            onPress={() => router.push('/loan-form/loan-result')}
          >
            <Text className="text-center">{item.location.address}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Request for Mortgage" containerStyles="m-5 mb-10" handlePress={handleTakeOutALoan} />
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default App;
