import LeftList from "./LeftList";
import "./style.css";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../../svg";
import { useState } from "react";
import OtherAccounts from "./OtherAccounts";

export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="home_left scrollbar">
      {/* link to user profile */}
      <Link to="/profile" className="home_left_list hover1">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user.last_name}
        </span>
      </Link>
      {/* link to the user's friend page */}
      <Link to="/friends" className="home_left_list hover1">
        <img src={`../../left/friends.png`} alt="" />
        <span>Find Friends</span>
      </Link>
      {/* mapping list from data/home via LeftList */}
      {left.slice(0, 6).map((link, i) => (
        <LeftList key={i} to={link.to} img={link.img} text={link.text} />
      ))}
      {!visible && (
        <div
          className="home_left_list hover1"
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>More</span>
        </div>
      )}
      {visible && (
        // toggle to show the last 3 items in the list
        <div className="home_left_hidden_list">
          {left.slice(6, left.length).map((link, i) => (
            <LeftList key={i} to={link.to} img={link.img} text={link.text} />
          ))}
          <div
            className="home_left_list hover1 "
            onClick={() => {
              setVisible(false);
            }}
          >
            <div className="small_circle rotate_icon">
              <ArrowDown1 />
            </div>
            <span>Less</span>
          </div>
        </div>
      )}
      {/* other social media accounts of the user */}
      <div className="splitter"></div>
      <div className="accounts">
        <div className="heading">Linked Accounts</div>
      </div>
      <div className="accounts_list">
        <OtherAccounts
          link="https://www.youtube.com/c/MohamedHaJJi1/featured"
          img="../../images/ytb.png"
          name="My Youtube channel"
        />

        <OtherAccounts
          link="https://www.instagram.com/med_hajji7/"
          img="../../images/insta.png"
          name="My Instagram "
        />
      </div>
      {/* copyright footer */}
      <div className="copyright">
        <Link to="/">Privacy </Link>
        <span>. </span>
        <Link to="/">Terms </Link>
        <span>. </span>
        <Link to="/">Advertising </Link>
        <span>. </span>
        <span>. </span>
        <Link to="/"></Link>Cookies <span>. </span>
        <Link to="/">More </Link>
        <span>. </span> <br />
        Social © 2022
      </div>
    </div>
  );
}
