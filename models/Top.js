const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");

const TopSchema = new mongoose.Schema(
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
    p30Top: {
      type: String,
    },
    p30Title: {
      type: String,
    },
    p7Ceo1: {
      type: String,
      default: "no-photo",
    },
    p7Ceo1Name: {
      type: String,
    },
    p7Ceo1Work: {
      type: String,
    },
    p7Ceo1Text: {
      type: String,
    },

    p7Ceo2: {
      type: String,
      default: "no-photo",
    },
    p7Ceo2Name: {
      type: String,
    },
    p7Ceo2Work: {
      type: String,
    },
    p7Ceo2Text: {
      type: String,
    },
    p7Ceo3: {
      type: String,
      default: "no-photo",
    },
    p7Ceo3Name: {
      type: String,
    },
    p7Ceo3Work: {
      type: String,
    },
    p7Ceo3Text: {
      type: String,
    },
    p7Ceo4: {
      type: String,
      default: "no-photo",
    },
    p7Ceo4Name: {
      type: String,
    },
    p7Ceo4Work: {
      type: String,
    },
    p7Ceo4Text: {
      type: String,
    },
    p7Ceo5: {
      type: String,
      default: "no-photo",
    },
    p7Ceo5Name: {
      type: String,
    },
    p7Ceo5Work: {
      type: String,
    },
    p7Ceo5Text: {
      type: String,
    },
    p7Ceo6: {
      type: String,
      default: "no-photo",
    },
    p7Ceo6Name: {
      type: String,
    },
    p7Ceo6Work: {
      type: String,
    },
    p7Ceo6Text: {
      type: String,
    },
    p7Ceo7: {
      type: String,
      default: "no-photo",
    },
    p7Ceo7Name: {
      type: String,
    },
    p7Ceo7Work: {
      type: String,
    },
    p7Ceo7Text: {
      type: String,
    },
    p7Ceo8: {
      type: String,
      default: "no-photo",
    },
    p7Ceo8Name: {
      type: String,
    },
    p7Ceo8Work: {
      type: String,
    },
    p7Ceo8Text: {
      type: String,
    },
    p7Ceo9: {
      type: String,
      default: "no-photo",
    },
    p7Ceo9Name: {
      type: String,
    },
    p7Ceo9Work: {
      type: String,
    },
    p7Ceo9Text: {
      type: String,
    },
    p7Ceo10: {
      type: String,
      default: "no-photo",
    },
    p7Ceo10Name: {
      type: String,
    },
    p7Ceo10Work: {
      type: String,
    },
    p7Ceo10Text: {
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

TopSchema.virtual("zohiogch").get(function () {
  // this.author
  if (!this.author) return "";

  let tokens = this.author.split(" ");
  if (tokens.length === 1) tokens = this.author.split(".");
  if (tokens.length === 2) return tokens[1];

  return tokens[0];
});

module.exports = mongoose.model("Top", TopSchema);
