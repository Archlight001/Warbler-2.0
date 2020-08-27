import React, { useState } from "react";

export default function Authform({
  signup,
  buttonText,
  heading,
  errors,
  history,
  removeError,
  onAuth
}) {
  const [state, setState] = useState({
    email: "",
    username: "",
    password: ""
  });

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(e.target);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const authType = signup ? "signup" : "signin";
    onAuth(authType, state)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        return;
      });
  }

  //Remove any error message when component is re-rendered
  history.listen(()=>{
    removeError();
  })

  const { email, username, password } = state;
  return (
    <div>
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} >
              <h2>{heading}</h2>
              {errors.message && (
                <div className="alert alert-danger">{errors.message}</div>
              )}
              <label htmlFor="email">Email Address:</label>
              <input
                className="form-control"
                id="email"
                name="email"
                onChange={handleChange}
                value={email}
                type="email"
              />

              <label htmlFor="password">Password:</label>
              <input
                className="form-control"
                id="password"
                name="password"
                onChange={handleChange}
                type="password"
              />

              {signup && (
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={username}
                    type="text"
                  />

                  {/* <label htmlFor="image-url">Profile Image</label>
                  <input
                    className="form-control"
                    id="image-url"
                    name="profile_pic"
                    onChange={handleChange}
                    type="file"
                  /> */}
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
