import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreatePostSection from "../../components/createPostSection";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import UserVerification from "../../components/home/userVerification";
import Post from "../../components/post";
import "./style.css";

export default function Home({ setVisible, posts, loading, getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state }));
  const midRef = useRef(null);
  const [height, setHeight] = useState();

  // set the page lenght as per the feed
  useEffect(() => {
    setHeight(midRef.current.clientHeight);
  }, [loading, height]);

  return (
    <div className="home_page" style={{ height: `${height + 150}px` }}>
      {/* home page display with all its components */}
      <Header page="home" getAllPosts={getAllPosts} />
      <LeftHome user={user} />
      <div className="home_middle" ref={midRef}>
        {user.verified === false && <UserVerification user={user} />}
        {/* create post only visible to logged in users */}
        <CreatePostSection user={user} setVisible={setVisible} />
        {/* map posts to user's feed */}
        <div className="feed">
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
}
