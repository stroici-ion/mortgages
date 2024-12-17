import axios, { AxiosError, AxiosResponse } from 'axios';

import { EFormStepType, ILoan, ILoanForm, ILoanFormParams } from '@/redux/loanForm/types';
import normalizeServerData from '@/utils/normalizeServerData';
import { formatDate } from '@/utils/formatDate';
import { getLoanParams } from '@/utils/getLoanParams';

export interface IFetchError {
  message: string;
}

export enum EFetchStatus {
  FULLFILLED = 'fulfilled',
  PENDING = 'pending',
  ERROR = 'error',
}

class Api {
  private client;

  constructor(baseURL: string = 'http://192.168.100.145:3000/api/v1') {
    this.client = axios.create({
      baseURL,
      timeout: 5000,
    });
  }

  async submitLoanForm(params: ILoanFormParams, id?: number): Promise<ILoanForm> {
    try {
      const response: AxiosResponse = id
        ? await this.client.put(`/loans/${id}`, getLoanParams(params))
        : await this.client.post('/loans', getLoanParams(params));

      const camelCase = normalizeServerData(response.data);

      const responseData: Partial<ILoanForm> = {
        id: camelCase.id,
        price: camelCase.price > 0 ? camelCase.price : 0,
        rate: camelCase.rate || 0,
        formCompleted: camelCase.formCompleted,
        downPaymentRate: camelCase.downPaymentRate || 0,
        duration: camelCase.duration || 10,
        actionType: camelCase.actionType || 0,
        giftFunds: camelCase.giftFunds || 0,
        propertyType: camelCase.propertyType || 0,
        userSituation: camelCase.userSituation || 0,
        date: camelCase.date || formatDate(new Date()),
        country: camelCase.country || '',
        address: camelCase.address || '',
        latitude: camelCase.latitude || 47.0105,
        longitude: camelCase.longitude || 28.8638,
        zipCode: camelCase.zipCode || '',
      };

      return responseData as ILoanForm;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        //@ts-ignore
        throw new Error(axiosError.response?.data?.message || 'Unknown error occurred');
      } else {
        console.error('Error submitting loan form:', error);
        throw new Error('Error submitting loan form');
      }
    }
  }

  async getLoan(id: number): Promise<ILoan> {
    try {
      const response: AxiosResponse = await this.client.get(`/loans/${id}`);
      const data = normalizeServerData(response.data) as ILoan;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        //@ts-ignore
        throw new Error(axiosError.response?.data?.message || 'Unknown error occurred');
      } else {
        throw new Error('Error fetching loan');
      }
    }
  }

  async getLoans(): Promise<{ loans: ILoan[]; incompletedLoanForm?: ILoanForm & { activeStep: string } }> {
    try {
      const response: AxiosResponse = await this.client.get('/loans');
      const data = normalizeServerData(response.data) as {
        loans: ILoan[];
        incompletedLoanForm?: ILoanForm & { activeStep: string };
      };
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        //@ts-ignore
        throw new Error(axiosError.response?.data?.message || 'Unknown error occurred');
      } else {
        throw new Error('Error fetching loans');
      }
    }
  }
}

export default Api;
