const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");

const DeegiiSchema = new mongoose.Schema(
  {
    name: {
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
    p11DeBg: {
      type: String,
      default: "no-photo",
    },
    p11DeBgWork: {
      type: String,
    },
    p11DeBgName: {
      type: String,
    },
    p11DeBgTitle: {
      type: String,
    },
    p11DeBgText: {
      type: String,
    },
    p55Title: {
      type: String,
    },
    p55Text: {
      type: String,
    },
    p55Text1: {
      type: String,
    },
    p55Title1: {
      type: String,
    },
    p55Text2: {
      type: String,
    },
    p55Text3: {
      type: String,
    },

    p55Status: {
      type: String,
    },
    p55Status1: {
      type: String,
    },
    p55Status2: {
      type: String,
    },
    p55Text4: {
      type: String,
    },
    p55BlueText: {
      type: String,
    },
    p55Title2: {
      type: String,
    },
    p55Text5: {
      type: String,
    },
    p55Text6: {
      type: String,
    },
    p55Title3: {
      type: String,
    },
    p55Text7: {
      type: String,
    },
    p11De1: {
      type: String,
      default: "no-photo",
    },
    p11De1Text: {
      type: String,
    },
    p55Text8: {
      type: String,
    },
    p56Title: {
      type: String,
    },
    p56Text: {
      type: String,
    },
    p56Text1: {
      type: String,
    },
    p56Title1: {
      type: String,
    },
    p56Text2: {
      type: String,
    },
    p56Text3: {
      type: String,
    },
    p56Text4: {
      type: String,
    },
    p56Title2: {
      type: String,
    },
    p56Text5: {
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

DeegiiSchema.virtual("zohiogch").get(function () {
  // this.author
  if (!this.author) return "";

  let tokens = this.author.split(" ");
  if (tokens.length === 1) tokens = this.author.split(".");
  if (tokens.length === 2) return tokens[1];

  return tokens[0];
});

module.exports = mongoose.model("Deegii", DeegiiSchema);
