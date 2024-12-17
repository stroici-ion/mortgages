import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ILoanFormState } from './types';
import { fetchLoan, fetchLoans, fetchSubmitLoanFormStep } from './asyncActions';
import { EFetchStatus } from '@/services/api';
import { multiStepFormOrder } from '@/app/loan-form';

export const extraReducers = (builder: ActionReducerMapBuilder<ILoanFormState>) => {
  builder.addCase(fetchSubmitLoanFormStep.pending, (state) => {
    state.status = EFetchStatus.PENDING;
  });
  builder.addCase(fetchSubmitLoanFormStep.fulfilled, (state, action) => {
    state.status = EFetchStatus.FULLFILLED;

    const newLoanForm = { ...action.payload, latitudeDelta: 0.001, longitudeDelta: 0.001 };
    console.log('Loan Form', newLoanForm);
    state.form = newLoanForm;

    state.loanFormStep++;
    state.error = null;
  });
  builder.addCase(fetchSubmitLoanFormStep.rejected, (state, action) => {
    state.status = EFetchStatus.ERROR;
    state.error = action.payload?.message || null;
  });

  builder.addCase(fetchLoan.fulfilled, (state, action) => {
    state.loans = [...state.loans, action.payload];
  });

  builder.addCase(fetchLoans.fulfilled, (state, action) => {
    state.loans = action.payload.loans;
    if (action.payload.incompletedLoanForm) {
      const stepCandidate = multiStepFormOrder.findIndex(
        (step) => step.title === action.payload.incompletedLoanForm?.activeStep
      );

      state.loanFormStep = stepCandidate;

      const newLoanForm = { ...action.payload.incompletedLoanForm, latitudeDelta: 0.001, longitudeDelta: 0.001 };
      console.log('Incompleted Form', newLoanForm);
      state.form = newLoanForm;
    }
  });
};
