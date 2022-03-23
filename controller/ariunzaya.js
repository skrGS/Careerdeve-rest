const Ariunzaya = require("../models/Ariunzaya");
const path = require("path");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const User = require("../models/User");

// api/v1/works
exports.getAriunzayas = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Ariunzaya);

  const ariunzayas = await Ariunzaya.find(req.query, select)
    .populate({
      path: "category",

      select: "name ",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: ariunzayas.length,
    data: ariunzayas,
    pagination,
  });
});

exports.getUserAriunzayas = asyncHandler(async (req, res, next) => {
  req.query.createUser = req.userId;
  return this.getAriunzayas(req, res, next);
});

exports.getAriunzaya = asyncHandler(async (req, res, next) => {
  const ariunzaya = await Ariunzaya.findById(req.params.id);

  if (!ariunzaya) {
    throw new MyError(req.params.id + " ID-тэй ажил байхгүй байна.", 404);
  }

  // Хандалт тоологч
  if (ariunzaya.count == null) {
    // default data
    const beginCount = new Ariunzaya({
      count: 1,
    });
    beginCount.save();
  } else {
    ariunzaya.count += 1;
    ariunzaya.save();
  }

  res.status(200).json({
    success: true,
    data: ariunzaya,
  });
});

exports.createAriunzaya = asyncHandler(async (req, res, next) => {
  req.body.createUser = req.userId;

  const ariunzaya = await Ariunzaya.create(req.body);

  res.status(200).json({
    success: true,
    data: ariunzaya,
  });
});

exports.deleteAriunzaya = asyncHandler(async (req, res, next) => {
  const ariunzaya = await Ariunzaya.findById(req.params.id);

  if (!ariunzaya) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  if (
    ariunzaya.createUser.toString() !== req.userId &&
    req.userRole !== "admin"
  ) {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  const user = await User.findById(req.userId);

  ariunzaya.remove();

  res.status(200).json({
    success: true,
    data: ariunzaya,
    whoDeleted: user.name,
  });
});

exports.updateAriunzaya = asyncHandler(async (req, res, next) => {
  const ariunzaya = await Ariunzaya.findById(req.params.id);

  if (!ariunzaya) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээээ.", 400);
  }

  if (
    ariunzaya.createUser.toString() !== req.userId &&
    req.userRole !== "admin"
  ) {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    ariunzaya[attr] = req.body[attr];
  }

  ariunzaya.save();

  res.status(200).json({
    success: true,
    data: ariunzaya,
  });
});

// PUT:  api/v1/works/:id/photo
exports.uploadAriunzayaPhoto = asyncHandler(async (req, res, next) => {
  const ariunzaya = await Ariunzaya.findById(req.params.id);

  if (!ariunzaya) {
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

  file.name = `ariunzaya__${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    ariunzaya.photo = file.name;
    ariunzaya.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
