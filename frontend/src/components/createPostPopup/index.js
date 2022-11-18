import { useRef, useState } from "react";
import "./style.css";
import EmojiBackgrounds from "./EmojiBackgrounds";
import AddPost from "./AddToPost";
import ImgPreview from "./ImgPreview";
import useClickOutside from "../../helpers/clickOutside";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import CreatePostError from "./CreatePostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";
export default function CreatePostPopup({
  user,
  setVisible,
  posts,
  dispatch,
  profile,
}) {
  const popup = useRef(null);
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  // to hide the popup when clicked outside the box
  useClickOutside(popup, () => {
    setVisible(false);
  });
  // populates the database when user creates and submits a post
  // once a post is created succfully, the post is displayed in the home and profile page with other posts
  const postSubmit = async () => {
    // if its a post with a background image and text
    if (background) {
      // a loader is displayed while the post is being created and saved in the database
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      // Once the backend operations are done, the loader is not displayed anymore
      setLoading(false);
      if (response.status === "ok") {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [response.data, ...posts],
        });
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
      // if its a post with images
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = `${user.username}/post_images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      const response = await uploadImages(formData, path, user.token);

      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      setLoading(false);
      if (res.status === "ok") {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [res.data, ...posts],
        });
        setText("");
        setImages("");
        setVisible(false);
      } else {
        setError(res);
      }
      // if its a post with just text
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response.status === "ok") {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [response.data, ...posts],
        });
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    } else {
      console.log("nothing");
    }
  };

  return (
    // Blurs the background and displays a create post popup
    <div className="blur">
      <div className="post_box" ref={popup}>
        {error && <CreatePostError error={error} setError={setError} />}
        <div className="post_box_header">
          {/* Exit create post */}
          <div
            className="small_circle"
            onClick={() => {
              setVisible(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        {/* Creater info */}
        <div className="creater_profile">
          <img src={user.picture} alt="" className="creater_profile_img" />
          <div className="create_column">
            <div className="creater_profile_name">
              {user.first_name} {user.last_name}
            </div>
            <div className="creater_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        {/* previews for different posts */}
        {!showPrev ? (
          <>
            <EmojiBackgrounds
              text={text}
              user={user}
              setText={setText}
              showPrev={showPrev}
              setBackground={setBackground}
              background={background}
            />
          </>
        ) : (
          <ImgPreview
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
          />
        )}
        <AddPost setShowPrev={setShowPrev} />
        {/* Submit */}
        <button
          className="submit_post_btn"
          onClick={() => {
            postSubmit();
          }}
          disabled={loading}
        >
          {/* loader */}
          {loading ? <PulseLoader color="#fff" size={5} /> : "Post"}
        </button>
      </div>
    </div>
  );
}
