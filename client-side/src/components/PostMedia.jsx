import React, { useState } from "react";
import ReactPlayer from "react-player";

export default function PostMedia({ postMedia, stretch }) {
  //let mediaExtension = postMedia.slice(postMedia.lastIndexOf("."));
  let mediaType = "image";

  const [show, setVal] = useState(false);

  function handleClick() {
    setVal(!show);
  }

  if (
    [
      "video/mp4",
      "video/webm",
      "video/mpg",
      "video/mp2",
      "video/mpeg",
      "video/mpe",
      "video/mpv",
      "video/ogg",
      "video/avi",
    ].includes(postMedia.contentType)
  ) {
    mediaType = "video";
  }

  return (
    <div style={stretch && { width: "60%" }}>
      {mediaType === "image" ? (
        <img
          onClick={handleClick}
          src={`data:${postMedia.contentType};base64,${postMedia.data}`}
          height="250"
          width="400"
          alt=""
        />
      ) : (
        <ReactPlayer
          url={`data:${postMedia.contentType};base64,${postMedia.data}`}
          width={window.screen.width < 600 ? "150px" : "320px"}
          height={window.screen.width<600?"100px":"140px"}
          controls={true}
        />
        // <video width="320" height="240" controls>
        //   <source
        //     src={mediaURL}
        //     type="video/mp4"
        //   />
        // </video>
      )}

      {show && (
        <div className="enlargeMedia" onClick={handleClick}>
          <img
            src={`data:${postMedia.contentType};base64,${postMedia.data}`}
            alt="Enlarged post"
          />
        </div>
      )}
    </div>
  );
}
