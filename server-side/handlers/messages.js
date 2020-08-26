const db = require("../models");

exports.createMessage = async function (req, res, next) {
  try {
    let message = db.Message.create({
      text: req.body.text,
      user: req.params.id,
    });
    let foundUser
  } catch (error) {
    return next(error);
  }
};

exports.getMessage = async function (req, res, next) {};

exports.deleteMessage = async function (req, res, next) {};
