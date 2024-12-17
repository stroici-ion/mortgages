import { ELoanActionType } from '@/redux/loanForm/types';

export const getActionTypeValue = (type: ELoanActionType) => {
  switch (type) {
    case ELoanActionType.BUY:
      return 'Buy a new home';
    case ELoanActionType.REFINANCE:
      return 'Refinance my home loan';
  }
};
