import React from "react";

export default function PostMedia({ postMedia,stretch }) {
  return (
    <div style={stretch && {width:"100%"}}>
      <img src={`http://${postMedia}`} height="250" width="400" alt="" />
    </div>
  );
}
