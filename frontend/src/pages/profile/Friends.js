import { Link } from "react-router-dom";
export default function Friends({ friends }) {
  return (
    <div className="user_card">
      <div className="user_card_header">
        Friends
        <Link to="/friends" className="profile_header_link">
          See all friends
        </Link>
      </div>
      {friends && (
        <div className="user_card_count">
          {friends.length === 0
            ? ""
            : friends.length === 1
            ? "1 Friend"
            : `${friends.length} Friends`}
        </div>
      )}
      <div className="user_card_grid">
        {friends &&
          friends.slice(0, 9).map((friend, i) => (
            <Link
              to={`/profile/${friend.username}`}
              className="profile_photo_card"
              key={i}
            >
              <img src={friend.picture} alt="" />
              <span>
                {friend.first_name} {friend.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
