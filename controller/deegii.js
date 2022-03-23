const Deegii = require("../models/Deegii");
const path = require("path");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const User = require("../models/User");

// api/v1/works
exports.getDeegiis = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Deegii);

  const deegiis = await Deegii.find(req.query, select)
    .populate({
      path: "category",

      select: "name ",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: deegiis.length,
    data: deegiis,
    pagination,
  });
});

exports.getUserDeegiis = asyncHandler(async (req, res, next) => {
  req.query.createUser = req.userId;
  return this.getDeegiis(req, res, next);
});

exports.getDeegii = asyncHandler(async (req, res, next) => {
  const deegii = await Deegii.findById(req.params.id);

  if (!deegii) {
    throw new MyError(req.params.id + " ID-тэй ажил байхгүй байна.", 404);
  }

  // Хандалт тоологч
  if (deegii.count == null) {
    // default data
    const beginCount = new Deegii({
      count: 1,
    });
    beginCount.save();
  } else {
    deegii.count += 1;
    deegii.save();
  }

  res.status(200).json({
    success: true,
    data: deegii,
  });
});

exports.createDeegii = asyncHandler(async (req, res, next) => {
  req.body.createUser = req.userId;

  const deegii = await Deegii.create(req.body);

  res.status(200).json({
    success: true,
    data: deegii,
  });
});

exports.deleteDeegii = asyncHandler(async (req, res, next) => {
  const deegii = await Deegii.findById(req.params.id);

  if (!deegii) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  if (deegii.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  const user = await User.findById(req.userId);

  deegii.remove();

  res.status(200).json({
    success: true,
    data: deegii,
    whoDeleted: user.name,
  });
});

exports.updateDeegii = asyncHandler(async (req, res, next) => {
  const deegii = await Deegii.findById(req.params.id);

  if (!deegii) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээээ.", 400);
  }

  if (deegii.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    deegii[attr] = req.body[attr];
  }

  deegii.save();

  res.status(200).json({
    success: true,
    data: deegii,
  });
});

// PUT:  api/v1/works/:id/photo
exports.uploadDeegiiPhoto = asyncHandler(async (req, res, next) => {
  const deegii = await Deegii.findById(req.params.id);

  if (!deegii) {
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

  file.name = `deegii__${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    deegii.photo = file.name;
    deegii.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
