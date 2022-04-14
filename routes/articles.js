const express = require("express")

const {protect, authorize} = require("../middleware/protect")

const {getArticles, getCategoryArticles, getArticle, createArticle, deleteArticle, updateArticle, uploadArticlePhoto} = require("../controller/articles")

const router = express.Router()

//"/api/v1/articles"

router.route("/").get(getArticles).post(protect, authorize("admin"), createArticle)

router.route("/:id").get(getArticle).delete(protect, authorize("admin", "operator"), deleteArticle).put(protect, authorize("admin", "operator"), updateArticle)

router.route("/:id/photo").put(uploadArticlePhoto)

module.exports = router