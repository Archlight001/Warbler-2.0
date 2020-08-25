const db = require("../models");
const jswebtoken = require("jsonwebtoken");

exports.signin = async function(req,res,next){

}

exports.signup = async function(req,res,next){
    return res.status(200).json(req.body);
}