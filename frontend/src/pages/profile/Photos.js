import { useState } from "react";
import AllPhotos from "./allPhotos";

export default function Photos({ username, token, photos }) {
  const [allPhotosDisplay, setAllPhotosDisplay] = useState(false);
  return (
    // left card to see all pictures of the user the profile belongs to
    <div className="user_card">
      <div className="user_card_header">
        Photos
        <div className="card_link" onClick={() => setAllPhotosDisplay(true)}>
          See all photos
        </div>
        {allPhotosDisplay && (
          <AllPhotos
            username={username}
            token={token}
            photos={photos}
            setAllPhotosDisplay={setAllPhotosDisplay}
          />
        )}
      </div>
      {/* total number of photos that user has */}
      <div className="user_card_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 Photo"
          : `${photos.total_count} photos`}
      </div>
      {/* mapping pictures in a grid display */}
      <div className="user_card_grid">
        {photos.resources &&
          photos.resources.slice(0, 9).map((img) => (
            <div className="user_card_photo" key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}
