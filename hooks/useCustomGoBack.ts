import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useCustomGoBack = (fn: any) => {
  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      fn();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove();
    };
  }, [router, fn]);
};

export default useCustomGoBack;
