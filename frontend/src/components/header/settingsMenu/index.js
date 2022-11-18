import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DisplayMode from "./DisplayMode";
import Support from "./Support";
import SettingsPrivacy from "./SettingsPrivacy";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export default function SettingsMenu({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(0);
  // cookies that have required user info to stay logged in and do activities like create post, send friend request, etc.
  // cookies are reset to an empty string when a user clicks on logout
  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  return (
    <div className="settings_menu">
      {visible === 0 && (
        <div>
          {/* link to profile page */}
          <Link to="/profile" className="settings_menu_header hover3">
            <img src={user?.picture} alt="" />
            <div className="settings_menu_column">
              <span>
                {user?.first_name} {user?.last_name}
              </span>
              <span>See your profile</span>
            </div>
          </Link>
          <div className="settings_menu_splitter"></div>
          {/* Feedback */}
          <div>
            <a href="mailto:socialwelfare.seva@gmail.com">
              <div className="settings_menu_item hover3">
                <div className="small_circle">
                  <i className="report_filled_icon"></i>
                </div>
                <div className="settings_menu_column">
                  <div className="menu_span_title">Give feedback</div>
                  <div className="menu_span_text">Help us improve Social</div>
                </div>
              </div>
            </a>
          </div>
          <div className="settings_menu_splitter"></div>
          {/* settings and privacy (to reset password)*/}
          <div
            className="settings_menu_options hover3"
            onClick={() => {
              setVisible(1);
            }}
          >
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Settings & privacy</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          {/* help & support (for help, feedback or reporting a post)*/}
          <div
            className="settings_menu_options hover3"
            onClick={() => {
              setVisible(2);
            }}
          >
            <div className="small_circle">
              <i className="help_filled_icon"></i>
            </div>
            <span>Help & support</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          {/* display (for dark and light mode) */}
          <div
            className="settings_menu_options hover3"
            onClick={() => {
              setVisible(3);
            }}
          >
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Display</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          {/* logout */}
          <div
            className="settings_menu_options hover3"
            onClick={() => {
              logout();
            }}
          >
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>Logout</span>
          </div>
        </div>
      )}
      {visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
      {visible === 2 && <Support setVisible={setVisible} />}
      {visible === 3 && <DisplayMode setVisible={setVisible} />}
    </div>
  );
}
