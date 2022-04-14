const Article = require("../models/Article")
const path = require("path")
const MyError = require("../utils/myError")
const asyncHandler = require("express-async-handler")
const Category = require("../models/Category")
const paginate = require("../utils/paginate")
const User = require("../models/User")

// api/v1/articles
exports.getArticles = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort;
    const select = req.query.select;

    ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el])

    const pagination = await paginate (page, limit, Article);

    const articles = await Article.find(req.query, select).sort(sort).skip(pagination.start - 1).limit(limit)

    res.status(200).json({
        success: true,
        count: articles.length,
        data: articles,
        pagination,
    })
})

exports.getUserArticles = asyncHandler(async (req, res, next ) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort;
    const select = req.query.select;
    ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el])

    const pagination = await paginate(page, limit, Article);

    req.query.createUser = req.userId;

    const articles = await Article.find(req.query, select).populate({
        path: "category",
        select: "name averagePrice",
    }).sort(sort).skip(pagination.start - 1).limit(limit)

    res.status(200).json({
        success: true,
        count: articles.length,
        data: articles,
        pagination,
    })
})

// api/v1/categories/:catId/articles
exports.getCategoryArticles = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort;
    const select = req.query.select;

    ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el])

    const pagination = await paginate (page, limit, Article);
    const articles = await Article.find ({ ...req.query, category: req.params.categoryId}, select).sort(sort).skip(pagination.start-1).limit(limit)

    res.status(200).json({
        success: true,
        count: articles.length,
        data: articles,
        pagination,
    })
})

exports.getArticle = asyncHandler(async (req, res, next) => {

        const article = await Article.findById(req.params.id).populate({path: "createUser", select: "firstName profile"})

            
    if(!article) {
        throw new MyError(req.params.id + ' ID-тэй ном байхгүй байна.', 404)
    }
    article.count += 1
    article.save()
    

    res.status(200).json({
        success: true,
        data: article,
    })
})

exports.createArticle = asyncHandler(async(req, res, next) => {


    req.body.createUser = req.userId
    const article = await Article.create(req.body)

    res.status(200).json({
        success: true,
        data: article,
    })
}) 

exports.deleteArticle = asyncHandler(async(req, res, next) => {
    const article = await Article.findById(req.params.id)

    if (!article) {
        throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404)
    }
    
    if(article.createUser.toString() !== req.userId && req.userRole !== "admin") {
        throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах хэрэгтэй", 403)
    }

    const user = await User.findById(req.userId)

    article.remove()

    res.status(200).json({
        success: true,
        data: article,
    })
})

exports.updateArticle = asyncHandler(async (req, res, next) => {

    const article = await Article.findById(req.params.id)

    if (!article) {
        throw new MyError(req.params.id + " ID-тэй ном байхгүй", 400)
    }

    if(article.createUser.toString() !== req.userId && req.userRole !== "admin") {
        throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах хэрэгтэй", 403)
    }

    req.body.updateUser = req.userId

    for(let attr in req.body) {
        article[attr] = req.body[attr]
    }

    article.save()


    res.status(200).json({
        success: true,
        data: article,
    })
})

// PUT: api/v1/articles/:id/photo
exports.uploadArticlePhoto = asyncHandler(async (req, res, next) => {
    const article = await Article.findById(req.params.id)

    if (!article) {
        throw new MyError(req.params.id + " ID-тэй ном байхгүй", 400)
    }

    const file = req.files.file

    // image upload
    if(!file.mimetype.startsWith('image')) {
        throw new MyError("Зураг оруул", 400)
    }

    if(file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
        throw new MyError("Зурагны хэмжээ хэтэрсэн байна", 400)
    }

    file.name = `photo_${req.params.id}${path.parse(file.name).ext}`

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, err => {
        if(err) {
            throw new MyError("Файлыг хуулах явцад алдаа гарлаа" + err.message, 400)
        }

        article.image = file.name
        article.save()

        res.status(200).json({
            success: true,
            data: file.name,
        })
    })
})