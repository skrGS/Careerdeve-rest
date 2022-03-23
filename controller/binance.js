const Binance = require("../models/Binance");
const path = require("path");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const User = require("../models/User");

// api/v1/works
exports.getBinances = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Binance);

  const binances = await Binance.find(req.query, select)
    .populate({
      path: "category",

      select: "name ",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: binances.length,
    data: binances,
    pagination,
  });
});

exports.getUserBinances = asyncHandler(async (req, res, next) => {
  req.query.createUser = req.userId;
  return this.getBinances(req, res, next);
});

exports.getBinance = asyncHandler(async (req, res, next) => {
  const binance = await Binance.findById(req.params.id);

  if (!binance) {
    throw new MyError(req.params.id + " ID-тэй ажил байхгүй байна.", 404);
  }

  // Хандалт тоологч
  if (binance.count == null) {
    // default data
    const beginCount = new Binance({
      count: 1,
    });
    beginCount.save();
  } else {
    binance.count += 1;
    binance.save();
  }

  res.status(200).json({
    success: true,
    data: binance,
  });
});

exports.createBinance = asyncHandler(async (req, res, next) => {
  req.body.createUser = req.userId;

  const binance = await Binance.create(req.body);

  res.status(200).json({
    success: true,
    data: binance,
  });
});

exports.deleteBinance = asyncHandler(async (req, res, next) => {
  const binance = await Binance.findById(req.params.id);

  if (!binance) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  if (
    binance.createUser.toString() !== req.userId &&
    req.userRole !== "admin"
  ) {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  const user = await User.findById(req.userId);

  binance.remove();

  res.status(200).json({
    success: true,
    data: binance,
    whoDeleted: user.name,
  });
});

exports.updateBinance = asyncHandler(async (req, res, next) => {
  const binance = await Binance.findById(req.params.id);

  if (!binance) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээээ.", 400);
  }

  if (
    binance.createUser.toString() !== req.userId &&
    req.userRole !== "admin"
  ) {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    binance[attr] = req.body[attr];
  }

  binance.save();

  res.status(200).json({
    success: true,
    data: binance,
  });
});

// PUT:  api/v1/works/:id/photo
exports.uploadBinancePhoto = asyncHandler(async (req, res, next) => {
  const binance = await Binance.findById(req.params.id);

  if (!binance) {
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

  file.name = `binance__${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    binance.photo = file.name;
    binance.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
