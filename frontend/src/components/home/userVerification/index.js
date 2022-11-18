import { useState } from "react";
import "./style.css";
import axios from "axios";
export default function UserVerification({ user }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Sends verification email to the user
  const sendVerificationLink = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="verify_user">
      <span>
        Your account is not verified. Please verify your account else it will
        deleted automatically after a month.
      </span>
      <a
        onClick={() => {
          sendVerificationLink();
        }}
      >
        click here to resend verification link.
      </a>
      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
}
