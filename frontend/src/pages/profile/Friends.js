import { Link } from "react-router-dom";

export default function Friends({ friends }) {
  return (
    <div className="user_card">
      <div className="user_card_header">
        {/* links to the friends page of the active user */}
        Friends
        <Link to="/friends" className="card_link">
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
      {/* maps 9 friends card in a 3*3 grid in the profile page card */}
      <div className="user_card_grid">
        {friends &&
          friends.slice(0, 9).map((friend, i) => (
            <Link
              to={`/profile/${friend.username}`}
              className="user_card_photo"
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
