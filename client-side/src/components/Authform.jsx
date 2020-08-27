import React from "react";

export default function Authform({ signup,buttonText,heading }) {
  return (
    <div>
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form>
            {/* onSubmit={this.handleSubmit} */}
              <h2>{heading}</h2>
              {/* {errors.message && (
                <div className="alert alert-danger">{errors.message}</div>
              )} */}
              <label htmlFor="email">Email Address:</label>
              <input
                className="form-control"
                id="email"
                name="email"
                // onChange={this.handleChange}
                // value={email}
                type="email"
              />

              <label htmlFor="password">Password:</label>
              <input
                className="form-control"
                id="password"
                name="password"
                // onChange={this.handleChange}
                type="password"
              />

              {signup && (
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    className="form-control"
                    id="username"
                    name="username"
                    // onChange={this.handleChange}
                    // value={username}
                    type="text"
                  />

                  <label htmlFor="image-url">Image URL:</label>
                  <input
                    className="form-control"
                    id="image-url"
                    name="profileImageUrl"
                    // value={profileImageUrl}
                    // onChange={this.handleChange}
                    type="text"
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
