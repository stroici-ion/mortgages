import { ILoanForm } from '@/redux/loanForm/types';
import convertToSnakeCase from './convertToSnakeCase';

export const getLoanParams = (loanForm: any) => convertToSnakeCase(loanForm);
