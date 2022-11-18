import { useRef } from "react";
import EmojiBackgrounds from "./EmojiBackgrounds";

export default function Imgpreview({
  text,
  user,
  setText,
  images,
  setImages,
  setShowPrev,
  setError,
}) {
  const ipimgRef = useRef(null);
  // reads the selected input images and stores them in the images array if type and size is compatible
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"
      ) {
        setError(
          `${img.name} format is unsupported ! only Jpeg, Png, Webp, Gif are allowed.`
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is too large max 5mb allowed.`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (readerEvent) => {
          setImages((images) => [...images, readerEvent.target.result]);
        };
      }
    });
  };
  return (
    <div className="overflow scrollbar">
      <EmojiBackgrounds text={text} user={user} setText={setText} input_type />
      <div className="addimgs_wrap">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          hidden
          ref={ipimgRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <div className="addimgs_inside p0">
            <div className="preview_add">
              <button
                className="hover1"
                onClick={() => {
                  ipimgRef.current.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                Add Photos/GIFs
              </button>
            </div>
            <div
              className="small_white_circle"
              onClick={() => {
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            {/* preview displayed based on the number of images selected */}
            <div
              className={
                images.length === 1
                  ? "preview_1"
                  : images.length === 2
                  ? "preview_2"
                  : images.length === 3
                  ? "preview_3"
                  : images.length === 4
                  ? "preview_4 "
                  : images.length === 5
                  ? "preview_5"
                  : images.length % 2 === 0
                  ? "preview_6"
                  : "preview_6 singular_grid"
              }
            >
              {/* maps images to preview */}
              {images.map((img, i) => (
                <img src={img} key={i} alt="" />
              ))}
            </div>
          </div>
        ) : (
          <div className="addimgs_inside">
            <div
              className="small_white_circle"
              onClick={() => {
                setShowPrev(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_column"
              onClick={() => {
                ipimgRef.current.click();
              }}
            >
              <div className="add_small_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos/Gif</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
