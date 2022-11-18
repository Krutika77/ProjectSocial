import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { useMediaQuery } from "react-responsive";
export default function EmojiBackgrounds({
  text,
  user,
  setText,
  input_type,
  background,
  setBackground,
}) {
  const [picker, setPicker] = useState(false);
  const [showBackgrounds, setshowBackgrounds] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
  const backgroundRef = useRef(null);
  // checks and adds emojis
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  // to add emojis in current cursor position
  const handleEmojis = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  // array of all the backgrounds provided to the user
  const backgrounds = [
    "../../../images/postbackgrounds/1.jpg",
    "../../../images/postbackgrounds/2.jpg",
    "../../../images/postbackgrounds/3.jpg",
    "../../../images/postbackgrounds/4.jpg",
    "../../../images/postbackgrounds/5.jpg",
    "../../../images/postbackgrounds/6.jpg",
    "../../../images/postbackgrounds/7.jpg",
    "../../../images/postbackgrounds/8.jpg",
    "../../../images/postbackgrounds/9.jpg",
  ];

  // adds the selected background to the text
  const backgroundHanlder = (i) => {
    backgroundRef.current.style.backgroundImage = `url(${backgrounds[i]})`;
    setBackground(backgrounds[i]);
    backgroundRef.current.classList.add("bgHandler");
  };

  // removes any previously selected background
  const removeBackground = (i) => {
    backgroundRef.current.style.backgroundImage = "";
    setBackground("");
    backgroundRef.current.classList.remove("bgHandler");
  };

  // media query for small screen to a scroll to the background options displayed
  const smallScreen = useMediaQuery({
    query: "(max-width:550px)",
  });

  return (
    // checks if the user wants to post images, text or text with a background image and renders accordingly
    <div className={input_type ? "img_input" : ""}>
      {/* If the user selets a background for the text, the text is aligned in the center else in the left */}
      <div className={!input_type ? "flex_center" : ""} ref={backgroundRef}>
        <textarea
          ref={textRef}
          maxLength="250"
          value={text}
          placeholder={`What's on your mind, ${user.first_name}`}
          className={`posts_input ${input_type ? "input_withimg" : ""} ${
            smallScreen && !background && "l0"
          }`}
          onChange={(e) => setText(e.target.value)}
          style={{
            paddingTop: `${
              background
                ? Math.abs(textRef.current.value.length * 0.1 - 32)
                : "0"
            }%`,
          }}
        ></textarea>
      </div>
      <div className={!input_type ? "post_wrap_emoji" : ""}>
        {picker && (
          <div
            className={`comment_emojis ${
              input_type ? "move_picker" : "move_r"
            }`}
          >
            <Picker onEmojiClick={handleEmojis} />
          </div>
        )}
        {/* if the user is not posting pictures, the colurful icon is a toggle that allows user to pick a background */}
        {!input_type && (
          <img
            src="../../../icons/colorful.png"
            alt=""
            onClick={() => {
              setshowBackgrounds((prev) => !prev);
            }}
          />
        )}
        {!input_type && showBackgrounds && (
          <div className="backgrounds">
            <div
              className="no_background"
              onClick={() => {
                removeBackground();
              }}
            ></div>
            {backgrounds.map((bg, i) => (
              <img
                src={bg}
                key={i}
                alt=""
                onClick={() => {
                  backgroundHanlder(i);
                }}
              />
            ))}
          </div>
        )}

        <i
          className={`emoji_icon_large ${input_type ? "move_l" : ""}`}
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
}
