// routes/articles.js
const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const articlesController = require("../articles/articles.controller")
router.post("/", auth, articlesController.createArticle);
router.put("/:id", auth, articlesController.updateArticle);
router.delete("/:id", auth, articlesController.deleteArticle);
module.exports = router;
