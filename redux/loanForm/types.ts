import { EFetchStatus } from '@/services/api';

export interface ILoanFormState {
  loans: ILoanForm[];
  form: ILoanForm;
  status: EFetchStatus;
  error: string | null;
}

export interface ILoanForm {
  step: number;

  price: number;
  downPayment: number;
  monthlyPayment: number;
  reverseAmount: number;
  loanDuration: string;
  rate: number;
  giftFunds: number;

  actionType: ELoanActionType;
  propertyType: ELoanPropertyType;
  userSituationType: EUserSituation;
  date: string;

  location: ILocation;
}

export interface ILocation extends IAddress, ICoordinates {
  zipCode: string;
}

export interface IAddress {
  country: string;
  address: string;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export enum ELoanActionType {
  BUY = 'buy',
  REFINANCE = 'refinance',
}

export enum ELoanPropertyType {
  SINGLE_FAMILY = 'Single family home',
  TOWM_HOME = 'Tow Home',
  CONDOMINIUM = 'Condomiunium',
  APARTAMENT = 'Apartament',
  OTHER_2_4 = 'Other 2-4 unit',
}

export enum EUserSituation {
  HOSPITALITIST = 'Practicing Hospitalist',
  EXITING_RESIDENCY = 'Exiting Residency',
  EXITING_FELLOESHIP = 'Exiting Fellowship',
  SELF_EMPLOYED = 'Self-employed Clinician',
}

//Fetched Data
export interface IFetchedLoanForm {
  step: number;

  price: number;
  down_payment: number;
  monthly_payment: number;
  reverse_amount: number;
  loan_duration: string;
  rate: number;
  gift_funds: number;

  action_type: ELoanActionType;
  property_type: ELoanPropertyType;
  user_situation_type: EUserSituation;
  date: string;

  location: IFetchedCoordinates;
}

export interface IFetchedCoordinates {
  latitude: number;
  longitude: number;
  latitude_delta: number;
  longitude_delta: number;
}
