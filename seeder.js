const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Magazine = require("./models/Magazine");
const HeaderBanner = require("./models/HeaderBanner");
const Ariunzaya = require("./models/Ariunzaya");
const Binance = require("./models/Binance");
const Odko = require("./models/Odko");
const Bolor = require("./models/Bolor");
const Top = require("./models/Top");
const Techno = require("./models/Techno");
const Coin = require("./models/Coin");
const Bayka = require("./models/Bayka");
const Bataa = require("./models/Bataa");
const Deegii = require("./models/Deegii");
dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const ariunzayas = JSON.parse(
  fs.readFileSync(__dirname + "/data/ariunzaya.json", "utf-8")
);
const binances = JSON.parse(
  fs.readFileSync(__dirname + "/data/binance.json", "utf-8")
);
const odkos = JSON.parse(
  fs.readFileSync(__dirname + "/data/odko.json", "utf-8")
);
const bolors = JSON.parse(
  fs.readFileSync(__dirname + "/data/bolor.json", "utf-8")
);
const tops = JSON.parse(fs.readFileSync(__dirname + "/data/top.json", "utf-8"));
const technos = JSON.parse(
  fs.readFileSync(__dirname + "/data/techno.json", "utf-8")
);
const coins = JSON.parse(
  fs.readFileSync(__dirname + "/data/coin.json", "utf-8")
);
const baykas = JSON.parse(
  fs.readFileSync(__dirname + "/data/bayka.json", "utf-8")
);
const bataas = JSON.parse(
  fs.readFileSync(__dirname + "/data/bataa.json", "utf-8")
);
const deegiis = JSON.parse(
  fs.readFileSync(__dirname + "/data/deegii.json", "utf-8")
);

const magazines = JSON.parse(
  fs.readFileSync(__dirname + "/data/magazine.json", "utf-8")
);
const headerBanners = JSON.parse(
  fs.readFileSync(__dirname + "/data/headerBanner.json", "utf-8")
);

const importData = async () => {
  try {
    // await User.create(users);
    await Ariunzaya.create(ariunzayas);
    await Binance.create(binances);
    await Odko.create(odkos);
    await Bolor.create(bolors);
    await Top.create(tops);
    await Techno.create(technos);
    await Coin.create(coins);
    await Bayka.create(baykas);
    await Bataa.create(bataas);
    await Deegii.create(deegiis);
    await Magazine.create(magazines);
    await HeaderBanner.create(headerBanners);
    // await User.create(users);

    console.log("Өгөгдлийг импортлолоо....".green.inverse);
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    // await User.deleteMany();
    await Magazine.deleteMany();
    await HeaderBanner.deleteMany();
    await Ariunzaya.deleteMany();
    await Binance.deleteMany();
    await Odko.deleteMany();
    await Bolor.deleteMany();
    await Top.deleteMany();
    await Techno.deleteMany();
    await Coin.deleteMany();
    await Bayka.deleteMany();
    await Bataa.deleteMany();
    await Deegii.deleteMany();
    await Ariunzaya.deleteMany();
    // await User.deleteMany();
    console.log("Өгөгдлийг бүгдийг устгалаа....".red.inverse);
  } catch (err) {
    console.log(err.red);
  }
};

if (process.argv[2] == "-i") {
  importData();
} else if (process.argv[2] == "-d") {
  deleteData();
}
