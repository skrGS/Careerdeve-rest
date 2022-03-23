const Bolor = require("../models/Bolor");
const path = require("path");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const User = require("../models/User");

// api/v1/works
exports.getBolors = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Bolor);

  const bolors = await Bolor.find(req.query, select)
    .populate({
      path: "category",

      select: "name ",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: bolors.length,
    data: bolors,
    pagination,
  });
});

exports.getUserBolors = asyncHandler(async (req, res, next) => {
  req.query.createUser = req.userId;
  return this.getBolors(req, res, next);
});

exports.getBolor = asyncHandler(async (req, res, next) => {
  const bolor = await Bolor.findById(req.params.id);

  if (!bolor) {
    throw new MyError(req.params.id + " ID-тэй ажил байхгүй байна.", 404);
  }

  // Хандалт тоологч
  if (bolor.count == null) {
    // default data
    const beginCount = new Bolor({
      count: 1,
    });
    beginCount.save();
  } else {
    bolor.count += 1;
    bolor.save();
  }

  res.status(200).json({
    success: true,
    data: bolor,
  });
});

exports.createBolor = asyncHandler(async (req, res, next) => {
  req.body.createUser = req.userId;

  const bolor = await Bolor.create(req.body);

  res.status(200).json({
    success: true,
    data: bolor,
  });
});

exports.deleteBolor = asyncHandler(async (req, res, next) => {
  const bolor = await Bolor.findById(req.params.id);

  if (!bolor) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  if (bolor.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  const user = await User.findById(req.userId);

  bolor.remove();

  res.status(200).json({
    success: true,
    data: bolor,
    whoDeleted: user.name,
  });
});

exports.updateBolor = asyncHandler(async (req, res, next) => {
  const bolor = await Bolor.findById(req.params.id);

  if (!bolor) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээээ.", 400);
  }

  if (bolor.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    bolor[attr] = req.body[attr];
  }

  bolor.save();

  res.status(200).json({
    success: true,
    data: bolor,
  });
});

// PUT:  api/v1/works/:id/photo
exports.uploadBolorPhoto = asyncHandler(async (req, res, next) => {
  const bolor = await Bolor.findById(req.params.id);

  if (!bolor) {
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

  file.name = `bolor__${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    bolor.photo = file.name;
    bolor.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
