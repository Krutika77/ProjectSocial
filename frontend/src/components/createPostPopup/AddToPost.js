import { Photo } from "../../svg";

//Add photos/gifs to a post
export default function AddToPost({ setShowPrev }) {
  return (
    <div
      // when user selects add Photo/Gif
      className="addtopost"
      onClick={() => {
        setShowPrev(true);
      }}
    >
      <div className="post_header_right hover1">
        <Photo color="#45bd62" />
      </div>
      <div className="addto_text">Add Photos/Gif</div>
    </div>
  );
}
