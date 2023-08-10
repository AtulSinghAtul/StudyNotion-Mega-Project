import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleOnSubmit(e) {
    e.preventdefault();
    const token = location.pathname().split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  }

  function handleOnChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="text-white">
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <h1>Choose new password</h1>
          <p>Almost done. Enter your new password and youre all set.</p>

          <form onSubmit={handleOnSubmit}>
            <label>
              <span>
                New password <sup>*</sup>
              </span>
              <input
                className="text-black"
                required
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleOnChange}
                placeholder="password"
              />

              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <AiFillEyeInvisible fontSize={24} />
                ) : (
                  <AiFillEye fontSize={24} />
                )}
              </span>
            </label>

            <label>
              <span>
                Confirm new password <sup>*</sup>
              </span>
              <input
                className="text-black"
                required
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="confirm password"
              />

              <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? (
                  <AiFillEyeInvisible fontSize={24} />
                ) : (
                  <AiFillEye fontSize={24} />
                )}
              </span>
            </label>

            <button type="submit">Reset Password</button>
          </form>

          <Link to="/login">
            <p>Back to login</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
