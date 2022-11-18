import { Form, Formik } from "formik";
import { useState } from "react";
import SignupInput from "../inputs/signupInput";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function SignupForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };
  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  // default year filled in
  const temp = new Date().getFullYear();
  // gets the values as the user populates the fields
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  // array of the last 108 years from the current year
  const years = Array.from(new Array(108), (val, index) => temp - index);
  // array of all the years
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  // array of the number of days depending on the month selected
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  // validations for length, required and type
  const SignupValidation = Yup.object({
    first_name: Yup.string()
      .required("Please enter your first name")
      .min(2, "First name must be 2 to 16 characters long")
      .max(16, "First name must be 2 to 16 characters long")
      .matches(/^[aA-zZ]+$/, "Please enter alphabets only"),
    last_name: Yup.string()
      .required("Please enter your last name")
      .min(2, "Last name must be 2 to 16 characters long")
      .max(16, "Last name must be 2 to 16 characters long")
      .matches(/^[aA-zZ]+$/, "Please enter only alphabets"),
    email: Yup.string()
      .required("Email required for each log in and password reset")
      .email("Please enter a valid email address"),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters long")
      .max(36, "Password can't be more than 36 characters long"),
  });
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  // populate database with user infos on signup
  const signupSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    // sign up popup
    <div className="blur">
      <div className="signup">
        <div className="signup_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>It'll only take a minute..</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={SignupValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan98 = new Date(1970 + 98, 0, 1);
            // checks if the user is between 14 to 98 years of age
            if (current_date - picked_date < atleast14) {
              setDateError(
                "Only individuals with age 14 years and above can create an account"
              );
            } else if (current_date - picked_date > noMoreThan98) {
              setDateError(
                "Only individuals under a certain age can create an account. Invaid birth year"
              );
            } else if (gender === "") {
              setDateError("");
              setGenderError("Please select a gender");
            } else {
              setDateError("");
              setGenderError("");
              signupSubmit();
            }
          }}
        >
          {/*input form*/}
          {(formik) => (
            <Form className="signup_form">
              <div className="signup_line">
                <SignupInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleSignupChange}
                />
                <SignupInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleSignupChange}
                />
              </div>
              <div className="signup_line">
                <SignupInput
                  type="text"
                  placeholder="Email address"
                  name="email"
                  onChange={handleSignupChange}
                />
              </div>
              <div className="signup_line">
                <SignupInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleSignupChange}
                />
              </div>
              {/*DOB drop-down*/}
              <div className="signup_col">
                <div className="signup_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleSignupChange={handleSignupChange}
                  dateError={dateError}
                />
              </div>
              {/* Gender select (radio buttons) */}
              <div className="signup_col">
                <div className="signup_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleSignupChange={handleSignupChange}
                  genderError={genderError}
                />
              </div>
              <div className="signup_info">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span>
              </div>
              <div className="signup_button">
                <button className="green_btn signup_popup">Sign Up</button>
              </div>
              {/* page loader */}
              <DotLoader color="#51ae84" loading={loading} size={30} />
              {error && <div className="error_msg">{error}</div>}
              {success && <div className="success_msg">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
