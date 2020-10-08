import React, { useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import PostMedia from "./PostMedia";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import "../css/PostItem.css";

export default function PostItem({
  id,
  postId,
  date,
  profileImageUrl,
  text,
  postMedia,
  currentUsername,
  username,
  removePost,
  isCorrectUser,
  noOfLikes,
  noOfReposts,
  isLiked,
  isReposted,
  like__unlikePosts,
  repost__op,
  repostedByList,
  repostList,
  likeList,
}) {
  let repostedBy = "";
  if (repostedByList[0].length !== 0) {
    let isPostReposted = repostedByList?.find(
      (value) => value[0].id === postId
    );
    if (isPostReposted !== undefined) {
      repostedBy = isPostReposted[0].repostedBy;
    }
  }

  let media = [];
  if (postMedia.length === 1) {
    media = <PostMedia key={1} postMedia={postMedia[0]} stretch />;
  } else {
    media = postMedia.map((value, index) => {
      return <PostMedia key={index} postMedia={value} />;
    });
  }

  let [likedStat, setLike] = useState(isLiked === undefined ? false : true);
  let [repostStat, setRepost] = useState(
    isReposted === undefined ? false : true
  );

  let iconStyle = { color: "rgb(201, 16, 176)" };

  function handleLike() {
    like__unlikePosts(
      postId,
      currentUsername,
      id,
      likedStat ? "unlike" : "like"
    );
    setLike(!likedStat);
  }

  function handleRepost() {
    repost__op(
      postId,
      currentUsername,
      id,
      repostStat ? "remove__poster" : "repost"
    );
    setRepost(!repostStat);
  }
  return (
    <div>
      <li className="list-group-item">
        <img
          src={`http://${profileImageUrl}` || DefaultProfileImg}
          alt={username}
          height="100"
          width="100"
          className="timeline-image"
        />
        <div className="message__area">
          <div className="message__area__title">
            <div>
              <Link
                to={{
                  pathname: `/profile/${username}`,
                  state: { userId: id },
                }}
              >
                @{username} &nbsp;
              </Link>
              <span className="text-muted">
                <Moment className="text-muted" format="Do MM YYYY">
                  {date}
                </Moment>
              </span>
            </div>
            {repostedBy !== "" && (
              <div>
                <span>Reposted by: {repostedBy} </span>
              </div>
            )}
          </div>

          <p>{text}</p>

          {postMedia.length !== 0 && <div className="mediaDiv">{media}</div>}

          <div className="message__area__operations">
            <div className="message__area__icons">
              <div
                style={likedStat ? iconStyle : { color: "rgb(29, 135, 196)" }}
                className="message__area__icon"
              >
                <FavoriteIcon onClick={handleLike} />
                <Link
                  style={likedStat ? iconStyle : { color: "rgb(29, 135, 196)" }}
                  to={{
                    pathname: `/post/${postId}/likes`,
                    state: { list: likeList, ops: "likes" },
                  }}
                >
                  <span>{noOfLikes}</span>
                </Link>
              </div>

              <div
                style={repostStat ? iconStyle : { color: "rgb(29, 135, 196)" }}
                className="message__area__icon"
              >
                <RotateRightIcon onClick={handleRepost} />
                <Link
                  style={
                    repostStat ? iconStyle : { color: "rgb(29, 135, 196)" }
                  }
                  to={{
                    pathname: `/post/${postId}/reposts`,
                    state: { list: repostList, ops: "reposts" },
                  }}
                >
                  <span>{noOfReposts}</span>
                </Link>
              </div>
            </div>

            {isCorrectUser && (
              <a className="btn btn-danger" onClick={removePost}>
                Delete
              </a>
            )}
          </div>
        </div>
      </li>
    </div>
  );
}
