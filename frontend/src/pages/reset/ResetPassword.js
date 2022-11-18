import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import axios from "axios";

export default function ResetPassword({
  password,
  setPassword,
  conf_password,
  setConf_password,
  error,
  setLoading,
  userInfos,
  loading,
  setError,
}) {
  const navigate = useNavigate();
  // validates the length of the new password
  const passwordValidation = Yup.object({
    password: Yup.string()
      .required(
        "Enter at least 6 characters (can be a combination of numbers,letters and punctuation marks)"
      )
      .min(6, "Password must be atleast 6 characters long")
      .max(26, "Password can not be more than 26 characters long"),
    // checks weather both the passwords (password and confirm password) matches
    conf_password: Yup.string()
      .required("Confirm/retype password.")
      .oneOf([Yup.ref("password")], "Both the passwords must match."),
  });
  const { email } = userInfos;
  // changes the password associated to the given email and navigates to the home page
  const resetPassword = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
        email,
        password,
      });
      setError("");
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_password" style={{ height: "310px" }}>
      <div className="reset_header">Change Password</div>
      <div className="reset_text">Pick a strong password</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          conf_password,
        }}
        validationSchema={passwordValidation}
        onSubmit={() => {
          resetPassword();
        }}
      >
        {(formik) => (
          <Form>
            {/* enter password */}
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
            />
            {/* confirm password */}
            <LoginInput
              type="password"
              name="conf_password"
              onChange={(e) => setConf_password(e.target.value)}
              placeholder="Confirm new password"
              bottom
            />
            {error && <div className="error_msg">{error}</div>}
            <div className="reset_buttons">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
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
