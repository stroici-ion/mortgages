import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import loanForm from './loanForm/slice';
// import audience from './defaultAudience/slice';

const store = configureStore({
  reducer: {
    loanForm,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
