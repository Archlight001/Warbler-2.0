import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";

export default function Authform({
	signup,
	buttonText,
	heading,
	error,
	history,
	removeError,
	onAuth,
}) {
	let [loading, setLoading] = useState(false);
	const { register, handleSubmit, errors } = useForm();
	
	function onSubmit(data) {
		setLoading(true);
		const formData = new FormData(document.getElementById("form"));
		// formData.append("profile_pic",data.profile_pic[0]);
		// formData.append("username",data.username);
		const authType = signup ? "signup" : "signin";
		onAuth(authType, formData)
      .then(() => {
				setLoading(false)
        history.push("/");
      })
      .catch(() => {
				setLoading(false);
        return;
      });
	}

	//Remove any error message when component is re-rendered
	history.listen(() => {
		removeError();
	});

	let errorMessage = "";
	if (errors) {
		if (errors.username) errorMessage = errors.username.message;
		else if (errors.password) errorMessage = errors.password.message;
		else if (errors.email) errorMessage = errors.email.message;
		else if (errors.profile_pic) errorMessage = errors.profile_pic.message;
	}

	return (
		<div>
			{loading && (
				<div className="loader">
					<BounceLoader
						color="#36D7B7"
						loading={loading}
						size={80}
					/>
				</div>
			)}
			<div>
				<div className="row justify-content-md-center text-center">
					<div className="col-md-6">
						<form id="form" onSubmit={handleSubmit(onSubmit)}>
							<h2>{heading}</h2>
							{error.message && (
								<div className="alert alert-danger">{error.message}</div>
							)}

							{errorMessage !== "" && (
								<div className="alert alert-danger">{errorMessage}</div>
							)}

							<div>
								{signup && (
									<div>
										<label htmlFor="username">First Name:</label>
										<input
											className="form-control"
											id="firstName"
											name="firstName"
											ref={register({ required: "First Name is required" })}
											type="text"
										/>

										<label htmlFor="username">Last Name:</label>
										<input
											className="form-control"
											id="lastName"
											name="lastName"
											ref={register({ required: "Last Name is required" })}
											type="text"
										/>
									</div>
								)}

								<label htmlFor="email">Email Address:</label>
								<input
									className="form-control"
									id="email"
									name="email"
									ref={register({ required: "Email Address Required" })}
									type="email"
								/>

								{signup && (
									<div>
										<label htmlFor="username">Username:</label>
										<input
											className="form-control"
											id="username"
											name="username"
											ref={register({ required: "Username is required" })}
											type="text"
										/>

										<label htmlFor="image-url">Profile Image</label>
										<input
											className="form-control"
											id="image-url"
											name="profile_pic"
											ref={register({
												required: "Please select a profile image",
											})}
											type="file"
										/>
									</div>
								)}

								<label htmlFor="password">Password:</label>
								<input
									className="form-control"
									id="password"
									name="password"
									ref={register({
										required: "Password field is required",
										minLength: {
											value: 8,
											message: "Your password is too short",
										},
									})}
									type="password"
								/>
							</div>

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
