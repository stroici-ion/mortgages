import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';

import { getUserSituationValue } from '@/utils/getUserSituationValue';
import { getPropertyTypeValue } from '@/utils/getPropertyTypeValue';
import { selectLoanFormState } from '@/redux/loanForm/selectors';
import StepStatus from '@/components/ui/StepStatus';
import DetailRow from '@/components/ui/DetailRow';
import Button from '@/components/ui/Button';
import { useSelector } from 'react-redux';
import { icons } from '@/constants';

const LoanResult = () => {
  const loan = useSelector(selectLoanFormState).loans[0];
  const goBack = () => router.back();
  const [status, setStatus] = useState({ 1: 'awaiting', 2: 'awaiting', 3: 'awaiting' });

  useEffect(() => {
    let currentStep = 1;

    const interval = setInterval(() => {
      setStatus((prevStatus) => {
        const updatedStatus = { ...prevStatus };

        if (currentStep === 1) {
          updatedStatus['1'] = 'fullfilled';
        }

        if (currentStep === 2) {
          if (prevStatus['2'] === 'awaiting') {
            updatedStatus['2'] = 'pending';
          } else {
            updatedStatus['2'] = 'fullfilled';
          }
        }

        if (currentStep === 3) {
          if (prevStatus['3'] === 'awaiting') {
            updatedStatus['3'] = 'pending';
          } else {
            updatedStatus['3'] = 'fullfilled';
          }
        }

        currentStep = (currentStep % 3) + 1;

        return updatedStatus;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!loan) return null;

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5 mt-7">
        <TouchableOpacity onPress={goBack}>
          <Image source={icons.back} resizeMode="contain" className="w-6 h-6" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 pl-8 pr-8 pb-8 pt-2 gap-4">
        <View className="flex-row items-center justify-center mt-0 gap-5">
          <Image source={icons.logo} resizeMode="contain" className="w-20 h-20" />
          <Text className="text-2xl font-imedium">Mortgages</Text>
        </View>
        <View className="border border-gray-2 p-7 py-4 rounded-2xl">
          <DetailRow title="Property" value={getPropertyTypeValue(loan.propertyType)} />
          <DetailRow title="Amount" value={'$' + loan.price} />
          <DetailRow title="Own situation" value={getUserSituationValue(loan.userSituation).title} />
          <DetailRow title="Purchase date" value={loan.date} containerStyle="border-b-0" />
        </View>
        <View className="gap-5">
          <StepStatus title="Document Review" step={1} status={status[1]} />
          <StepStatus title="Pending Final Approval" step={2} status={status[2]} />
          <StepStatus title="Approved" step={3} status={status[3]} />
        </View>
        <View className="flex-1 justify-end">
          <TouchableOpacity className="border border-gray-2 rounded-xl p-3 items-center justify-center">
            <Text className="text-center font-iregular text-sm">Talk to Your Loan Officer</Text>
          </TouchableOpacity>
          <Button handlePress={() => router.back()} title="Back to Home" containerStyles="mt-3" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoanResult;
