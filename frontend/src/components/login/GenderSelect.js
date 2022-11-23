import { useMediaQuery } from "react-responsive";

export default function GenderSelect({ handleSignupChange, genderError }) {
  // media breakpoints
  const min539 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  const min850 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const min1170 = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  return (
    <div
      className="signup_grid"
      style={{ marginBottom: `${genderError && !min1170 ? "70px" : "0"}` }}
    >
      {/* select gender- male, female or non-binary */}
      <label htmlFor="male">
        Male
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={handleSignupChange}
        />
      </label>
      <label htmlFor="female">
        Female
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={handleSignupChange}
        />
      </label>
      <label htmlFor="nonbinary">
        Non-Binary
        <input
          type="radio"
          name="gender"
          id="nonbinary"
          value="nonbinary"
          onChange={handleSignupChange}
        />
      </label>
      {/* error for eg. none selected */}
      {genderError && (
        <div
          className={!min1170 ? "input_error" : "input_error large_input_err"}
        >
          <div className={!min1170 ? "error_bottom" : "error_left"}></div>
          {genderError}
        </div>
      )}
    </div>
  );
}
