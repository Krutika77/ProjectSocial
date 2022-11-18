import React from "react";

export default function CreatePostError({ error, setError }) {
  return (
    // to display any error while creating a post like file size too large or file type not compatible
    <div className="createPostError">
      <div className="createPostError_err">{error}</div>
      <button
        className="green_btn"
        onClick={() => {
          setError("");
        }}
      >
        Try again
      </button>
    </div>
  );
}
