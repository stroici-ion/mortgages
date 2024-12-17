import { ELoanPropertyType } from '@/redux/loanForm/types';

export const getPropertyTypeValue = (type: ELoanPropertyType) => {
  switch (type) {
    case ELoanPropertyType.SINGLE_FAMILY:
      return 'Single family home';
    case ELoanPropertyType.TOWM_HOME:
      return 'Town Home';
    case ELoanPropertyType.CONDOMINIUM:
      return 'Condominium';
    case ELoanPropertyType.APARTAMENT:
      return 'Apartament';
    case ELoanPropertyType.OTHER_2_4:
      return 'Other 2-4 unit';
  }
};
