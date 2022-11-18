import axios from "axios";
import { Link } from "react-router-dom";

export default function SendEmail({
  userInfos,
  email,
  error,
  setError,
  setVisible,
  setUserInfos,
  loading,
  setLoading,
}) {
  // to send and email to the user with the 5 digit verification code
  const sendEmail = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
        { email }
      );
      setError("");
      setVisible(2);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_password reset_height">
      <div className="reset_header">Reset Your Password</div>
      <div className="form_grid">
        <div className="form_left">
          <div className="reset_text">
            Receive the password reset code via email?
          </div>
          {/* confirmin email */}
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="column_label">
              <span>{userInfos.email}</span>
            </div>
          </label>
        </div>
        {/* profile picture from the account associated and email */}
        <div className="form_right">
          <img src={userInfos.picture} alt="" />
          <span>{userInfos.email}</span>
          <span>Social user</span>
        </div>
      </div>
      {error && (
        <div className="error_msg" style={{ padding: "10px" }}>
          {error}
        </div>
      )}
      <div className="reset_buttons">
        {/* takes user back to the login page */}
        <Link to="/login" className="gray_btn">
          Not You ?
        </Link>
        {/* send email and goes to code verification  */}
        <button
          onClick={() => {
            sendEmail();
          }}
          className="green_btn"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
