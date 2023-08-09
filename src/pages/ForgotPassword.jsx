import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);

  return (
    <div>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <h1>{!emailSent ? "Reset your password" : "Check email"}</h1>
          <p>
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to
${email}`}
          </p>

          <form>
            {!emailSent && (
              <label>
                <p>
                  Email Address <sup>*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type Your Email"
                />
              </label>
            )}

            <button>{!emailSent ? "Reset Password" : "Resend Email"}</button>
          </form>

          <Link to="/login">
            <p>Back to login</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
