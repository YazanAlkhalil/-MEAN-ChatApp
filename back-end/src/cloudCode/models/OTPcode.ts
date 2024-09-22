export default class OTPcode extends Parse.Object {
  constructor() {
    super('OTPcode');
  }

  get mobileNumber(): string {
    return super.get('mobileNumber');
  }
  set mobileNumber(value: string) {
    super.set('mobileNumber', value);
  }

  get OTP(): string {
    return super.get('OTP');
  }
  set OTP(value: string) {
    super.set('OTP', value);
  }
}

Parse.Object.registerSubclass('OTPcode', OTPcode);
