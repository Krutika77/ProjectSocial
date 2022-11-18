import { Link } from "react-router-dom";

export default function SettingsPrivacy({ setVisible }) {
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
        Settings & privacy
      </div>
      {/* Settings option links back to the user profile page */}
      <Link to="/profile">
        <div className="settings_menu_options hover3">
          <div className="small_circle">
            <i className="settings_filled_icon"></i>
          </div>
          <span>Settings</span>
        </div>
      </Link>
      {/* privacy shortcut takes the user to the password reset page*/}
      <Link to="/reset">
        <div className="settings_menu_options hover3">
          <div className="small_circle">
            <i className="privacy_shortcuts_icon"></i>
          </div>
          <span>Privacy Shortcut</span>
        </div>
      </Link>
    </div>
  );
}
