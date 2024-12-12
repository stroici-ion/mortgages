import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILoanForm, ILocation } from './types';
import { extraReducers } from './extraReducers';
import { initialState } from './initialState';

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
