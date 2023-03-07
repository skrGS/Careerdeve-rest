const mongoose = require("mongoose")
const {transliteration, slugify} = require("transliteration")

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
        default: "no-photo.jpg"
    },
    author: {
        type: String,
        maxlength: [100, "Зохиогчийн нэрийн урт дээд тал нь 100 тэмдэгт байна"]
    },
    body: [{
        type: String,
       
    }],
    body1: [{
        type: String,
        
    }],
    body2: [{
        type: String,
       
    }],
    category: {
        type: String,
    },
    createUser: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    count: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {toJSON:{virtuals: true}, toObject:{virtuals: true}} 
)



module.exports = mongoose.model("Article", ArticleSchema)