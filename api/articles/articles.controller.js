// controllers/articles.js
const articleService = require("../articles/articles.service");
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

exports.createArticle = async (req, res, next) => {
  // console.log(req.body);
  // console.log("user ID: ",req.user._id)
  try {
    if (req.user.role !== "admin") {
      throw "Only admins can create articles";
    }

    const article = await articleService.createArticle({
      ...req.body,
      user: req.user._id,
    });
   
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

exports.updateArticle = async (req, res, next) => {
  
  try {
    // if (req.user.role !== "admin") {
    //   throw "Only admins can update articles";
    // }
    const updatedArticle = await articleService.updateArticle(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw "Only admins can delete articles";
    }
    await articleService.deleteArticle(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
