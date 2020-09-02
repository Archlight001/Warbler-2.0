import React from "react";
import { connect } from "react-redux";
import { sendNewPost } from "../store/actions/posts";
import { useForm } from "react-hook-form";

function PostForm(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    props.sendNewPost(data.post);
    props.history.push("/");
  };

  const style ={float:"right"}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {props.errors.message || errors.message  && (
        <div className="alert alert-danger">{props.errors.message || errors.message.message}</div>
      )}

      <input
        type="text"
        className="form-control"
        name="post"
        id="post"
        ref={register({ required: "Please input a new Post" })}
      />
      <button type="submit" style={style} className="btn btn-success">
        Add my Post!
      </button>
    </form>
  );
}

function mapReduxStatetoProps(state) {
  return {
    errors: state.errors,
  };
}

export default connect(mapReduxStatetoProps, { sendNewPost })(PostForm);
