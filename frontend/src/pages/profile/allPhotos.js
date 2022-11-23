import { useRef } from "react";
import useOnCLickOutside from "../../helpers/clickOutside";
export default function AllPhotos({
  username,
  token,
  photos,
  setAllPicsVisible,
}) {
  const modal = useRef(null);
  useOnCLickOutside(modal, () => setAllPicsVisible(false));
  return (
    <div className="blur">
      <div className="post_box infos_box" ref={modal}>
        <div className="post_box_header">
          <div
            className="small_circle"
            onClick={() => setAllPicsVisible(false)}
          >
            <i className="exit_icon"></i>
          </div>
          <span>All Photos</span>
        </div>
        <div className="edit_details_wrap scrollbar">
          <div className="user_card_grid">
            {photos.resources &&
              photos.resources.slice(0, 9).map((img) => (
                <div className="all_photo_card" key={img.public_id}>
                  <img src={img.secure_url} alt="" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
