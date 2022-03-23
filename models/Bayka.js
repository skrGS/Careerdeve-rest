const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");

const BaykaSchema = new mongoose.Schema(
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
    p3BayFace: {
      type: String,
      default: "no-photo",
    },
    p3YellowTitle: {
      type: String,
    },
    p3YellowText: {
      type: String,
    },
    p3Work: {
      type: String,
    },
    p3Name: {
      type: String,
    },
    p3BigTitle: {
      type: String,
    },
    p3BigText: {
      type: String,
    },
    p3Title: {
      type: String,
    },
    p3Text: {
      type: String,
    },
    p3Text1: {
      type: String,
    },
    p3Text2: {
      type: String,
    },
    p3Text3: {
      type: String,
    },

    p3Title1: {
      type: String,
    },
    p3Text4: {
      type: String,
    },
    p3Text5: {
      type: String,
    },
    p3Text6: {
      type: String,
    },
    p3Text7: {
      type: String,
    },
    p3Text8: {
      type: String,
    },
    p3Bay1: {
      type: String,
      default: "no-photo",
    },
    p3Bay1Text: {
      type: String,
    },
    p3Title2: {
      type: String,
    },
    p3Text9: {
      type: String,
    },
    p3Text10: {
      type: String,
    },
    p3Text11: {
      type: String,
    },
    p3Text12: {
      type: String,
    },
    p3Title3: {
      type: String,
    },
    p3Text13: {
      type: String,
    },
    p3Text14: {
      type: String,
    },
    p3Text15: {
      type: String,
    },
    p3Text16: {
      type: String,
    },
    p3Text17: {
      type: String,
    },
    p3Text18: {
      type: String,
    },
    p3YellowText1: {
      type: String,
    },
    p3Title4: {
      type: String,
    },
    p3Text19: {
      type: String,
    },
    p3Text20: {
      type: String,
    },
    p3Text21: {
      type: String,
    },
    p3Text22: {
      type: String,
    },
    p3Text23: {
      type: String,
    },
    p3Text24: {
      type: String,
    },
    p3Text25: {
      type: String,
    },
    p3Text26: {
      type: String,
    },

    p3Title5: {
      type: String,
    },
    p3Text27: {
      type: String,
    },

    p3Text28: {
      type: String,
    },
    p3Text29: {
      type: String,
    },

    p3Title6: {
      type: String,
    },
    p3Text30: {
      type: String,
    },
    p3Text31: {
      type: String,
    },
    p3Text32: {
      type: String,
    },
    p3Text33: {
      type: String,
    },
    p3Text34: {
      type: String,
    },
    p3Bay2: {
      type: String,
      default: "no-photo",
    },
    p3Bay2Text: {
      type: String,
    },
    p3Text35: {
      type: String,
    },
    p3Title7: {
      type: String,
    },
    p3Text36: {
      type: String,
    },
    p3Text37: {
      type: String,
    },
    p3Text38: {
      type: String,
    },
    p3Text39: {
      type: String,
    },
    p3Text40: {
      type: String,
    },
    p3Text41: {
      type: String,
    },
    p3Text42: {
      type: String,
    },
    p3Text43: {
      type: String,
    },
    p3Text44: {
      type: String,
    },

    p3Title8: {
      type: String,
    },
    p3Text45: {
      type: String,
    },
    p3Text46: {
      type: String,
    },
    p3Text47: {
      type: String,
    },
    p3Text48: {
      type: String,
    },
    p3YellowTitle1: {
      type: String,
    },
    p3YellowText2: {
      type: String,
    },
    p3YellowText3: {
      type: String,
    },
    p3Title9: {
      type: String,
    },
    p3Text49: {
      type: String,
    },
    p3Text50: {
      type: String,
    },
    p3Text51: {
      type: String,
    },
    p3Text52: {
      type: String,
    },
    p3Text53: {
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

BaykaSchema.virtual("zohiogch").get(function () {
  // this.author
  if (!this.author) return "";

  let tokens = this.author.split(" ");
  if (tokens.length === 1) tokens = this.author.split(".");
  if (tokens.length === 2) return tokens[1];

  return tokens[0];
});

module.exports = mongoose.model("Bayka", BaykaSchema);
