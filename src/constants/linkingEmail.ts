export const LinkingEmail = (model: string, version: string, email: string) => {
  return `mailto: 0justdoit1@gmail.com?cc=&subject=[왔다감] 앱 사용 문의&body=------------------------------------------------------------------------\n\n* 유저 이메일 : ${email}\n* 기기 모델 : ${model}\n* 앱 버전 : v${version}\n\n------------------------------------------------------------------------\n\n`;
};
