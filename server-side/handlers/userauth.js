const db = require("../models");
const jwt = require("jsonwebtoken");
const { imageFilter } = require("../helpers/image_validation");

exports.signin = async function (req, res, next) {
  try {
    let email = req.body.email;
    console.log(req.body);
    let user = await db.User.findOne({ email: email });
    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePasswords(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        { id, username, profileImageUrl },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password",
      });
    }
    console.log(user);
  } catch (error) {
    return next({ status: 400, message: "An error has occured, Please try again later" });
  }
};

exports.signup = async function (req, res, next) {
  const image = req.files.profile_pic;
  const imageFormat = image.mimetype;
  let checkImageFormat = imageFilter(req, imageFormat);
  let newImageName = `${req.body.username}${image.name.slice(
    image.name.lastIndexOf(".")
  )}`;
  let imageUrl = `${process.env.ROOT}/uploads/${newImageName}`;

  //check if file attached is an image
  if (!checkImageFormat.status) {
    return next({
      message: checkImageFormat.message,
    });
  }

  try {
    let newUser = {
      ...req.body,
      profileImageUrl: imageUrl,
    };

    //Create new User document
    let user = await db.User.create(newUser);

    //Move image to location
    image.mv(`${imageUrl}`, function (err) {
      if (err) {
        return next(err);
      } else {
        let { id, username, profileImageUrl } = user;
        let token = jwt.sign(
          {
            id,
            username,
            profileImageUrl,
          },
          process.env.SECRET_KEY
        );

        return res.status(200).json({
          id,
          username,
          profileImageUrl,
          token,
        });
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      error.message = "Sorry that username and/or email is taken";
    }

    return next({
      status: 400,
      message: error.message,
    });
  }
};
