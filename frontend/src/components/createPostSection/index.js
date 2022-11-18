//The create-post section at the top of the home and profile page

//Importing GIF, Photo and Feeliengs icon from the svg folder
import { Feeling, LiveVideo, Photo } from "../../svg";
import "./style.css";

export default function CreatePostSection({ user, setVisible, profile }) {
  // setVisible sets the visibility of the create-post popup
  // profile is true when the user is in the profile page else false.
  return (
    <div className="create_post">
      <div className="create_post_header">
        {/* The header had the user's profile picture (if any else default), and a text area which opens the create-post popup when clicked on*/}
        <img src={user?.picture} alt="" />
        <div
          className="open_post hover2"
          onClick={() => {
            setVisible(true);
          }}
        >
          What's on your mind, {user?.first_name}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="create_post_body">
        <div
          className="create_post_icon hover1"
          onClick={() => {
            setVisible(true);
          }}
        >
          <LiveVideo color="#f3425f" />
          Gif
        </div>
        <div
          className="create_post_icon hover1"
          onClick={() => {
            setVisible(true);
          }}
        >
          <Photo color="#4bbf67" />
          Photos
        </div>
        {/* Displays the Ideas icon if in profile page else displays the Feelings icon */}
        {profile ? (
          <div
            className="create_post_icon hover1"
            onClick={() => {
              setVisible(true);
            }}
          >
            <i className="lifeEvent_icon"></i>
            Ideas
          </div>
        ) : (
          <div
            className="create_post_icon hover1"
            onClick={() => {
              setVisible(true);
            }}
          >
            <Feeling color="#f7b928" />
            Feelings
          </div>
        )}
      </div>
    </div>
  );
}
