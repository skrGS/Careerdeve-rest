const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");

const TechnoSchema = new mongoose.Schema(
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
    p13TechFace: {
      type: String,
      default: "no-photo",
    },
    p13TechFaceTop: {
      type: String,
    },
    p13TechFaceDate: {
      type: String,
    },
    p13TechFaceTitle: {
      type: String,
    },
    p13TechFaceTitle1: {
      type: String,
    },
    p13TechFaceTitle2: {
      type: String,
    },
    p13TechFaceTitle3: {
      type: String,
    },
    p13TechFaceText: {
      type: String,
    },
    p13Tech1: {
      type: String,
      default: "no-photo",
    },
    p13Tech1Title: {
      type: String,
    },
    p13Tech1Text: {
      type: String,
    },
    p13Tech1Text1: {
      type: String,
    },
    p13Tech2: {
      type: String,
      default: "no-photo",
    },
    p13Tech2Title: {
      type: String,
    },
    p13Tech2Text: {
      type: String,
    },
    p13Tech2Text1: {
      type: String,
    },
    p13Tech3: {
      type: String,
      default: "no-photo",
    },
    p13Tech3Title: {
      type: String,
    },
    p13Tech3Text: {
      type: String,
    },
    p13Tech3Text1: {
      type: String,
    },

    p13Tech4: {
      type: String,
      default: "no-photo",
    },
    p13Tech4Title: {
      type: String,
    },
    p13Tech4Text: {
      type: String,
    },
    p13Tech4Text1: {
      type: String,
    },
    p13Tech5: {
      type: String,
      default: "no-photo",
    },
    p13Tech5Title: {
      type: String,
    },
    p13Tech5Text: {
      type: String,
    },
    p13Tech5Text1: {
      type: String,
    },
    p13Tech6: {
      type: String,
      default: "no-photo",
    },
    p13Tech6Title: {
      type: String,
    },
    p13Tech6Text: {
      type: String,
    },
    p13Tech6Text1: {
      type: String,
    },
    p13Tech7: {
      type: String,
      default: "no-photo",
    },
    p13Tech7Title: {
      type: String,
    },
    p13Tech7Text: {
      type: String,
    },
    p13Tech7Text1: {
      type: String,
    },
    p13Tech7Text2: {
      type: String,
    },
    p13Tech8: {
      type: String,
      default: "no-photo",
    },
    p13Tech8Title: {
      type: String,
    },
    p13Tech8Text: {
      type: String,
    },
    p13Tech8Text1: {
      type: String,
    },
    p13Tech8Text2: {
      type: String,
    },
    p13Tech9: {
      type: String,
      default: "no-photo",
    },
    p13Tech9Title: {
      type: String,
    },
    p13Tech9Text: {
      type: String,
    },
    p13Tech9Text1: {
      type: String,
    },
    p13Tech9Text2: {
      type: String,
    },
    p13Tech10: {
      type: String,
      default: "no-photo",
    },
    p13Tech10Title: {
      type: String,
    },
    p13Tech10Text: {
      type: String,
    },
    p13Tech10Text1: {
      type: String,
    },
    p13Tech10Text2: {
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

TechnoSchema.virtual("zohiogch").get(function () {
  // this.author
  if (!this.author) return "";

  let tokens = this.author.split(" ");
  if (tokens.length === 1) tokens = this.author.split(".");
  if (tokens.length === 2) return tokens[1];

  return tokens[0];
});

module.exports = mongoose.model("Techno", TechnoSchema);
