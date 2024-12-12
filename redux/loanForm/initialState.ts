import { ELoanActionType, ELoanPropertyType, EUserSituation, ILoanForm, ILoanFormState } from './types';
import { EFetchStatus } from '@/services/api';
import { formatDate } from '@/utils/formatDate';

export const formInitialState: ILoanForm = {
  step: 0,
  actionType: ELoanActionType.BUY,

  location: {
    country: '',
    address: '',
    zipCode: '',
    latitude: 47.0105,
    longitude: 28.8638,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },

  price: 0,
  downPayment: 25,
  monthlyPayment: 0,
  reverseAmount: 7283,
  loanDuration: '10',
  rate: 0,
  giftFunds: 0,

  propertyType: ELoanPropertyType.SINGLE_FAMILY,
  userSituationType: EUserSituation.HOSPITALITIST,
  date: formatDate(new Date()),
};

export const initialState: ILoanFormState = {
  status: EFetchStatus.PENDING,
  error: null,
  loans: [],
  form: formInitialState,
};
