import React from 'react';
import { useEffect, useState } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { Provider } from 'react-redux';
import * as Crypto from 'expo-crypto';
import {
  Inter_900Black,
  Inter_700Bold,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_400Regular,
  Inter_300Light,
  useFonts,
} from '@expo-google-fonts/inter';

import '../styles/global.css';
import store from '../redux';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    Inter_900Black,
    Inter_700Bold,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_400Regular,
    Inter_300Light,
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      if (typeof global.crypto === 'undefined') {
        global.crypto = {
          //@ts-ignore
          getRandomValues: (buffer: Uint8Array) => {
            return Crypto.getRandomBytesAsync(buffer.length);
          },
        };
        SplashScreen.hideAsync();
      }
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="loan-form/index" options={{ headerShown: false }} />
        <Stack.Screen name="loan-form/loan-result" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
