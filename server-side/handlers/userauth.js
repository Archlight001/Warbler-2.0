const db = require("../models");
const jwt = require("jsonwebtoken");
const { imageFilter } = require("../helpers/image_validation");

exports.signin = async function (req, res, next) {};

exports.signup = async function (req, res, next) {
  const image = req.files.profile_pic;
  const imageFormat = image.mimetype;
  let checkImageFormat = imageFilter(req, imageFormat);

  //check if file attached is an image
  if (!checkImageFormat.status) {
    return next({
      message: checkImageFormat.message,
    });
  }

  try {
    let newImageName = `${req.body.username}${image.name.slice(
      image.name.lastIndexOf(".")
    )}`;

    let imageUrl = `${process.env.ROOT}/uploads/${newImageName}`;

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
