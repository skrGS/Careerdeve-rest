const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");

const CoinSchema = new mongoose.Schema(
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
    p14CoinFace: {
      type: String,
      default: "no-photo",
    },
    p14CoinTop: {
      type: String,
      default: "no-photo",
    },
    p14CoinTitle: {
      type: String,
      default: "no-photo",
    },
    p14CoinTitle1: {
      type: String,
      default: "no-photo",
    },

    p14Coin1: {
      type: String,
      default: "no-photo",
    },
    p14Coin1Text: {
      type: String,
      default: "no-photo",
    },
    p14CoinTable: {
      type: String,
      default: "no-photo",
    },

    p14Coin1Number: {
      type: String,
    },
    p14Coin1Title: {
      type: String,
    },
    p14Coin1SpecialTitle: {
      type: String,
    },
    p14Coin1SpecialText: {
      type: String,
    },
    p14Coin1CompanyTitle: {
      type: String,
    },
    p14Coin1CompanyText: {
      type: String,
    },

    p14Coin2Number: {
      type: String,
    },
    p14Coin2Title: {
      type: String,
    },
    p14Coin2SpecialTitle: {
      type: String,
    },
    p14Coin2SpecialText: {
      type: String,
    },
    p14Coin2CompanyTitle: {
      type: String,
    },
    p14Coin2CompanyText: {
      type: String,
    },
    p14Coin3Number: {
      type: String,
    },
    p14Coin3Title: {
      type: String,
    },
    p14Coin3SpecialTitle: {
      type: String,
    },
    p14Coin3SpecialText: {
      type: String,
    },
    p14Coin3CompanyTitle: {
      type: String,
    },
    p14Coin3CompanyText: {
      type: String,
    },
    p14Coin4Number: {
      type: String,
    },
    p14Coin4Title: {
      type: String,
    },
    p14Coin4SpecialTitle: {
      type: String,
    },
    p14Coin4SpecialText: {
      type: String,
    },
    p14Coin4CompanyTitle: {
      type: String,
    },
    p14Coin4CompanyText: {
      type: String,
    },
    p14Coin5Number: {
      type: String,
    },
    p14Coin5Title: {
      type: String,
    },
    p14Coin5SpecialTitle: {
      type: String,
    },
    p14Coin5SpecialText: {
      type: String,
    },
    p14Coin5SpecialText1: {
      type: String,
    },
    p14Coin5CompanyTitle: {
      type: String,
    },
    p14Coin5CompanyText: {
      type: String,
    },
    p14Coin5CompanyText1: {
      type: String,
    },
    p14Coin5CompanyText2: {
      type: String,
    },
    p14Coin5CompanyText3: {
      type: String,
    },
    p14Coin5CompanyText4: {
      type: String,
    },

    p14Coin6Number: {
      type: String,
    },
    p14Coin6Title: {
      type: String,
    },
    p14Coin6SpecialTitle: {
      type: String,
    },
    p14Coin6SpecialText: {
      type: String,
    },
    p14Coin6CompanyTitle: {
      type: String,
    },
    p14Coin6CompanyText: {
      type: String,
    },
    p14Coin7Number: {
      type: String,
    },
    p14Coin7Title: {
      type: String,
    },
    p14Coin7SpecialTitle: {
      type: String,
    },
    p14Coin7SpecialText: {
      type: String,
    },
    p14Coin7CompanyTitle: {
      type: String,
    },
    p14Coin7CompanyText: {
      type: String,
    },
    p14Coin8Number: {
      type: String,
    },
    p14Coin8Title: {
      type: String,
    },
    p14Coin8SpecialTitle: {
      type: String,
    },
    p14Coin8SpecialText: {
      type: String,
    },
    p14Coin8CompanyTitle: {
      type: String,
    },
    p14Coin8CompanyText: {
      type: String,
    },
    p14Coin9Number: {
      type: String,
    },
    p14Coin9Title: {
      type: String,
    },
    p14Coin9SpecialTitle: {
      type: String,
    },
    p14Coin9SpecialText: {
      type: String,
    },
    p14Coin9CompanyTitle: {
      type: String,
    },
    p14Coin9CompanyText: {
      type: String,
    },
    p14CoinLogo1: {
      type: String,
      default: "no-photo",
    },
    p14CoinLogo2: {
      type: String,
      default: "no-photo",
    },
    p14CoinLogo3: {
      type: String,
      default: "no-photo",
    },
    p14CoinLogo4: {
      type: String,
      default: "no-photo",
    },
    p14CoinLogo5: {
      type: String,
      default: "no-photo",
    },
    p14CoinLogo6: {
      type: String,
      default: "no-photo",
    },
    p14CoinLogo7: {
      type: String,
      default: "no-photo",
    },
    p14CoinLogo8: {
      type: String,
      default: "no-photo",
    },
    p14CoinLogo9: {
      type: String,
      default: "no-photo",
    },
    p14CoinLogo10: {
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

CoinSchema.virtual("zohiogch").get(function () {
  // this.author
  if (!this.author) return "";

  let tokens = this.author.split(" ");
  if (tokens.length === 1) tokens = this.author.split(".");
  if (tokens.length === 2) return tokens[1];

  return tokens[0];
});

module.exports = mongoose.model("Coin", CoinSchema);
