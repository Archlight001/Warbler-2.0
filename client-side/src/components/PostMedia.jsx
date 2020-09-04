import React from "react";

export default function PostMedia({ postMedia, stretch }) {
  let mediaExtension = postMedia.slice(postMedia.lastIndexOf("."));
  let mediaType = "image";

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
    <div style={stretch && { width: "100%" }}>
      {mediaType === "image" ? (
        <img src={`http://${postMedia}`} height="250" width="400" alt="" />
      ) : (
        <video width="320" height="240" src={`http://${postMedia}`} controls />
      )}
    </div>
  );
}
