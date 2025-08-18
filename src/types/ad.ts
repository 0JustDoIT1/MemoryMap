import {AD_SHOW_CATEGORY} from 'src/constants/ad';

export type IAdShowCategory =
  (typeof AD_SHOW_CATEGORY)[keyof typeof AD_SHOW_CATEGORY];
