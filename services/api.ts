import { ILoanForm } from '@/redux/loanForm/types';
import normalizeServerData from '@/utils/normalizeServerData';

export interface IFetchError {
  message: string;
}

export enum EFetchStatus {
  FULLFILLED = 'fulfilled',
  PENDING = 'pending',
  ERROR = 'error',
}

class FakeApiInstance {
  async post(url: string, data: ILoanForm): Promise<any> {
    console.log(`POST request to ${url} with data:`, data);

    if (url === '/submitLoanForm') {
      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      const shouldThrowError = Math.random() < 0.03;

      if (shouldThrowError) {
        await delay(1000);
        throw {
          response: {
            status: 400,
            data: {
              message: 'Invalid loan data',
            },
          },
        };
      } else {
        await delay(300);
        return {
          status: 200,
          data,
        };
      }
    }

    return {
      status: 200,
      data,
    };
  }
}

class Api {
  private client: FakeApiInstance;

  constructor(baseURL: string) {
    this.client = new FakeApiInstance();
  }

  async submitLoanForm(formData: ILoanForm): Promise<ILoanForm> {
    try {
      const response = await this.client.post('/submitLoanForm', formData);
      return normalizeServerData(response.data) as ILoanForm;
    } catch (error) {
      console.error('Error submitting loan form:', error);
      throw error;
    }
  }
}

export default Api;
