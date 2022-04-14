const Category = require('../models/Category')
const MyError = require("../utils/myError")
const asyncHandler = require("express-async-handler")
const paginate = require("../utils/paginate")

exports.getCategories = asyncHandler(async (req, res, next) => {
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 100;
const sort = req.query.sort;
const select = req.query.select;
["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);
// Pagination
const pagination = await paginate(page, limit, Category)
const categories = await Category.find(req.query, select).sort(sort).skip(pagination.start - 1).limit(limit)
res.status(200).json({ success: true, data: categories, pagination, })
    
})

exports.getCategory = asyncHandler( async (req, res, next) => {
    
const category = await Category.findById(req.params.id).populate('books')

if(!category) {
throw new MyError(req.params.id + " ID-тай категори байхгүй.", 400)
} 

// category.name += "-"
// category.save(function (err) {
// if (err) console.log("error: ", err)
// console.log("saved...")
// })
res.status(200).json({ success: true, data: category})
    
})

exports.createCategory = asyncHandler(async (req, res, next) => {

const category = await Category.create(req.body)

res.status(200).json({ success: true, data: category, })
    
    
})

exports.updateCategory = asyncHandler(async (req, res, next) => {
    
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        if(!category) {
        return res.status(400).json({ success: false, error: req.params.id + " ID-тай категори байхгүй.", })
        } 
        res.status(200).json({ success: true, data: category, })
        
    
})

exports.deleteCategory = asyncHandler(async (req, res, next) => {
        const category = await Category.findById(req.params.id)

        if(!category) {
        return res.status(400).json({ success: false, error: req.params.id + " ID-тай категори байхгүй.", })
        } 
        category.remove()
        res.status(200).json({ success: true, data: category, })
        
})