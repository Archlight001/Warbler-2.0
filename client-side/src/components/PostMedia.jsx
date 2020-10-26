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
      ".mp4",
      ".webm",
      ".mpg",
      ".mp2",
      ".mpeg",
      ".mpe",
      ".mpv",
      ".ogg",
      ".avi",
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
          url={`http://${postMedia}`}
          width={window.screen.width < 600 ? "150px" : "320px"}
          height={window.screen.width<600?"100px":"140px"} 
          controls={true}
        />
        // <video width="320" height="240" controls >
        //     <source src={}  type="video/mp4"/>
        // </video>
      )}

      {show && (
        <div className="enlargeMedia" onClick={handleClick}>
          <img src={`data:${postMedia.contentType};base64,${postMedia.data}`} alt="Enlarged post" />
        </div>
      )}
    </div>
  );
}
