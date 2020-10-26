const db = require("../models");
const jwt = require("jsonwebtoken");
const { imageFilter } = require("../helpers/media_validation");

exports.signin = async function (req, res, next) {
  try {
    let email = req.body.email;
    console.log(req.body);
    let user = await db.User.findOne({ email: email });
    let {
      id,
      username,
      profileImage,
    } = user;
    let isMatch = await user.comparePasswords(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        { id, username},
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImage,
        token,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password",
      });
    }
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

exports.signup = async function (req, res, next) {
  try {
    //let hostname = req.headers.host;
    const displayName = `${req.body.firstName} ${req.body.lastName}`;
    const image = req.files.profile_pic;
    let checkImageFormat = imageFilter(image.mimetype);
    // let newImageName = `${req.body.username}${image.name.slice(
    //   image.name.lastIndexOf(".")
    // )}`;
    // let imageUrl = `${hostname}/uploads/${newImageName}`;

    //check if file attached is an image
    if (!checkImageFormat.status) {
      return next({
        message: checkImageFormat.message,
      });
    }

    let newUser = {
      ...req.body,
      displayName: displayName,
      description: `Hi I'm ${displayName}`,
      profileImage: [{data:image.data,contentType:image.mimetype}],
    };

    //Create new User document
    let user = await db.User.create(newUser);
    //Move image to location
    // image.mv(`${process.env.ROOT}/public/uploads/${newImageName}`, function (
    //   err
    // ) {
    //   if (err) {
    //     return next(err);
    //   } else {
    //     let {
    //       id,
    //       username,
    //       profileImageUrl,
    //     } = user;
    //     let token = jwt.sign(
    //       {
    //         id,
    //         username,
    //         profileImageUrl,
    //       },
    //       process.env.SECRET_KEY
    //     );

    //     return res.status(200).json({
    //       id,
    //       username,
    //       profileImageUrl,
    //       token,
    //     });
    //   }
    // });

    let {
      id,
      username,
      profileImage,
    } = user;
    let token = jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET_KEY
    );

    return res.status(200).json({
      id,
      username,
      profileImage,
      token,
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
