import { useRef, useState } from "react";
import useOnClickOutside from "../../helpers/clickOutside";
import { deletePost, savePost } from "../../functions/post";
import { saveAs } from "file-saver";

export default function PostMenu({
  postUserId,
  userId,
  imagesLength,
  setShowMenu,
  token,
  postId,
  checkSaved,
  setCheckSaved,
  images,
  postRef,
}) {
  // checks if the post belongs to the current user or not
  const [visitor, setvisitor] = useState(postUserId === userId ? false : true);
  const postMenuRef = useRef(null);
  // to close the post menu when clicked outside
  useOnClickOutside(postMenuRef, () => setShowMenu(false));
  // to add post to the user's saved posts
  const saveHandler = async () => {
    savePost(postId, token);
    if (checkSaved) {
      setCheckSaved(false);
    } else {
      setCheckSaved(true);
    }
  };
  // to download the images of a post
  const downloadHandler = async () => {
    images.map((img) => {
      saveAs(img.url, "image.jpg");
    });
  };
  // to delete a previous post
  const deleteHandler = async () => {
    const res = await deletePost(postId, token);
    if (res.status === "ok") {
      postRef.current.remove();
    }
  };
  return (
    <ul className="post_menu" ref={postMenuRef}>
      <div onClick={() => saveHandler()}>
        {/* if post is already saved, it displays the option to unsave the post */}
        {checkSaved ? (
          <li className="hover1">
            <i className="save_icon"></i>
            <div className="post_menu_title">
              <span>Unsave Post</span>
              <span className="post_menu_subtitle">
                Remove post from your saved items.
              </span>
            </div>
          </li>
        ) : (
          // else the user can choose to save it
          <li className="hover1">
            <i className="save_icon"></i>
            <div className="post_menu_title">
              <span>Save Post</span>
              <span className="post_menu_subtitle">
                Add post to your saved items.
              </span>
            </div>
          </li>
        )}
      </div>
      <div className="line"></div>
      {/* download option is displayed only if the post has any images */}
      {imagesLength && (
        <div onClick={() => downloadHandler()}>
          <li className="hover1">
            <i className="download_icon"></i>
            <div className="post_menu_title">
              <span>Download</span>
            </div>
          </li>
        </div>
      )}
      {/* the users can delete their own posts */}
      <div className="line"></div>
      {!visitor && (
        <div onClick={() => deleteHandler()}>
          <li className="hover1">
            <i className="trash_icon"></i>
            <div className="post_menu_title">
              <span>Delete Post</span>
              <span className="post_menu_subtitle">
                Remove this post permanently.
              </span>
            </div>
          </li>
        </div>
      )}
      {/* users can report other user's posts */}
      {visitor && (
        <li className="hover1">
          <a href="mailto:socialwelfare.seva@gmail.com">
            <img src="../../../icons/report.png" alt="" />
            <div className="post_menu_title">
              <span>Report post</span>
              <span className="post_menu_subtitle">
                Express Concern about this post.
              </span>
            </div>
          </a>
        </li>
      )}
    </ul>
  );
}
