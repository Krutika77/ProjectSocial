import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const loginInfos = {
  email: "",
  password: "",
};

export default function LoginForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  // gets the email and password as the user populates the fields
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  // length, format and requirement validations using Yup
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // fetch user on Submit, populate cookies and navigate user to the home page
  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login_wrap">
      {/* left/top with the logo and text */}
      <div className="login_logo">
        <img className="social_svg" src="../../icons/social.svg" alt="" />
        <span>
          Social helps you share and evolve with the people in your life.
        </span>
      </div>
      <div className="login_form">
        {/* right/bottom of the page with the login form */}
        <div className="login_form_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="green_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          {/* forgot password helps reset the password if the email address is linked to an account */}
          <Link to="/reset" className="forgot_password">
            Forgot password?
          </Link>
          <DotLoader color="#51ae84" loading={loading} size={30} />

          {error && <div className="error_msg">{error}</div>}
          {/* create a new account/Sign up */}
          <div className="signup_splitter"></div>
          <button
            className="green_btn signup_popup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="extra">
          <b>Create a Page</b> for a non-profit, community or support group.
        </Link>
      </div>
    </div>
  );
}
