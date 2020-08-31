import React from "react";
import { connect } from "react-redux";
import { postNewMessage } from "../store/actions/messages";
import { useForm } from "react-hook-form";

function MessageForm(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    props.postNewMessage(data.message);
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
        name="message"
        id="message"
        ref={register({ required: "Please input a new Message" })}
      />
      <button type="submit" style={style} className="btn btn-success">
        Add my message!
      </button>
    </form>
  );
}

function mapReduxStatetoProps(state) {
  return {
    errors: state.errors,
  };
}

export default connect(mapReduxStatetoProps, { postNewMessage })(MessageForm);
