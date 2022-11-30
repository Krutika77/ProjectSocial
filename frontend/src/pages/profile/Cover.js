import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import useClickOutside from "../../helpers/clickOutside";
import getCroppedImg from "../../helpers/getCroppedImg";
import { uploadImages } from "../../functions/uploadImages";
import { useSelector } from "react-redux";
import { updateCover } from "../../functions/user";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import OldCovers from "./OldCovers";

export default function Cover({ cover, visitor, photos }) {
  const [coverOptions, setCoverOptions] = useState(false);
  const [coverPicture, setCoverPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const coverOpRef = useRef(null);
  const inputRef = useRef(null);
  const coverPicRef = useRef(null);
  //hides the "add cover photo" options when clicked outside
  useClickOutside(coverOpRef, () => setCoverOptions(false));
  const [error, setError] = useState("");
  // allows user to upload images with only compatible type and size
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      setCoverOptions(false);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      setCoverOptions(false);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
    };
  };
  // to crop, zoom and adjust the cover picture before posting
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );
  const coverRef = useRef(null);
  const [width, setWidth] = useState();
  // width is according to screen width
  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
  }, [window.innerWidth]);
  // uploads and changes cover picture
  const updateCoverPicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);
      const updated_picture = await updateCover(res[0].url, user.token);
      // if the picture is uploaded, it creates a post for the same
      if (updated_picture === "ok") {
        const new_post = await createPost(
          "coverPicture",
          null,
          null,
          res,
          user.id,
          user.token
        );
        // changes the cover picture to the new one
        if (new_post === "ok") {
          setLoading(false);
          setCoverPicture("");
          coverPicRef.current.src = res[0].url;
        } else {
          setLoading(false);
          setError(new_post);
        }
      } else {
        setLoading(false);
        setError(updated_picture);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="profile_cover" ref={coverRef}>
      {/* cover picture preview before saving */}
      {coverPicture && (
        // save cchanges for cover picture - header
        <div className="save_cover">
          <div className="changes_bar_left">
            <i className="public_icon"></i>
            Your cover photo is public
          </div>
          <div className="changes_bar_right">
            <button className="green_btn" onClick={() => setCoverPicture("")}>
              Cancel
            </button>
            <button className="green_btn " onClick={() => updateCoverPicture()}>
              {loading ? <PulseLoader color="#fff" size={5} /> : "Save changes"}
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        hidden
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleImage}
      />
      {error && (
        <div className="post_error comment_error cover_error">
          <div className="post_err">{error}</div>
          <button className="green_btn" onClick={() => setError("")}>
            Try again
          </button>
        </div>
      )}
      {/* to crop and adjust the selected cover picture */}
      {coverPicture && (
        <div className="img_cropper">
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && !coverPicture && (
        <img src={cover} className="cover_picture" alt="" ref={coverPicRef} />
      )}
      {/* user can change cover picture for their own profile */}
      {!visitor && (
        <div className="cover_picture_update">
          <div
            className="update_cover_btn"
            onClick={() => setCoverOptions((prev) => !prev)}
          >
            <i className="camera_filled_icon"></i>
            New Cover Picture
          </div>
          {/* user can select from previously uploaded pictures or upload a new picture for cover*/}
          {coverOptions && (
            <div className="update_cover_options" ref={coverOpRef}>
              <div
                className="update_cover_option hover1"
                onClick={() => setShow(true)}
              >
                <i className="photo_icon"></i>
                Select Picture
              </div>
              <div
                className="update_cover_option hover1"
                onClick={() => inputRef.current.click()}
              >
                <i className="upload_icon"></i>
                Upload Picture
              </div>
            </div>
          )}
        </div>
      )}
      {/* displays old cover pictures */}
      {show && (
        <OldCovers
          photos={photos}
          setCoverPicture={setCoverPicture}
          setShow={setShow}
        />
      )}
    </div>
  );
}
