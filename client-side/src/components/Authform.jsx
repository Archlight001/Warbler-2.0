import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Authform({
  signup,
  buttonText,
  heading,
  errors,
  history,
  removeError,
  onAuth,
}) {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    const formData = new FormData(document.getElementById("form"));
    // formData.append("profile_pic",data.profile_pic[0]);
    // formData.append("username",data.username);
    const authType = signup ? "signup" : "signin";
    onAuth(authType, formData)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        return;
      });
  }

  //Remove any error message when component is re-rendered
  history.listen(() => {
    removeError();
  });

  return (
    <div>
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
              <h2>{heading}</h2>
              {errors.message && (
                <div className="alert alert-danger">{errors.message}</div>
              )}
              <label htmlFor="email">Email Address:</label>
              <input
                className="form-control"
                id="email"
                name="email"
                ref={register}
                type="email"
              />

              <label htmlFor="password">Password:</label>
              <input
                className="form-control"
                id="password"
                name="password"
                ref={register}
                type="password"
              />

              {signup && (
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    className="form-control"
                    id="username"
                    name="username"
                    ref={register}
                    type="text"
                  />

                  <label htmlFor="image-url">Profile Image</label>
                  <input
                    className="form-control"
                    id="image-url"
                    name="profile_pic"
                    ref={register}
                    type="file"
                  />
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
