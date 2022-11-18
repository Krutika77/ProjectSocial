import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import axios from "axios";

export default function VerificationCode({
  code,
  setCode,
  error,
  loading,
  setLoading,
  setVisible,
  setError,
  userInfos,
}) {
  // validate the code length and required
  const codeValidation = Yup.object({
    code: Yup.string()
      .required("Verification code is required")
      .min("5", "Verification code must be 5 characters long")
      .max("5", "Verification code must be 5 characters long"),
  });

  const { email } = userInfos;
  // verifies if the code matches the one sent to the user via email
  const codeVerification = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
        { email, code }
      );
      setVisible(3);
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="reset_password">
      <div className="reset_header">Code verification</div>
      <div className="reset_text">Please enter code sent to your email.</div>
      <Formik
        enableReinitialize
        initialValues={{
          code,
        }}
        validationSchema={codeValidation}
        onSubmit={() => {
          codeVerification();
        }}
      >
        {(formik) => (
          <Form>
            {/* code input field */}
            <LoginInput
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_buttons">
              {/* takes user back to the login page */}
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              {/* takes user to the reset password page */}
              <button type="submit" className="green_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
