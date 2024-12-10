import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardState = () => {
  const [isKeyboardActive, setKeyboardActive] = useState(false);

  useEffect(() => {
    const handleKeyboardDidShow = () => setKeyboardActive(true);
    const handleKeyboardDidHide = () => setKeyboardActive(false);

    const showListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    const hideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return { isKeyboardActive };
};

export default useKeyboardState;
