import { EFetchStatus } from '@/services/api';

export interface ILoanFormState {
  loans: ILoan[];
  form: ILoanForm;
  status: EFetchStatus;
  loanFormStep: number;
  error: string | null;
}

export interface ILoan extends Omit<ILoanForm, 'latitudeDelta' | 'longitudeDelta'> {
  monthlyPayment: number;
  downPayment: number;
  reverseAmount: number;
  isDocumentReviewed: number;
  isPendingFinalApproval: number;
  isApproved: number;
}

export interface ILoanForm extends ILocation {
  id?: number;
  formCompleted: boolean;
  actionType: ELoanActionType;
  propertyType: ELoanPropertyType;
  price: number;
  downPaymentRate: number;
  userSituation: EUserSituation;
  duration: string;
  rate: number;
  date: string;
  giftFunds: number;
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

export interface ILoanFormParams {
  loan: Partial<ILoanForm>;
  formProgress: { activeStep: EFormStepType };
}

export enum ELoanActionType {
  BUY = 0,
  REFINANCE = 1,
}

export enum ELoanPropertyType {
  SINGLE_FAMILY = 0,
  TOWM_HOME = 1,
  CONDOMINIUM = 2,
  APARTAMENT = 3,
  OTHER_2_4 = 4,
}

export enum EUserSituation {
  HOSPITALITIST = 0,
  EXITING_RESIDENCY = 1,
  EXITING_FELLOESHIP = 2,
  SELF_EMPLOYED = 3,
}

export enum EFormStepType {
  action_type = 0,
  location = 1,
  property_type = 2,
  price = 3,
  user_situation = 4,
  targets = 5,
  date = 6,
  gift_funds = 7,
}

//Fetched Data
// export interface IFetchedLoanForm extends IFetchedCoordinates {
//   id?: number;
//   action_type: ELoanActionType;
//   property_type: ELoanPropertyType;
//   price: number;
//   down_payment_rate: number;
//   user_situation_type: EUserSituation;
//   loan_duration: string;
//   rate: number;
//   date: string;
//   gift_funds: number;
// }

// // id?: number;
// // actionType: ELoanActionType;
// // propertyType: ELoanPropertyType;
// // price: number;
// // downPaymentRate: number;
// // userSituationType: EUserSituation;
// // loanDuration: string;
// // rate: number;
// // date: string;
// // giftFunds: number;

// export interface IFetchedCoordinates {
//   latitude: number;
//   longitude: number;
//   latitude_delta: number;
//   longitude_delta: number;
// }

// export interface ILoan extends Omit<ILoanForm, 'latitudeDelta' | 'longitudeDelta'> {
//   monthlyPayment: number;
//   downPayment: number;
//   reverseAmount: number;
//   isDocumentReviewed: number;
//   isPendingFinalApproval: number;
//   isApproved: number;
// }
