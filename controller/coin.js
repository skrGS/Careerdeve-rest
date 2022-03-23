const Coin = require("../models/Coin");
const path = require("path");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const User = require("../models/User");

// api/v1/works
exports.getCoins = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Coin);

  const coins = await Coin.find(req.query, select)
    .populate({
      path: "category",

      select: "name ",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: coins.length,
    data: coins,
    pagination,
  });
});

exports.getUserCoins = asyncHandler(async (req, res, next) => {
  req.query.createUser = req.userId;
  return this.getCoins(req, res, next);
});

exports.getCoin = asyncHandler(async (req, res, next) => {
  const coin = await Coin.findById(req.params.id);

  if (!coin) {
    throw new MyError(req.params.id + " ID-тэй ажил байхгүй байна.", 404);
  }

  // Хандалт тоологч
  if (coin.count == null) {
    // default data
    const beginCount = new Coin({
      count: 1,
    });
    beginCount.save();
  } else {
    coin.count += 1;
    coin.save();
  }

  res.status(200).json({
    success: true,
    data: coin,
  });
});

exports.createCoin = asyncHandler(async (req, res, next) => {
  req.body.createUser = req.userId;

  const coin = await Coin.create(req.body);

  res.status(200).json({
    success: true,
    data: coin,
  });
});

exports.deleteCoin = asyncHandler(async (req, res, next) => {
  const coin = await Coin.findById(req.params.id);

  if (!coin) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  if (coin.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  const user = await User.findById(req.userId);

  coin.remove();

  res.status(200).json({
    success: true,
    data: coin,
    whoDeleted: user.name,
  });
});

exports.updateCoin = asyncHandler(async (req, res, next) => {
  const coin = await Coin.findById(req.params.id);

  if (!coin) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээээ.", 400);
  }

  if (coin.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    coin[attr] = req.body[attr];
  }

  coin.save();

  res.status(200).json({
    success: true,
    data: coin,
  });
});

// PUT:  api/v1/works/:id/photo
exports.uploadCoinPhoto = asyncHandler(async (req, res, next) => {
  const coin = await Coin.findById(req.params.id);

  if (!coin) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээ.", 400);
  }

  // image upload

  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
    throw new MyError("Таны зурагны хэмжээ хэтэрсэн байна.", 400);
  }

  file.name = `coin__${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    coin.photo = file.name;
    coin.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
