// services/articles.js
const Article = require("../articles/articles.schema");

exports.createArticle = async (articleData) => {
  // return await Article.create(articleData);
  const article = new Article(articleData);
return article.save();
};

exports.updateArticle = async (id, articleData) => {
  return await Article.findByIdAndUpdate(id, articleData, { new: true });
};

exports.deleteArticle = async (id) => {
  return await Article.findByIdAndDelete(id);
};
exports.getUserArticles = async(userId)=> {
  try {
    // Use populate to retrieve articles of the user, excluding password field
    const userArticles = await Article.find({ user: userId }).populate('user', '-password');
    return userArticles;
  } catch (error) {
    throw error;
  }
}