import React from "react";
import { connect } from "react-redux";
import { sendNewPost } from "../store/actions/posts";
import { useForm } from "react-hook-form";
import UserAside from "./UserAside";

function PostForm(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    let formData = new FormData(document.getElementById("postForm"));
    props.sendNewPost(formData);
    props.history.push("/");
  };

  const style = { float: "right" };

  return (
    <div className="general__container">
      {props.sidebar && (
        <div className="side__bar">
          <UserAside
            username={props.currentUser.user.username}
            profileImage={props.currentUser.user.profileImage}
            showSidebar={props.showSidebar}
          />
        </div>
      )}

      <form id="postForm" onSubmit={handleSubmit(onSubmit)}>
        {props.errors.message ||
          (errors.message && (
            <div className="alert alert-danger">
              {props.errors.message || errors.message.message}
            </div>
          ))}

        <textarea
          cols="30"
          rows="8"
          style={{ marginBottom: "2%" }}
          className="form-control"
          name="text"
          ref={register({ required: "Please input a new Post" })}
        />

        <input type="file" name="media" id="media" ref={register} multiple />
        <button type="submit" style={style} className="btn btn-success">
          Add my Post!
        </button>
        <p style={{ fontStyle: "italic", color: "red", fontSize: "small" }}>
          Minimum of 4 images or 1 video file per post
        </p>
      </form>
    </div>
  );
}

function mapReduxStatetoProps(state) {
  return {
    currentUser:state.currentUser,
    errors: state.errors,
  };
}

export default connect(mapReduxStatetoProps, { sendNewPost })(PostForm);
