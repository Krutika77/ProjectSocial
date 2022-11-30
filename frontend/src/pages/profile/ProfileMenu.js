import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import AllPhotos from "./allPhotos";
import useOnCLickOutside from "../../helpers/clickOutside";

export default function ProfileMenu({ username, token, photos }) {
  const [allPhotosDisplay, setAllPhotosDisplay] = useState(false);
  const popupRef = useRef(null);
  // closes all pictures display popup when clicked outside
  useOnCLickOutside(popupRef, () => setAllPhotosDisplay(false));
  return (
    <div className="profile_page_menu">
      <div className="profile_menu">
        {/* takes user to the home page */}
        <Link to="/" className="profile_menu_option menu_option_active">
          Posts
        </Link>
        {/* takes user to their own friends page */}
        <Link to="/friends" className="profile_menu_option hover1">
          Friends
        </Link>
        {/* displays all picture of that user */}
        <div
          className="hover1 profile_menu_option"
          onClick={() => setAllPhotosDisplay(true)}
        >
          Photos
          {allPhotosDisplay && (
            <AllPhotos
              username={username}
              token={token}
              photos={photos}
              setAllPhotosDisplay={setAllPhotosDisplay}
            />
          )}
        </div>
      </div>
    </div>
  );
}
