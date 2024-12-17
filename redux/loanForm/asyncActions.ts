import { createAsyncThunk } from '@reduxjs/toolkit';

import { EFormStepType, ILoan, ILoanForm, ILoanFormParams } from './types';
import Api, { IFetchError } from '@/services/api';
import { RootState } from '..';

const api = new Api();

export const fetchSubmitLoanFormStep = createAsyncThunk<
  ILoanForm,
  [Partial<ILoanForm>, EFormStepType],
  { rejectValue: IFetchError }
>('loanForm/fetchSubmitLoanFormStep', async (formParams, { rejectWithValue, getState, dispatch }) => {
  try {
    const params: ILoanFormParams = { loan: { ...formParams[0] }, formProgress: { activeStep: formParams[1] } };
    const state = getState() as RootState;
    const id = state.loanForm.form.id;
    const data = await api.submitLoanForm(params, id);
    return data;
  } catch (error: any) {
    if (!error.data.message) {
      throw error;
    }
    return rejectWithValue(error.data as IFetchError);
  }
});

export const fetchLoan = createAsyncThunk<ILoan, number, { rejectValue: IFetchError }>(
  'loanForm/fetchLoan',
  async (id, { rejectWithValue }) => {
    try {
      return await api.getLoan(id);
    } catch (error: any) {
      if (!error.data.message) {
        throw error;
      }
      return rejectWithValue(error.data as IFetchError);
    }
  }
);

export const fetchLoans = createAsyncThunk<
  { loans: ILoan[]; incompletedLoanForm?: ILoanForm & { activeStep: string } },
  undefined,
  { rejectValue: IFetchError }
>('loanForm/fetchLoans', async (undefined, { rejectWithValue }) => {
  try {
    return await api.getLoans();
  } catch (error: any) {
    if (!error.data.message) {
      throw error;
    }
    return rejectWithValue(error.data as IFetchError);
  }
});
