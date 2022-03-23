const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");

const BinanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [250, " нэрний урт дээд тал нь 250 тэмдэгт байх ёстой."],
    },
    content: {
      type: String,
      trim: true,
      maxlength: [5000, " нэрний урт дээд тал нь 20 тэмдэгт байх ёстой."],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    count: {
      type: Number,
      default: 0,
    },
    p10Bg: {
      type: String,
      default: "no-photo",
    },
    p10Special: {
      type: String,
    },
    p42YellowTitle: {
      type: String,
    },
    p42Title: {
      type: String,
    },
    p42Title1: {
      type: String,
    },
    p10Logo: {
      type: String,
      default: "no-photo",
    },
    p43Text: {
      type: String,
    },
    p43Text1: {
      type: String,
    },
    p10BiCeo: {
      type: String,
      default: "no-photo",
    },
    p10BiCeoWork: {
      type: String,
    },
    p10BiCeoName: {
      type: String,
    },
    p10BiCeoText: {
      type: String,
    },
    p43Text2: {
      type: String,
    },
    p10BiTable: {
      type: String,
      default: "no-photo",
    },
    p10BiEco: {
      type: String,
      default: "no-photo",
    },
    // Charity
    p47Title: {
      type: String,
    },
    p47Text: {
      type: String,
    },
    // Academy
    p47Title1: {
      type: String,
    },
    p47Text1: {
      type: String,
    },
    // Trust wallet
    p47Title2: {
      type: String,
    },
    p47Text2: {
      type: String,
    },
    // Research
    p47Title3: {
      type: String,
    },
    p47Text3: {
      type: String,
    },
    // Labs
    p47Title4: {
      type: String,
    },
    p47Text4: {
      type: String,
    },
    // Chain
    p47Title5: {
      type: String,
    },
    p47Text5: {
      type: String,
    },
    // Launchpad
    p47Title6: {
      type: String,
    },
    p47Text6: {
      type: String,
    },
    // info
    p47Title7: {
      type: String,
    },
    p47Text7: {
      type: String,
    },
    p48text: {
      type: String,
    },
    p48Money: {
      type: String,
    },
    p48Wallet: {
      type: String,
    },
    p48text1: {
      type: String,
    },
    p48Money1: {
      type: String,
    },
    p48Wallet1: {
      type: String,
    },
    p48text2: {
      type: String,
    },
    p48Money2: {
      type: String,
    },
    p48Wallet2: {
      type: String,
    },
    p48text3: {
      type: String,
    },
    p48Money3: {
      type: String,
    },
    p48Wallet3: {
      type: String,
    },
    p48text4: {
      type: String,
    },
    p48text5: {
      type: String,
    },
    p48Money4: {
      type: String,
    },
    p48Wallet4: {
      type: String,
    },
    p10BiGraphTitle: {
      type: String,
    },
    p10BiGraphTitleYellow: {
      type: String,
    },
    p10BiGraph: {
      type: String,
      default: "no-photo",
    },
    p10BiGraphText: {
      type: String,
    },
    p49Title: {
      type: String,
    },
    p49Date: {
      type: String,
    },
    p49Money: {
      type: String,
    },
    p49Date1: {
      type: String,
    },
    p49Money1: {
      type: String,
    },
    p49Date2: {
      type: String,
    },
    p49Money2: {
      type: String,
    },
    p49Date3: {
      type: String,
    },
    p49Money3: {
      type: String,
    },
    p49Wallet: {
      type: String,
    },
    p49Title2: {
      type: String,
    },
    p49Text: {
      type: String,
    },
    p49Text1: {
      type: String,
    },
    p49Text2: {
      type: String,
    },
    p49Text3: {
      type: String,
    },
    p49Title3: {
      type: String,
    },
    p49WorkStatus: {
      type: String,
    },
    p49WorkStatusNumber: {
      type: String,
    },
    p49OfficeCountry: {
      type: String,
    },
    p49OfficeCountryNumber: {
      type: String,
    },
    p49Office: {
      type: String,
    },
    p49OfficeNumber: {
      type: String,
    },
    p49WorksAge: {
      type: String,
    },
    p49WorksAgeNumber: {
      type: String,
    },
    p49Title4: {
      type: String,
    },
    p49Text4: {
      type: String,
    },
    p49Text5: {
      type: String,
    },
    p49Text6: {
      type: String,
    },
    p10BiCompany: {
      type: String,
      default: "no-photo",
    },
    p10BiCompanyTitle: {
      type: String,
    },
    p10BiCompanyText: {
      type: String,
    },
    p10BiCompanyText1: {
      type: String,
    },
    p10BiFriends: {
      type: String,
      default: "no-photo",
    },
    p10BiTeam: {
      type: String,
      default: "no-photo",
    },
    p51Title: {
      type: String,
    },
    p10BiGraph1: {
      type: String,
      default: "no-photo",
    },
    p51Status: {
      type: String,
    },
    p51Status1: {
      type: String,
    },
    p51Status2: {
      type: String,
    },
    p51Status3: {
      type: String,
    },
    p51Status4: {
      type: String,
    },
    p51Status5: {
      type: String,
    },
    p51Status6: {
      type: String,
    },
    p51Status7: {
      type: String,
    },
    p51Status8: {
      type: String,
    },
    p51Status9: {
      type: String,
    },
    p51Status10: {
      type: String,
    },
    p51ReqTitle: {
      type: String,
    },
    p51Req: {
      type: String,
    },
    p51Req1: {
      type: String,
    },
    p51Req2: {
      type: String,
    },
    p51Req3: {
      type: String,
    },
    p51Req4: {
      type: String,
    },
    p51Req5: {
      type: String,
    },
    p51Req6: {
      type: String,
    },
    p51ReqText: {
      type: String,
    },
    p51SalaryTitle: {
      type: String,
    },
    p51Date: {
      type: String,
    },
    p51SalaryPosition: {
      type: String,
    },
    p51Salary: {
      type: String,
    },
    p51SalaryPosition1: {
      type: String,
    },
    p51Salary1: {
      type: String,
    },
    p51SalaryPosition2: {
      type: String,
    },
    p51Salary2: {
      type: String,
    },
    p52Text: {
      type: String,
    },
    p52Text1: {
      type: String,
    },
    p52Text2: {
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

BinanceSchema.virtual("zohiogch").get(function () {
  // this.author
  if (!this.author) return "";

  let tokens = this.author.split(" ");
  if (tokens.length === 1) tokens = this.author.split(".");
  if (tokens.length === 2) return tokens[1];

  return tokens[0];
});

module.exports = mongoose.model("Binance", BinanceSchema);
