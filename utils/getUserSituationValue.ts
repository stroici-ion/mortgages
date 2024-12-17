import { EUserSituation } from '@/redux/loanForm/types';

export const getUserSituationValue = (type: EUserSituation) => {
  switch (type) {
    case EUserSituation.HOSPITALITIST:
      return {
        title: 'Practicing Hospitalist',
        subtitle: 'Practicing hospitalist with W2 paystubs',
      };
    case EUserSituation.EXITING_RESIDENCY:
      return {
        title: 'Exiting Residency',
        subtitle: '',
      };
    case EUserSituation.EXITING_FELLOESHIP:
      return {
        title: 'Exiting Fellowship',
        subtitle: '',
      };
    case EUserSituation.SELF_EMPLOYED:
      return {
        title: 'Self-employed Clinician',
        subtitle: '',
      };
  }
};
