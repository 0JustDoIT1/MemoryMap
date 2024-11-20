export interface PinCode {
  lock: boolean;
  status: 'choose' | 'enter' | 'lock';
  time: number;
}
