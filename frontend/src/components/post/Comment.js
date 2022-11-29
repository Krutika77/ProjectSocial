import Moment from "react-moment";

export default function Comment({ comment }) {
  return (
    <div className="comment">
      {/* picture of the user who made the comment */}
      <img src={comment.commentBy.picture} alt="" className="comment_by_img" />
      <div>
        <div className="individual_comment">
          <div>
            {/* name of the user who made the comment */}
            {comment.commentBy.first_name} {comment.commentBy.last_name}
          </div>
          {/* The comment text */}
          <div className="comment_text">{comment.comment}</div>
        </div>
        {/* the commented image if any */}
        {comment.image && (
          <img src={comment.image} alt="" className="comment_image" />
        )}

        <div className="comment_time">
          <span>
            {/*displays when the comment was made  */}
            <Moment fromNow interval={30}>
              {comment.commentAt}
            </Moment>
          </span>
        </div>
      </div>
    </div>
  );
}
