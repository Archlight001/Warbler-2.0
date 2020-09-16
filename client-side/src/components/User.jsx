import React,{useState} from "react";
import "../css/User.css";
import DefaultProfileImg from "../images/default-profile-image.jpg";

function User({displayName,username,profileImageUrl,isFollowing,followOperation,id}) {

  let [following,setFollowing] = useState(isFollowing);
  function handleFollow(id,username){
    let followStatus = following?"unfollow":"follow";
    followOperation(id,username,followStatus);
    setFollowing(!following);
  }
  return (
    <div className="main__userContainer">
      <div className="user__profile">
        <div className="img__div">
          <img src={`http://${profileImageUrl}` || DefaultProfileImg} alt={username}/>
        </div>
        <div className="otherInfo__div">
          <h4>{displayName}</h4>
          <p>@{username}</p>
        </div>
      </div>

      <div>
        <button onClick={handleFollow.bind(this,id,username)} className="btn btn-info">{following?"Following":"Follow"}</button>
      </div>
    </div>
  );
}

export default User;
