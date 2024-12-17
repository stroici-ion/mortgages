import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILoanForm, ILocation } from './types';
import { extraReducers } from './extraReducers';
import { initialState } from './initialState';

const loanForm = createSlice({
  name: 'loanForm',
  initialState,
  reducers: {
    setLoanFormStep: (state, action: PayloadAction<number>) => {
      state.loanFormStep = action.payload;
    },

    setForm: (state, action: PayloadAction<Partial<ILoanForm>>) => {
      state.form = { ...state.form, ...action.payload };
    },

    resetForm: (state) => {
      state.form = initialState.form;
      state.loanFormStep = 0;
    },
  },
  extraReducers,
});

export const { setLoanFormStep, setForm, resetForm } = loanForm.actions;

export default loanForm.reducer;
