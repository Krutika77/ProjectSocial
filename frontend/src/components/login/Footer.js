import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="login_footer">
      <div className="login_footer_wrap">
        <Link to="/">English(UK)</Link>
        <Link to="/">Français(FR)</Link>
        <Link to="/">العربية</Link>
        <Link to="/">ⵜⴰⵎⴰⵣⵉⵖⵜ</Link>
        <Link to="/">Español (España)</Link>
        <Link to="/">italiano</Link>
        <Link to="/">Deutsch</Link>
        <Link to="/">Português (Brasil)</Link>
        <Link to="/">हिन्दी</Link>
        <Link to="/">中文(简体)</Link>
        <Link to="/">日本語</Link>
      </div>
      <div className="footer_splitter"></div>
      <div className="login_footer_wrap">
        <Link to="/">Sign Up</Link>
        <Link to="/">Log in</Link>
        <Link to="/">Watch</Link>
        <Link to="/">Social Pay</Link>
        <Link to="/">Fundraisers</Link>
        <Link to="/">Services</Link>
        <Link to="/">About</Link>
        <Link to="/">Create Page</Link>
        <Link to="/">Developers</Link>
        <Link to="/">Privacy</Link>
        <Link to="/">Cookies</Link>
        <Link to="/">Terms</Link>
        <Link to="/">Help</Link>
      </div>
      <div className="login_footer_wrap">
        <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
          Social 2022
        </Link>
      </div>
    </footer>
  );
}
