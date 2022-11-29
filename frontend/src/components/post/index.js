import { Link } from "react-router-dom";
import "./style.css";
import Moment from "react-moment";
import { Dots, Public } from "../../svg";
import ReactsPopup from "./ReactsPopup";
import { useEffect, useRef, useState } from "react";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
import { getReacts, reactPost } from "../../functions/post";
import Comment from "./Comment";

export default function Post({ post, user, profile }) {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(1);
  const [checkSaved, setCheckSaved] = useState();
  const [comments, setComments] = useState([]);
  // to get and update a post every time a user reacts or comments
  useEffect(() => {
    getPostReacts();
  }, [post]);
  useEffect(() => {
    setComments(post?.comments);
  }, [post]);
  // gets all the reacts on the post with the count and kind of reaction
  const getPostReacts = async () => {
    const res = await getReacts(post._id, user.token);
    setReacts(res.reacts);
    setCheck(res.check);
    setTotal(res.total);
    setCheckSaved(res.checkSaved);
  };
  // handling new reaction made by the user
  const reactHandler = async (type) => {
    reactPost(post._id, type, user.token);
    if (check == type) {
      setCheck();
      let index = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(type);
      let index = reacts.findIndex((x) => x.react == type);
      let index1 = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
      }
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
      }
    }
  };
  // show three comments at a time
  const showMore = () => {
    setCount((prev) => prev + 3);
  };
  const postRef = useRef(null);

  return (
    <div
      className="post"
      style={{ width: `${profile && "100%"}` }}
      ref={postRef}
    >
      {/* post card header links to user's profile */}
      <div className="post_header">
        <Link
          to={`/profile/${post.user.username}`}
          className="post_header_left"
        >
          <img src={post.user.picture} alt="" />
          <div className="post_header_column">
            <div className="post_user">
              {post.user.first_name} {post.user.last_name}
              <div className="updated_profile_picture">
                {/* if post is a profile picture update */}
                {post.type == "profilePicture" &&
                  `updated ${
                    post.user.gender === "male"
                      ? "his"
                      : post.user.gender === "female"
                      ? "her"
                      : "their"
                  } profile picture`}
                {/* if post is for an updated cover picture */}
                {post.type == "coverPicture" &&
                  `updated ${
                    post.user.gender === "male"
                      ? "his"
                      : post.user.gender === "female"
                      ? "her"
                      : "their"
                  } cover picture`}
              </div>
            </div>
            <div className="post_date">
              {/* displays how old is the post */}
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              . <Public color="#828387" />
            </div>
          </div>
        </Link>
        {/* post menu to save, download, report or delete post*/}
        <div
          className="post_header_right hover1"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Dots color="#828387" />
        </div>
      </div>
      {/* if it a post with a background img and text */}
      {post.background ? (
        <div
          className="post_background"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="post_background_text">{post.text}</div>
        </div>
      ) : // if the post has just text
      post.type === null ? (
        <>
          <div className="post_text">{post.text}</div>
          {/* post with images */}
          {post.images && post.images.length && (
            // grid display for images in a single post
            <div
              className={
                post.images.length === 1
                  ? "img_grid_1"
                  : post.images.length === 2
                  ? "img_grid_2"
                  : post.images.length === 3
                  ? "img_grid_3"
                  : post.images.length === 4
                  ? "img_grid_4"
                  : post.images.length >= 5 && "img_grid_5"
              }
            >
              {post.images.slice(0, 5).map((image, i) => (
                <img src={image.url} key={i} alt="" className={`img-${i}`} />
              ))}
              {post.images.length > 5 && (
                <div className="multiple_imgs_shadow">
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : // if the post is a new profile picture
      post.type === "profilePicture" ? (
        <div className="profile_pic_post">
          <div className="updated_background">
            <img src={post.user.cover} alt="" />
          </div>
          <img src={post.images[0].url} alt="" className="updated_image" />
        </div>
      ) : (
        // if the post is an updated cover picture
        <div className="post_cover">
          <img src={post.images[0].url} alt="" />
        </div>
      )}
      {/* reacts received are displayed */}
      <div className="post_hits">
        <div className="reacts_count">
          <div className="reacts_icons">
            {reacts &&
              reacts
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .slice(0, 3)
                .map(
                  (react, i) =>
                    react.count > 0 && (
                      <img
                        src={`../../../reacts/${react.react}.svg`}
                        alt=""
                        key={i}
                      />
                    )
                )}
          </div>
          <div className="total_reacts">{total > 0 && total}</div>
        </div>
        {/* displays the number of comments made on a post */}
        <div className="post_hits_right">
          <div className="comments_count">{comments.length} comments</div>
        </div>
      </div>
      {/* react popup for hitting a new reaction on a post */}
      <div className="post_reacts">
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
        />
        <div
          className="post_react hover1"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => reactHandler(check ? check : "like")}
        >
          {/* check the reaction hit by the user and display accordingly */}
          {check ? (
            <img
              src={`../../../reacts/${check}.svg`}
              alt=""
              className="small_react"
              style={{ width: "18px" }}
            />
          ) : (
            <i className="like_icon"></i>
          )}
          <span
            style={{
              color: `
          
          ${
            check === "like"
              ? "#51ae84"
              : check === "love"
              ? "#f63459"
              : check === "haha"
              ? "#f7b125"
              : check === "sad"
              ? "#f7b125"
              : check === "wow"
              ? "#f7b125"
              : check === "angry"
              ? "#e4605a"
              : ""
          }
          `,
            }}
          >
            {check ? check : "Like"}
          </span>
        </div>
        {/* display previous comments newest first */}
        <div className="post_react hover1">
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
      </div>
      <div className="comments">
        <div className="comments_display"></div>
        <CreateComment
          user={user}
          postId={post._id}
          setComments={setComments}
          setCount={setCount}
        />
        {comments &&
          comments
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(0, count)
            .map((comment, i) => <Comment comment={comment} key={i} />)}
        {count < comments.length && (
          <div className="view_more_comments" onClick={() => showMore()}>
            View more comments
          </div>
        )}
      </div>
      {showMenu && (
        <PostMenu
          userId={user.id}
          postUserId={post.user._id}
          imagesLength={post?.images?.length}
          setShowMenu={setShowMenu}
          postId={post._id}
          token={user.token}
          checkSaved={checkSaved}
          setCheckSaved={setCheckSaved}
          images={post.images}
          postRef={postRef}
        />
      )}
    </div>
  );
}
