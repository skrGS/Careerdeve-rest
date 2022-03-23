const Top = require("../models/Top");
const path = require("path");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const User = require("../models/User");

// api/v1/works
exports.getTops = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Top);

  const tops = await Top.find(req.query, select)
    .populate({
      path: "category",

      select: "name ",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: tops.length,
    data: tops,
    pagination,
  });
});

exports.getUserTops = asyncHandler(async (req, res, next) => {
  req.query.createUser = req.userId;
  return this.getTops(req, res, next);
});

exports.getTop = asyncHandler(async (req, res, next) => {
  const top = await Top.findById(req.params.id);

  if (!top) {
    throw new MyError(req.params.id + " ID-тэй ажил байхгүй байна.", 404);
  }

  // Хандалт тоологч
  if (top.count == null) {
    // default data
    const beginCount = new Top({
      count: 1,
    });
    beginCount.save();
  } else {
    top.count += 1;
    top.save();
  }

  res.status(200).json({
    success: true,
    data: top,
  });
});

exports.createTop = asyncHandler(async (req, res, next) => {
  req.body.createUser = req.userId;

  const top = await Top.create(req.body);

  res.status(200).json({
    success: true,
    data: top,
  });
});

exports.deleteTop = asyncHandler(async (req, res, next) => {
  const top = await Top.findById(req.params.id);

  if (!top) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  if (top.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  const user = await User.findById(req.userId);

  top.remove();

  res.status(200).json({
    success: true,
    data: top,
    whoDeleted: user.name,
  });
});

exports.updateTop = asyncHandler(async (req, res, next) => {
  const top = await Top.findById(req.params.id);

  if (!top) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээээ.", 400);
  }

  if (top.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    top[attr] = req.body[attr];
  }

  top.save();

  res.status(200).json({
    success: true,
    data: top,
  });
});

// PUT:  api/v1/works/:id/photo
exports.uploadTopPhoto = asyncHandler(async (req, res, next) => {
  const top = await Top.findById(req.params.id);

  if (!top) {
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

  file.name = `top__${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    top.photo = file.name;
    top.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
