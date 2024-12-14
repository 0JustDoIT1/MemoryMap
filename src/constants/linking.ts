import {appName} from './app';

export const LinkingEmail = (model: string, version: string) => {
  return `mailto: 0justdoit1@gmail.com?cc=&subject=[${appName}] 앱 사용 문의&body=------------------------------------------------------------------------\n\n* 기기 모델 : ${model}\n* 앱 버전 : v${version}\n\n------------------------------------------------------------------------\n\n`;
};

export const TermListUrl =
  'https://sites.google.com/view/app-memorymap-terms-list/%ED%99%88';
export const TermPrivacyUrl =
  'https://sites.google.com/view/app-memorymap-privacy-policy/%ED%99%88';
export const TermServiceUrl =
  'https://sites.google.com/view/app-memorymap-terms-of-service/%ED%99%88';
