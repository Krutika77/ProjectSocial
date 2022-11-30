import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header";
import { friendspage } from "../../functions/reducers";
import { getFriendsPageInfos } from "../../functions/user";
import Card from "./Card";
import "./style.css";

export default function Friends() {
  const { user } = useSelector((state) => ({ ...state }));
  const { type } = useParams();

  const [{ loading, error, data }, dispatch] = useReducer(friendspage, {
    loading: false,
    data: {},
    error: "",
  });
  // getting all the friends page data
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    dispatch({ type: "FRIENDS_REQUEST" });
    const data = await getFriendsPageInfos(user.token);
    if (data.status === "ok") {
      dispatch({ type: "FRIENDS_SUCCESS", payload: data.data });
    } else {
      dispatch({ type: "FRIENDS_ERROR", payload: data.data });
    }
  };

  return (
    <>
      <Header page="friends" />
      <div className="friend_page">
        {/* left menu */}
        <div className="friend_page_left">
          <div className="page_menu_headers">
            <h3>Friends</h3>
          </div>
          <div className="page_menu_wrap">
            <Link
              to="/friends"
              className={`menu_options hover3 ${
                type === undefined && "active_menu_option"
              }`}
            >
              <div className="small_circle">
                <i className="friends_home_icon "></i>
              </div>
              <span>Home</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to="/friends/requests"
              className={`menu_options hover3 ${
                type === "requests" && "active_menu_option"
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friend Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to="/friends/sent"
              className={`menu_options hover3 ${
                type === "sent" && "active_menu_option"
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Sent Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to="/friends/all"
              className={`menu_options hover3 ${
                type === "all" && "active_menu_option"
              }`}
            >
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>All Friends</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
          </div>
        </div>
        {/* friends card display on the right */}
        <div className="friends_display">
          {/* display all pending requests received*/}
          {(type === undefined || type === "requests") && (
            <div className="friends_display_wrap">
              <div className="page_menu_headers">
                <h3>Friend Requests</h3>
                {type === undefined && (
                  <Link to="/friends/requests" className="see_all hover3">
                    See all
                  </Link>
                )}
              </div>
              <div className="display_section_wrap">
                {data.requests &&
                  data.requests.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type="request"
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}
          {/* display all unanswered requests sent */}
          {(type === undefined || type === "sent") && (
            <div className="friends_display_wrap">
              <div className="page_menu_headers">
                <h3>Sent Requests</h3>
                {type === undefined && (
                  <Link to="/friends/sent" className="see_all hover3">
                    See all
                  </Link>
                )}
              </div>
              <div className="display_section_wrap">
                {data.sentRequests &&
                  data.sentRequests.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type="sent"
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}
          {/* displays all the present friends */}
          {(type === undefined || type === "all") && (
            <div className="friends_display_wrap">
              <div className="page_menu_headers">
                <h3>Friends</h3>
                {type === undefined && (
                  <Link to="/friends/all" className="see_all hover3">
                    See all
                  </Link>
                )}
              </div>
              <div className="display_section_wrap">
                {data.friends &&
                  data.friends.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type="friends"
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
