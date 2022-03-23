const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");

const AriunzayaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [250, " нэрний урт дээд тал нь 250 тэмдэгт байх ёстой."],
    },
    content: {
      type: String,
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    count: {
      type: Number,
      default: 0,
    },

    p4ArFace: {
      type: String,
      default: "no-photo",
    },
    arTitle: {
      type: String,
    },
    arText: {
      type: String,
    },
    p16Work: {
      type: String,
    },
    p16Name: {
      type: String,
    },
    p16BigTitle: {
      type: String,
    },
    p16Title: {
      type: String,
    },
    p16Text: {
      type: String,
    },
    p16Text2: {
      type: String,
    },
    p16Status: {
      type: String,
    },
    p16Status1: {
      type: String,
    },
    p16Text3: {
      type: String,
    },
    p16Title1: {
      type: String,
    },
    p16Text4: {
      type: String,
    },
    p16Text5: {
      type: String,
    },
    p16Text6: {
      type: String,
    },
    p16Text7: {
      type: String,
    },

    p4Ar1: {
      type: String,
      default: "no-photo",
    },
    p4Ar1Text: {
      type: String,
    },
    p18Title: {
      type: String,
    },
    p18Text: {
      type: String,
    },
    p18Text1: {
      type: String,
    },
    p18BlueText: {
      type: String,
    },
    p18Title1: {
      type: String,
    },
    p18Text2: {
      type: String,
    },
    p18Status: {
      type: String,
    },
    p18Status1: {
      type: String,
    },
    p18Status2: {
      type: String,
    },
    p18Text3: {
      type: String,
    },
    p18Text4: {
      type: String,
    },
    p18BlueText1: {
      type: String,
    },
    p19Title: {
      type: String,
    },
    p19Text: {
      type: String,
    },
    p19Text1: {
      type: String,
    },
    p19Text2: {
      type: String,
    },
    p4Ar2: {
      type: String,
      default: "no-photo",
    },
    p4ArText: {
      type: String,
    },
    p20BlueText: {
      type: String,
    },
    p20Title: {
      type: String,
    },
    p20Text: {
      type: String,
    },
    p20Photo: {
      type: String,
      default: "no-photo",
    },
    p20PhotoText: {
      type: String,
    },
    p20Title1: {
      type: String,
    },
    p20Text1: {
      type: String,
    },
    p20Text2: {
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

AriunzayaSchema.virtual("zohiogch").get(function () {
  // this.author
  if (!this.author) return "";

  let tokens = this.author.split(" ");
  if (tokens.length === 1) tokens = this.author.split(".");
  if (tokens.length === 2) return tokens[1];

  return tokens[0];
});

module.exports = mongoose.model("Ariunzaya", AriunzayaSchema);
