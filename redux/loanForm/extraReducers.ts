import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ILoanFormState } from './types';
import { fetchSubmitLoanFormStep } from './asyncActions';
import { EFetchStatus } from '@/services/api';
import { formInitialState } from './initialState';

export const extraReducers = (builder: ActionReducerMapBuilder<ILoanFormState>) => {
  //* POSTS LIST
  builder.addCase(fetchSubmitLoanFormStep.pending, (state) => {
    state.status = EFetchStatus.PENDING;
  });
  builder.addCase(fetchSubmitLoanFormStep.fulfilled, (state, action) => {
    state.status = EFetchStatus.FULLFILLED;

    if (action.payload.step === 7) {
      state.form = { ...formInitialState, step: state.form.step };
      state.loans = [action.payload];
    } else {
      state.form = action.payload;
    }
    state.form.step++;

    state.error = null;
  });
  builder.addCase(fetchSubmitLoanFormStep.rejected, (state, action) => {
    state.status = EFetchStatus.ERROR;
    state.error = action.payload?.message || null;
  });
};
