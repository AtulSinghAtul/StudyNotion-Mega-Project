import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useSelector } from "react-redux";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const { loading } = useSelector((state) => state.auth);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Verify email</h1>
          <p>A verification code has been sent to you. Enter the code below</p>

          <form>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
