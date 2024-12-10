import React from 'react';
import { useEffect, useState } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { Provider } from 'react-redux';
import * as Crypto from 'expo-crypto';

import '../styles/global.css';
import store from '../redux';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
      setIsLoading(false);
      if (typeof global.crypto === 'undefined') {
        global.crypto = {
          //@ts-ignore
          getRandomValues: (buffer: Uint8Array) => {
            return Crypto.getRandomBytesAsync(buffer.length);
          },
        };
      }
    }, 2000);
  }, []);

  if (isLoading) return null;

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
