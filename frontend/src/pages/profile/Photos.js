import { useState } from "react";
import AllPhotos from "./allPhotos";

export default function Photos({ username, token, photos }) {
  const [allPicsVisible, setAllPicsVisible] = useState(false);
  return (
    <div className="user_card">
      <div className="user_card_header">
        Photos
        <div
          className="profile_header_link"
          onClick={() => setAllPicsVisible(true)}
        >
          See all photos
        </div>
        {allPicsVisible && (
          <AllPhotos
            username={username}
            token={token}
            photos={photos}
            setAllPicsVisible={setAllPicsVisible}
          />
        )}
      </div>
      <div className="user_card_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 Photo"
          : `${photos.total_count} photos`}
      </div>
      <div className="user_card_grid">
        {photos.resources &&
          photos.resources.slice(0, 9).map((img) => (
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}
