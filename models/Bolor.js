const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");

const BolorSchema = new mongoose.Schema(
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
    p5BoFace: {
      type: String,
      default: "no-photo",
    },
    p5BoFaceText: {
      type: String,
    },
    p24Work: {
      type: String,
    },
    p24Name: {
      type: String,
    },
    p24BigTitle: {
      type: String,
    },
    p24Title: {
      type: String,
    },
    p24Text: {
      type: String,
    },
    p24Title1: {
      type: String,
    },
    p24Text1: {
      type: String,
    },
    p24Title2: {
      type: String,
    },
    p24Text2: {
      type: String,
    },
    p24Title3: {
      type: String,
    },
    p24Text3: {
      type: String,
    },

    p5Bo1: {
      type: String,
      default: "no-photo",
    },
    p5Bo1Text: {
      type: String,
    },
    p25Title: {
      type: String,
    },
    p25Text: {
      type: String,
    },
    p25Title1: {
      type: String,
    },
    p25Text1: {
      type: String,
    },
    p5Bo2: {
      type: String,
      default: "no-photo",
    },
    p5Bo2Text: {
      type: String,
    },
    p26Title: {
      type: String,
    },
    p26Text: {
      type: String,
    },
    p26Title1: {
      type: String,
    },
    p26Text1: {
      type: String,
    },
    p26Title2: {
      type: String,
    },
    p26Text2: {
      type: String,
    },
    p26Title3: {
      type: String,
    },
    p26Text3: {
      type: String,
    },
    p26Title4: {
      type: String,
    },
    p26Text4: {
      type: String,
    },
    p26Title5: {
      type: String,
    },
    p26Text5: {
      type: String,
    },
    p26Title6: {
      type: String,
    },
    p26Text6: {
      type: String,
    },
    p5Bo3: {
      type: String,
      default: "no-photo",
    },
    p27Title: {
      type: String,
    },
    p27Text: {
      type: String,
    },
    p27Title1: {
      type: String,
    },
    p27Text1: {
      type: String,
    },
    p27Title2: {
      type: String,
    },
    p27Text2: {
      type: String,
    },
    p27Title3: {
      type: String,
    },
    p27Text3: {
      type: String,
    },
    p27Title4: {
      type: String,
    },
    p27Text4: {
      type: String,
    },

    p5Bo4: {
      type: String,
      default: "no-photo",
    },
    p5Bo4Text: {
      type: String,
      default: "no-photo",
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

BolorSchema.virtual("zohiogch").get(function () {
  // this.author
  if (!this.author) return "";

  let tokens = this.author.split(" ");
  if (tokens.length === 1) tokens = this.author.split(".");
  if (tokens.length === 2) return tokens[1];

  return tokens[0];
});

module.exports = mongoose.model("Bolor", BolorSchema);
