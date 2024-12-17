import { EFormStepType, ELoanActionType, ELoanPropertyType, EUserSituation, ILoanForm, ILoanFormState } from './types';
import { EFetchStatus } from '@/services/api';
import { formatDate } from '@/utils/formatDate';

export const formInitialState: ILoanForm = {
  id: undefined,
  formCompleted: false,

  actionType: ELoanActionType.BUY,

  country: 'ewrt',
  address: 'ewrtyu, ewr jk njninii',
  latitude: 34,
  longitude: 54,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
  zipCode: '22342',

  price: 0,
  downPaymentRate: 0,

  propertyType: ELoanPropertyType.SINGLE_FAMILY,

  duration: '10',
  rate: 0,
  giftFunds: 0,

  userSituation: EUserSituation.HOSPITALITIST,
  date: formatDate(new Date()),
};

export const initialState: ILoanFormState = {
  status: EFetchStatus.PENDING,
  error: null,
  loans: [],
  loanFormStep: 0,
  form: formInitialState,
};
