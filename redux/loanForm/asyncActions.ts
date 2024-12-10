import { createAsyncThunk } from '@reduxjs/toolkit';

import { ILoanForm } from './types';
import Api, { IFetchError } from '@/services/api';

const api = new Api('https://fakeapi.com');

export const fetchSubmitLoanFormStep = createAsyncThunk<ILoanForm, ILoanForm, { rejectValue: IFetchError }>(
  'auth/fetchSubmitLoanFormStep',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.submitLoanForm(params);
      return response;
    } catch (error: any) {
      if (!error.data.message) {
        throw error;
      }
      return rejectWithValue(error.data as IFetchError);
    }
  }
);
