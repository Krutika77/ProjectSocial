import "./style.css";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  Friends,
  FriendsActive,
  Home,
  HomeActive,
  Menu,
  Search,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchUsers from "./SearchUsers";
import { useRef, useState } from "react";
import InfoMenu from "./InfoMenu";
import useClickOutside from "../../helpers/clickOutside";
import SettingsMenu from "./settingsMenu";

export default function Header({ page, getAllPosts }) {
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#65676b";
  const [showSearchUser, setshowSearchUser] = useState(false);
  const [showInfoMenu, setshowInfoMenu] = useState(false);
  const [showSettingsMenu, setshowSettingsMenu] = useState(false);
  const infomenu = useRef(null);
  const settingsmenu = useRef(null);

  // to hide all open menus when clicked ouside the open field
  useClickOutside(infomenu, () => {
    setshowInfoMenu(false);
  });
  useClickOutside(settingsmenu, () => {
    setshowSettingsMenu(false);
  });

  return (
    <header>
      {/* left of the header has the search field */}
      <div className="header_left">
        <div
          className="search_user search"
          onClick={() => {
            setshowSearchUser(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Social"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchUser && (
        <SearchUsers
          color={color}
          setshowSearchUser={setshowSearchUser}
          token={user.token}
        />
      )}
      {/* middle of the header has the link to the home and friends page */}
      <div className="header_middle">
        {/* home */}
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
          onClick={() => getAllPosts()}
        >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        {/* friends */}
        <Link
          to="/friends"
          className={`middle_icon ${page === "friends" ? "active" : "hover1"}`}
        >
          {page === "friends" ? <FriendsActive /> : <Friends color={color} />}
        </Link>
      </div>
      {/* right of the header has the profile link of the active user, the info menu and the settings menu */}
      <div className="header_right">
        {/* link to profile page of the active user */}
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
        {/* Info menu */}
        <div
          className={`circle_icon hover1 ${showInfoMenu && "active_header"}`}
          ref={infomenu}
        >
          <div
            onClick={() => {
              setshowInfoMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <Menu />
            </div>
          </div>

          {showInfoMenu && <InfoMenu />}
        </div>
        {/* settings menu */}
        <div
          className={`circle_icon hover1 ${
            showSettingsMenu && "active_header"
          }`}
          ref={settingsmenu}
        >
          <div
            onClick={() => {
              setshowSettingsMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <ArrowDown />
            </div>
          </div>

          {showSettingsMenu && <SettingsMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
