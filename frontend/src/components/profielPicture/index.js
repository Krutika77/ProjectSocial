import { useRef, useState } from "react";
import "./style.css";
import UpdateProfilePicture from "./UpdateProfilePicture";
import { useSelector } from "react-redux";

export default function ProfilePicture({ username, setShow, pRef, photos }) {
  const popup = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  const refInput = useRef(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  // checks if the selected image is of the supported format and style
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  return (
    // update profile picture popup
    <div className="blur">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      <div className="post_box picture_box" ref={popup}>
        <div className="post_box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className="update_profile_picture">
          {/* user can upload a new picture */}
          <div className="upload_picture_button">
            <button
              className="light_green_btn"
              onClick={() => refInput.current.click()}
            >
              <i className="plus_icon filter_green"></i>
              Upload photo
            </button>
          </div>
        </div>
        {error && (
          <div className="post_error comment_error">
            <div className="post_err">{error}</div>
            <button className="green_btn" onClick={() => setError("")}>
              Try again
            </button>
          </div>
        )}
        {/* or user can choose from picture they uploaded previously */}
        <div className="previous_pictures_wrap scrollbar">
          <h4>your profile pictures</h4>
          <div className="previous_pictures">
            {photos
              .filter(
                (img) => img.folder === `${user.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
          <h4>other pictures</h4>
          <div className="previous_pictures">
            {photos
              .filter(
                (img) => img.folder !== `${user.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
        </div>
      </div>
      {image && (
        <UpdateProfilePicture
          setImage={setImage}
          image={image}
          setShow={setShow}
          setError={setError}
          pRef={pRef}
        />
      )}
    </div>
  );
}
