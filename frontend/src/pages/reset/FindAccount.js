import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import axios from "axios";

export default function FindAccount({
  email,
  setEmail,
  error,
  setError,
  setLoading,
  setUserInfos,
  setVisible,
}) {
  // checks weather a valid email is provided or not
  const emailValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid email address")
      .max(60, "Email address can't be more than 60 characters long"),
  });
  // looks through the database to check if an account is linked to the given email
  const handleAccountSearch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        { email }
      );
      setUserInfos(data);
      setVisible(1);
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="reset_password">
      <div className="reset_header">Find Your Account</div>
      <div className="reset_text">
        Please enter the email associated to your account.
      </div>
      {/* reset email for new search */}
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={emailValidation}
        onSubmit={() => {
          handleAccountSearch();
        }}
      >
        {(formik) => (
          <Form>
            {/* input email */}
            <LoginInput
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_buttons">
              {/* cancel takes user to the login page */}
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              {/* submit takes user to SendEmail page */}
              <button type="submit" className="green_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
