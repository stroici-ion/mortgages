import { RootState } from '..';

export const selectLoanForm = (state: RootState) => state.loanForm.form;
export const selectLoanFormState = (state: RootState) => state.loanForm;
export const selectLoans = (state: RootState) => state.loanForm.loans;
export const selectLoanFormStep = (state: RootState) => state.loanForm.loanFormStep;
