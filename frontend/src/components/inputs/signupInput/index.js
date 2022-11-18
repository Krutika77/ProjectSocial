import "./style.css";
import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

export default function SignupInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  // screen breakpoints
  const min539 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  const min850 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const min1170 = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  const case1 = min1170 && field.name === "first_name";
  const case2 = min1170 && field.name === "last_name";

  return (
    <div className="login_input signup_input">
      {/*error msg is displayed if field was selected but not filled */}
      <input
        className={meta.touched && meta.error ? "error_field_outline" : ""}
        style={{
          width: `${
            min539 &&
            (field.name === "first_name" || field.name === "last_name")
              ? "100%"
              : min539 && (field.name === "email" || field.name === "password")
              ? "370px"
              : "300px"
          }`,
        }}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div
          className={
            min1170 ? "input_error fullscreen_input_error" : "input_error"
          }
          style={{
            transform: "translateY(2px)",
            left: `${case1 ? "-107%" : case2 ? "107%" : ""}`,
          }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                min1170 && field.name !== "last_name"
                  ? "error_left"
                  : min1170 && field.name === "last_name"
                  ? "error_right"
                  : !min1170 && "error_bottom"
              }
            ></div>
          )}
        </div>
      )}

      {meta.touched && meta.error && <i className="error_icon"></i>}
    </div>
  );
}
