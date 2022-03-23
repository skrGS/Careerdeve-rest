const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");

const MagazineSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      trim: true,
      maxlength: [250, " нэрний урт дээд тал нь 250 тэмдэгт байх ёстой."],
    },
    name: {
      type: String,
      trim: true,
      maxlength: [250, " нэрний урт дээд тал нь 250 тэмдэгт байх ёстой."],
    },
    count: {
      type: Number,
      default: 0,
    },
    ads: {
      ads1: {
        type: String,
        default: "no-photo",
      },
      ads2: {
        type: String,
        default: "no-photo",
      },
      ads3: {
        type: String,
        default: "no-photo",
      },
      ads4: {
        type: String,
        default: "no-photo",
      },
      ads5: {
        type: String,
        default: "no-photo",
      },
      ads6: {
        type: String,
        default: "no-photo",
      },
      ads7: {
        type: String,
        default: "no-photo",
      },
      ads8: {
        type: String,
        default: "no-photo",
      },
      ads9: {
        type: String,
        default: "no-photo",
      },
      ads10: {
        type: String,
        default: "no-photo",
      },
      ads11: {
        type: String,
        default: "no-photo",
      },
      ads12: {
        type: String,
        default: "no-photo",
      },
    },
    photo2: {
      type: String,
      default: "no-photo",
    },
    face: {
      facePhoto: {
        type: String,
        default: "no-photo",
      },
      faceLogo: {
        type: String,
        default: "no-photo",
      },
      faceLogo2: {
        type: String,
        default: "no-photo",
      },
      faceLogo2Text: {
        type: String,
      },
      faceTitle: {
        type: String,
      },
      faceText: {
        type: String,
      },
      faceTitle1: {
        type: String,
      },
      faceText1: {
        type: String,
      },
      faceCareer: {
        type: String,
      },
      faceTitle2: {
        type: String,
      },
      faceText2: {
        type: String,
      },
    },
    page1: {
      p1Aguulga: {
        type: String,
      },
      // Bayarsaihan
      p1Bayka: {
        type: String,
        default: "no-photo",
      },
      baykaSpecial: {
        type: String,
      },
      baykaWork: {
        type: String,
      },
      baykaName: {
        type: String,
      },
      baykaNumber: {
        type: String,
      },
      baykaText: {
        type: String,
      },
      // ariunzaya
      p1Ariuka: {
        type: String,
        default: "no-photo",
      },
      ariukaNumber: {
        type: String,
      },
      ariukaWork: {
        type: String,
      },
      ariukaName: {
        type: String,
      },
      ariukaSpecial: {
        type: String,
      },
      ariukaTitle: {
        type: String,
      },
      ariukaText: {
        type: String,
      },
      // Obuna
      p1Bolor: {
        type: String,
        default: "no-photo",
      },
      bolorNumber: {
        type: String,
      },
      bolorWork: {
        type: String,
      },
      bolorName: {
        type: String,
      },
      bolorSpecial: {
        type: String,
      },
      bolorTitle: {
        type: String,
      },
      bolorText: {
        type: String,
      },
      // garchig text
      p1Number: { type: String },
      p1Title: { type: String },
      p1Text: { type: String },
      p1Number1: { type: String },
      p1Title1: { type: String },
      p1Text1: { type: String },
      p1Number2: { type: String },
      p1Title2: { type: String },
      p1Text2: { type: String },
      // odbaysal
      p1OdBaysal: {
        type: String,
        default: "no-photo",
      },
      odBaysalSpecial: {
        type: String,
      },
      odBaysalTitle: {
        type: String,
      },
      odBaysalText: {
        type: String,
      },
      odBaysalName: {
        type: String,
      },
      // Binance
      p1BinanceBg: {
        type: String,
        default: "no-photo",
      },
      // binanceTitle
      p1BinanceTeam: {
        type: String,
        default: "no-photo",
      },
      binanceSpecial: {
        type: String,
      },
      binanceNumber: {
        type: String,
      },
      binanceTitle: {
        type: String,
      },
      binanceText: {
        type: String,
      },
      binanceStatus: {
        type: String,
      },
      binanceStatusBold: {
        type: String,
      },
      binanceStatus1: {
        type: String,
      },
      binanceStatus1Bold: {
        type: String,
      },
      binanceStatus2: {
        type: String,
      },
      binanceStatus2Bold: {
        type: String,
      },
      binanceStatus3: {
        type: String,
      },
      binanceStatus3Bold: {
        type: String,
      },
      p1Delgermend: {
        type: String,
        default: "no-photo",
      },
      deTitle: {
        type: String,
      },
      deNumber: {
        type: String,
      },
      deWork: {
        type: String,
      },
      deName: {
        type: String,
      },
      deText: {
        type: String,
      },
      p1Batdavaa: {
        type: String,
        default: "no-photo",
      },
      batTitle: {
        type: String,
      },
      batNumber: {
        type: String,
      },
      batWork: {
        type: String,
      },
      batName: {
        type: String,
      },
      batText: {
        type: String,
      },
      p1Tech: {
        type: String,
        default: "no-photo",
      },
      techNumber: {
        type: String,
      },
      techTitle: {
        type: String,
      },
      techText: {
        type: String,
      },
      p1Number3: { type: String },
      p1Title3: { type: String },
      p1Text3: { type: String },
    },
    page2: {
      p2Logo: {
        type: String,
        default: "no-photo",
      },
      p2Date: {
        type: String,
      },
      p2Dircetor: {
        type: String,
      },
      p2DirectorName: {
        type: String,
      },
      p2Support: {
        type: String,
      },
      p2SupportName: {
        type: String,
      },
      p2Contet: {
        type: String,
      },
      p2ContetName: {
        type: String,
      },
      p2Bussiness: {
        type: String,
      },
      p2BussinessName: {
        type: String,
      },
      p2AdsTitle: {
        type: String,
      },
      p2AdsText: {
        type: String,
      },
      p2ContactTitle: {
        type: String,
      },
      p2ContactText: {
        type: String,
      },
      p2CompanyTitle: {
        type: String,
      },
      p2CompanyName: {
        type: String,
      },
      p2Naki: {
        type: String,
        default: "no-photo",
      },
      p2BlueTitle: {
        type: String,
      },
      p2NakiTitle: {
        type: String,
      },
      p2NakiText: {
        type: String,
      },
      p2NakiTitle1: {
        type: String,
      },
      p2NakiText1: {
        type: String,
      },
      p2NakiText2: {
        type: String,
      },
      p2NakiText3: {
        type: String,
      },
    },
    page3: {
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
    },

    page4: {
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
    },
    page5: {
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
    },
    page6: {
      p6Pony1: {
        type: String,
        default: "no-photo",
      },
      p6Pony1Status: {
        type: String,
      },
      p6Pony1Title: {
        type: String,
      },
      p6Pony1Title1: {
        type: String,
      },
      p6Pony1Title2: {
        type: String,
      },
      p28Text: {
        type: String,
      },
      p28Text1: {
        type: String,
      },
      p29Number: {
        type: String,
      },
      p29Title: {
        type: String,
      },
      p29Text: {
        type: String,
      },
      p29Text1: {
        type: String,
      },
      p29Number1: {
        type: String,
      },
      p29Title1: {
        type: String,
      },
      p29Text2: {
        type: String,
      },
      p29Text3: {
        type: String,
      },
      p6Pony2: {
        type: String,
        default: "no-photo",
      },
      p29Number2: {
        type: String,
      },
      p29Title2: {
        type: String,
      },
      p29Text4: {
        type: String,
      },
      p29Text5: {
        type: String,
      },
      p29Text6: {
        type: String,
      },
      p29Text7: {
        type: String,
      },
      p29Text8: {
        type: String,
      },
      p29Number3: {
        type: String,
      },
      p29Title3: {
        type: String,
      },
      p29Text9: {
        type: String,
      },
      p29Text10: {
        type: String,
      },
    },
    page7: {
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
    },
    page8: {
      p8Title1: {
        type: String,
      },
      p8Title2: {
        type: String,
      },
      p8LitleTitle: {
        type: String,
      },
      p33Title: {
        type: String,
      },
      p33Text: {
        type: String,
      },
      p33Text1: {
        type: String,
      },
      p33Text2: {
        type: String,
      },
      p33Text3: {
        type: String,
      },
      p34Title: {
        type: String,
      },
      p34Text: {
        type: String,
      },

      p35BigTitle: {
        type: String,
      },

      p8Career1: {
        type: String,
        default: "no-photo",
      },
      p8Career1Number: {
        type: String,
      },
      p8Career1Title: {
        type: String,
      },
      p8Career1Text: {
        type: String,
      },
      p8Career2: {
        type: String,
        default: "no-photo",
      },
      p8Career2Number: {
        type: String,
      },
      p8Career2Title: {
        type: String,
      },
      p8Career2Text: {
        type: String,
      },
      p8Career2Text1: {
        type: String,
      },
      p8Career2Text2: {
        type: String,
      },
      p8Career2Text3: {
        type: String,
      },
      p8Career2Text4: {
        type: String,
      },
      p8Career3: {
        type: String,
        default: "no-photo",
      },
      p8Career3Number: {
        type: String,
      },
      p8Career3Title: {
        type: String,
      },
      p8Career3Text: {
        type: String,
      },
      p8Career3Text1: {
        type: String,
      },
      p8Career4: {
        type: String,
        default: "no-photo",
      },
      p8Career4Number: {
        type: String,
      },
      p8Career4Title: {
        type: String,
      },
      p8Career4Text: {
        type: String,
      },
      p8Career4StatusText: {
        type: String,
      },
      p8Career4Status: {
        type: String,
      },
      p8Career4Status1: {
        type: String,
      },
      p8Career4Status2: {
        type: String,
      },
      p8Career4Status3: {
        type: String,
      },
      p8Career4Status4: {
        type: String,
      },
      p8Career4Text1: {
        type: String,
      },
      p8Career4Text2: {
        type: String,
      },

      p8Career5: {
        type: String,
        default: "no-photo",
      },
      p8Career5Number: {
        type: String,
      },
      p8Career5Title: {
        type: String,
      },
      p8Career5Text: {
        type: String,
      },
      p8Career5Text1: {
        type: String,
      },
      p8Career6: {
        type: String,
        default: "no-photo",
      },
      p8Career6Number: {
        type: String,
      },
      p8Career6Title: {
        type: String,
      },
      p8Career6Text: {
        type: String,
      },
      p8Career6Text1: {
        type: String,
      },
      p8Career6Text2: {
        type: String,
      },
      p8Career6Text3: {
        type: String,
      },
      p8Career7: {
        type: String,
        default: "no-photo",
      },
      p8Career7Number: {
        type: String,
      },
      p8Career7Title: {
        type: String,
      },
      p8Career7Text: {
        type: String,
      },
      p8Career7Text1: {
        type: String,
      },
      p8Career8: {
        type: String,
        default: "no-photo",
      },
      p8Career8Number: {
        type: String,
      },
      p8Career8Title: {
        type: String,
      },
      p8Career8Title1: {
        type: String,
      },
      p8Career8Text: {
        type: String,
      },
      p8Career8Text1: {
        type: String,
      },
      p8Career8Text2: {
        type: String,
      },
      p8Career8Text3: {
        type: String,
      },

      p8CareerBg: {
        type: String,
        default: "no-photo",
      },
      p8CareerBgTitle1: {
        type: String,
      },
      p8CareerBgTitle2: {
        type: String,
      },
      p8CareerBgText: {
        type: String,
      },
      p8CareerBgText1: {
        type: String,
      },
      p8CareerBgText2: {
        type: String,
      },
      p8CareerBgText3: {
        type: String,
      },
    },
    page9: {
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
    },
    page10: {
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
    },
    page11: {
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
    },
    page12: {
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
    },
    page13: {
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
    },
    page14: {
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

MagazineSchema.virtual("zohiogch").get(function () {
  // this.author
  if (!this.author) return "";

  let tokens = this.author.split(" ");
  if (tokens.length === 1) tokens = this.author.split(".");
  if (tokens.length === 2) return tokens[1];

  return tokens[0];
});

module.exports = mongoose.model("Magazine", MagazineSchema);
