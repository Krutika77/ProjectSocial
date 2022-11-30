import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
} from "../../functions/user";

export default function Card({ userr, type, getData }) {
  const { user } = useSelector((state) => ({ ...state }));
  // when user cancels a previously sent frient request
  const cancelRequestHandler = async (userId) => {
    const res = await cancelRequest(userId, user.token);
    if (res == "ok") {
      getData();
    }
  };
  // when a user accepts a friend request
  const confirmHandler = async (userId) => {
    const res = await acceptRequest(userId, user.token);
    if (res == "ok") {
      getData();
    }
  };
  // uhen a user deletes a friend request
  const deleteHandler = async (userId) => {
    const res = await deleteRequest(userId, user.token);
    if (res == "ok") {
      getData();
    }
  };

  return (
    <div className="friend_request_card">
      {/* card links to user profile */}
      <Link to={`/profile/${userr.username}`}>
        <img src={userr.picture} alt="" />
      </Link>
      <div className="friend_request_user">
        {userr.first_name} {userr.last_name}
      </div>
      {/* cancle option displayed if request is already sent but not accepted yet*/}
      {type === "sent" ? (
        <button
          className="green_btn"
          onClick={() => cancelRequestHandler(userr._id)}
        >
          Cancel Request
        </button>
      ) : type === "request" ? (
        // confirm request
        <>
          <button
            className="green_btn"
            onClick={() => confirmHandler(userr._id)}
          >
            Confirm
          </button>
          {/* delete request */}
          <button className="gray_btn" onClick={() => deleteHandler(userr._id)}>
            Delete
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
