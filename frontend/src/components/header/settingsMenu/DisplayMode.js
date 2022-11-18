export default function DisplayMode({ setVisible }) {
  return (
    <div className="menu_wrap">
      <div className="menu_wrap_header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        Display
      </div>
      <div className="settings_menu_item">
        <div className="small_circle" style={{ width: "50px" }}>
          <i className="dark_filled_icon"></i>
        </div>
        <div className="settings_menu_column">
          <span className="menu_span_title">Dark Mode</span>
          <span className="menu_span_text">
            Adjust the appearance of Social to light or dark mode.
          </span>
        </div>
      </div>
      {/* User can select to turn dark mode on or off via radio buttons */}
      <label htmlFor="darkOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="dark" id="darkOff" />
      </label>
      <label htmlFor="darkOn" className="hover1">
        <span>On</span>
        <input type="radio" name="dark" id="darkOn" />
      </label>
    </div>
  );
}
