const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");

const OdkoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [250, " нэрний урт дээд тал нь 250 тэмдэгт байх ёстой."],
    },
    name1: {
      type: String,
      trim: true,
      maxlength: [250, " нэрний урт дээд тал нь 250 тэмдэгт байх ёстой."],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    count: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      trim: true,
      maxlength: [5000, " нэрний урт дээд тал нь 20 тэмдэгт байх ёстой."],
    },
    p9Odko: {
      type: String,
      default: "no-photo",
    },
    p9OdkoTitle: {
      type: String,
    },
    p38Work: {
      type: String,
    },
    p38Name: {
      type: String,
    },
    p38BigTitle: {
      type: String,
    },
    p38Title: {
      type: String,
    },
    p38Text: {
      type: String,
    },
    p38Text1: {
      type: String,
    },
    p39Title: {
      type: String,
    },
    p39Text: {
      type: String,
    },
    p39Title1: {
      type: String,
    },
    p39Text1: {
      type: String,
    },
    p9Od1: {
      type: String,
      default: "no-photo",
    },
    p9Od1Text: {
      type: String,
    },
    p40Title: {
      type: String,
    },
    p40Text: {
      type: String,
    },
    p40Text1: {
      type: String,
    },
    p40Title1: {
      type: String,
    },
    p40Text2: {
      type: String,
    },
    p40Title2: {
      type: String,
    },
    p40Text3: {
      type: String,
    },
    p9Od2: {
      type: String,
      default: "no-photo",
    },
    p9Od2Text: {
      type: String,
    },
    p40Title3: {
      type: String,
    },
    p40Text4: {
      type: String,
    },
    p40Text5: {
      type: String,
    },
    createUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    updateUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

OdkoSchema.virtual("zohiogch").get(function () {
  // this.author
  if (!this.author) return "";

  let tokens = this.author.split(" ");
  if (tokens.length === 1) tokens = this.author.split(".");
  if (tokens.length === 2) return tokens[1];

  return tokens[0];
});

module.exports = mongoose.model("Odko", OdkoSchema);
