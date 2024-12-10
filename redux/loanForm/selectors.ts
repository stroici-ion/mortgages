import { RootState } from '..';

export const selectLoanForm = (state: RootState) => state.loanForm.form;
export const selectLoanFormState = (state: RootState) => state.loanForm;
