import { useMediaQuery } from "react-responsive";

export default function DateOfBirthSelect({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  handleSignupChange,
  dateError,
}) {
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

  return (
    <div
      className="signup_grid"
      style={{ marginBottom: `${dateError && !min1170 ? "90px" : "0"}` }}
    >
      {/* select birth date, month and year from drop-downs */}
      <select name="bDay" value={bDay} onChange={handleSignupChange}>
        {days.map((day, i) => (
          <option value={day} key={i}>
            {day}
          </option>
        ))}
      </select>
      <select name="bMonth" value={bMonth} onChange={handleSignupChange}>
        {months.map((month, i) => (
          <option value={month} key={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="bYear" value={bYear} onChange={handleSignupChange}>
        {years.map((year, i) => (
          <option value={year} key={i}>
            {year}
          </option>
        ))}
      </select>
      {/* if error occurs like user not old enough */}
      {dateError && (
        <div
          className={!min1170 ? "input_error" : "input_error large_input_err"}
        >
          <div className={!min1170 ? "error_bottom" : "error_left"}></div>
          {dateError}
        </div>
      )}
    </div>
  );
}
