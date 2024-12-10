import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ELoanActionType, ELoanPropertyType, EUserSituation, ILoanForm, ILoanFormState, ILocation } from './types';
import { EFetchStatus } from '@/services/api';
import { extraReducers } from './extraReducers';
import { formatDate } from '@/utils/formatDate';

export const formInitialState: ILoanForm = {
  step: 0,
  actionType: ELoanActionType.BUY,

  location: {
    country: '',
    address: '',
    zipCode: '',
    latitude: 47.0105,
    longitude: 28.8638,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },

  price: 0,
  downPayment: 25,
  monthlyPayment: 0,
  xField: 7283,
  loanDuration: '10',
  rate: 0,
  giftFunds: 0,

  propertyType: ELoanPropertyType.SINGLE_FAMILY,
  userSituationType: EUserSituation.HOSPITALITIST,
  date: formatDate(new Date()),
};

const initialState: ILoanFormState = {
  status: EFetchStatus.PENDING,
  error: null,
  loans: [],
  form: formInitialState,
};

const loanForm = createSlice({
  name: 'loanForm',
  initialState,
  reducers: {
    setLoanFormStep: (state, action: PayloadAction<number>) => {
      state.form.step = action.payload;
    },

    setForm: (state, action: PayloadAction<Partial<ILoanForm>>) => {
      state.form = { ...state.form, ...action.payload };
    },

    setLocation: (state, action: PayloadAction<Partial<ILocation>>) => {
      state.form.location = { ...state.form.location, ...action.payload };
    },
  },
  extraReducers,
});

export const { setLoanFormStep, setForm, setLocation } = loanForm.actions;

export default loanForm.reducer;
