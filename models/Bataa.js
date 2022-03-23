const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");

const BataaSchema = new mongoose.Schema(
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
    p12Ba1: {
      type: String,
      default: "no-photo",
    },
    p12Ba1OrangeTitle: {
      type: String,
    },

    p12Ba1Text: {
      type: String,
    },
    p12Ba1Text1: {
      type: String,
    },
    p12Ba1Text2: {
      type: String,
    },

    p12Ba1Work: {
      type: String,
    },
    p12Ba1Name: {
      type: String,
    },
    p59Title: {
      type: String,
    },
    p59Text: {
      type: String,
    },
    p60Title: {
      type: String,
    },
    p60Text: {
      type: String,
    },
    p60Title1: {
      type: String,
    },
    p60Text1: {
      type: String,
    },
    p60Text2: {
      type: String,
    },
    p60Title2: {
      type: String,
    },
    p60Text3: {
      type: String,
    },
    p60Title3: {
      type: String,
    },
    p60Text4: {
      type: String,
    },

    p12Ba2Status: {
      type: String,
      default: "no-photo",
    },
    p12Ba2StatusNumber: {
      type: String,
      default: "no-photo",
    },
    p12Ba2Status1: {
      type: String,
      default: "no-photo",
    },
    p12Ba2StatusNumber1: {
      type: String,
      default: "no-photo",
    },
    p12Ba2Status2: {
      type: String,
      default: "no-photo",
    },

    p12Ba2: {
      type: String,
      default: "no-photo",
    },
    p61Title: {
      type: String,
    },
    p61Text: {
      type: String,
    },
    p61Title1: {
      type: String,
    },
    p61Text1: {
      type: String,
    },
    p61GraphText: {
      type: String,
    },
    p61GraphNumber: {
      type: String,
    },
    p61GraphText1: {
      type: String,
    },
    p61GraphNumber1: {
      type: String,
    },
    p61Title2: {
      type: String,
    },
    p61Text2: {
      type: String,
    },
    p12Ba3: {
      type: String,
      default: "no-photo",
    },
    p12Ba3Text: {
      type: String,
    },
    p12BaTable: {
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

BataaSchema.virtual("zohiogch").get(function () {
  // this.author
  if (!this.author) return "";

  let tokens = this.author.split(" ");
  if (tokens.length === 1) tokens = this.author.split(".");
  if (tokens.length === 2) return tokens[1];

  return tokens[0];
});

module.exports = mongoose.model("Bataa", BataaSchema);
