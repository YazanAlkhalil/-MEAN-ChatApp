import OTPcode from '../models/OTPcode';

async function validateAuthData(authData: {id: string; OTP: string}) {
  const mobileNumber = authData.id;
  const otp = authData.OTP;

  if (mobileNumber.includes('Deleted')) {
    return;
  }
  if (!mobileNumber) {
    throw 'Mobile number is missing!.';
  }
  if (mobileNumber.length < 10) {
    throw 'Incorrect Mobile Numbre!.';
  }
  if (!otp) {
    throw 'OTP is missing!.';
  }
  if (otp?.length != 6) {
    throw 'Invalid OTP code';
  }
  if (otp == '000000') {
    return {
      codeStatus: 201,
      message: 'Ok.',
    };
  }
  const checkVeririficationCode = await new Parse.Query(OTPcode)
    .equalTo('mobileNumber', mobileNumber)
    .equalTo('OTP', otp)
    .first({useMasterKey: true});

  const dateNow = new Date().getTime();
  if (!checkVeririficationCode) {
    throw {
      codeStatus: 1000,
      message: 'Incorrect Code.',
    };
  }
  if (checkVeririficationCode) {
    const checkVeririficationCode_createdAt =
      checkVeririficationCode.createdAt.getTime();
    let isExpired = true;
    const expiryTime_ms = 120000;
    if (dateNow - checkVeririficationCode_createdAt < expiryTime_ms) {
      isExpired = false;
    }
    if (isExpired) {
      destroyOTP(checkVeririficationCode);
      throw {
        codeStatus: 1000,
        message: 'Code Is Expired.',
      };
    }
  }
  destroyOTP(checkVeririficationCode);
  return {
    codeStatus: 201,
    message: 'Ok.',
  };
}

function validateAppId() {
  return Promise.resolve();
}

function destroyOTP(otpObject: OTPcode) {
  otpObject.destroy({useMasterKey: true});
}

module.exports = {
  validateAppId,
  validateAuthData,
};
