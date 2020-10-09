import React, { useState } from "react";

export default function PostMedia({ postMedia, stretch }) {
  let mediaExtension = postMedia.slice(postMedia.lastIndexOf("."));
  let mediaType = "image";

  const [show, setVal] = useState(false);

  function handleClick() {
    setVal(!show);
  }

  if (
    [
      ".mp4",
      ".webm",
      ".mpg",
      ".mp2",
      ".mpeg",
      ".mpe",
      ".mpv",
      ".ogg",
      ".avi",
    ].includes(mediaExtension)
  ) {
    mediaType = "video";
  }

  return (
    <div style={stretch && { width: "60%" }}>
      {mediaType === "image" ? (
        <img
          onClick={handleClick}
          src={`http://${postMedia}`}
          height="250"
          width="400"
          alt=""
        />
      ) : (
        <video width="320" height="240" controls >
            <source src={`http://${postMedia}`}  type="video/mp4"/>
        </video>
      )}

      {show && (
        <div
          className="enlargeMedia"
          onClick={handleClick}
        >
           <img
          src={`http://${postMedia}`}
          alt="Enlarged post"
        /> 
        </div>
      )}
    </div>
  );
}
